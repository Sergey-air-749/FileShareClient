'use server'

import axios from "axios";
import { cookies } from 'next/headers';

const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

export const submitChangeUserEmailVerifyServer = async (codeObj: object) => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    try {
        const response = await axios.post(
                apiUrl + '/api/change/email/verify',
                codeObj,

                {
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

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

export const getТewСodeFunServer = async () => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    let lang = cookiesStore.get('language')?.value;

    if (lang == undefined) {
        lang = 'ru';
    }

    try {
        const response = await axios.get(apiUrl + `/api/change/email/new/${lang}`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

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

export const submitChangeUserEmailCancelServer = async () => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    try {
        const response = await axios.get(apiUrl + '/api/change/email/cancel', {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

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