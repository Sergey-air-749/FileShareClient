'use server'

import { cookieSetFunServer } from "@/components/cookieSetFun";
import axios from "axios";
import { cookies } from 'next/headers';

const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

export const submitResetPasswordVerifyServer = async (codeObj: object) => {
    try {
        const cookiesStore = await cookies();

        const response = await axios.post(apiUrl + '/api/login/resetpassword/verify', codeObj, { withCredentials: true, headers: {'Content-Type': 'application/json',}});
        const rawCookies = response.headers['set-cookie'];
        // console.log(rawCookies);
        
        await cookieSetFunServer(rawCookies)
        
        return response.data

    } catch (error) {

        console.log(error);
        
        if (axios.isAxiosError(error)) {
            const serverMessage = error;
            throw new Error(serverMessage.message);
        }
    }
};

export const submitResetPasswordUserGetТewСodeServer = async (userData: object) => {
    try {

        const response = await axios.post(apiUrl + '/api/login/resetpassword/new', userData, {headers: {'Content-Type': 'application/json'}});
        return response.data

    } catch (error) {

        console.log(error);
        
        if (axios.isAxiosError(error)) {
            const serverMessage = error;
            throw new Error(serverMessage.message);
        }
    }
};

export const submitResetPasswordUserСancelServer = async (email: string) => {
    try {
        
        const response = await axios.post(apiUrl + '/api/login/resetpassword/cancel', {email: email},{headers: {'Content-Type': 'application/json',}});
        return response.data

    } catch (error) {

        console.log(error);
        
        if (axios.isAxiosError(error)) {
            const serverMessage = error;
            throw new Error(serverMessage.message);
        }
    }
};