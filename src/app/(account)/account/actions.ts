'use server'

import axios from "axios";
import { cookies } from 'next/headers';

const fileApiUrl = process.env.NEXT_PUBLIC_SERVER_FILE_API_URL;
const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

export const upLoadAvatarServer = async (formData: object) => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    try {
        const response = await axios.post(fileApiUrl + '/api/change/avatar', formData,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
        console.log(response);

        return response.data
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            const serverMessage = error;
            //console.log(serverMessage);

            if (serverMessage.response?.data?.msg != undefined) {
                console.log(serverMessage.response?.data?.msg);
                throw new Error(serverMessage.response?.data?.msg);
            } else {
                console.log(serverMessage.message);
                throw new Error(serverMessage.message);
            }
        }
    }
};

export const setDefaultAvatarServer = async () => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    try {
        const response = await axios.post(apiUrl + '/api/change/avatar/default',
            {},
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response);

        return response.data
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            const serverMessage = error;
            //console.log(serverMessage);

            if (serverMessage.response?.data?.msg != undefined) {
                console.log(serverMessage.response?.data?.msg);
                throw new Error(serverMessage.response?.data?.msg);
            } else {
                console.log(serverMessage.message);
                throw new Error(serverMessage.message);
            }
        }
    }
};


export const logOutFunServer = async () => {
    const cookieStore = await cookies();
    const recoveringGuestToken = cookieStore.get('recoveringGuestToken')?.value;

    if (recoveringGuestToken != null) {
        cookieStore.set('token', recoveringGuestToken, { 
            secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'production',
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 365, // 365 дней в милисикундах
        });

        return {msg: 'Выход выполнен, вас вернула в ваш гостивой аккаунт'}
    } else {
        cookieStore.delete('token')
        return {msg: 'Выход выполнен'}
    }

};