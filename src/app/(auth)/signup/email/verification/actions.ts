'use server'

import axios from "axios";
import { cookies } from 'next/headers';

const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

export const submitVerifyEmailServer = async (codeObj: object) => {
    try {

        const cookiesStore = await cookies();
        const token = cookiesStore.get("token")?.value;

        const response = await axios.post(
            apiUrl + '/api/signup/email/verify',
            codeObj,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
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
    try {

        const cookiesStore = await cookies();
        const token = cookiesStore.get("token")?.value;

        let lang = cookiesStore.get('language')?.value;

        if (lang == undefined) {
            lang = 'ru';
        }

        const response = await axios.get(apiUrl + `/api/signup/email/new/${lang}`, {
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

export const submitConfirmEmailSignupCancelServer = async () => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    try {
        const response = await axios.get(apiUrl + '/api/signup/email/cancel', {
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