'use server'

import { cookieSetFunServer } from "@/components/cookieSetFun";
import axios from "axios";
import { cookies } from 'next/headers';

const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

export const loginServer = async (userData: object) => {
    try {
        const response = await axios.post(apiUrl + '/api/login', userData, { withCredentials: true });
        console.log(response.headers);

        const cookiesStore = await cookies();

        const rawCookies = response.headers['set-cookie'];
        
        await cookieSetFunServer(rawCookies)

        // await cookieSetFunServer(["", "", ""])
        // await cookieSetFunServer(undefined)
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
        } else {
            throw error;
        }

    }
};