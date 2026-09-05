'use server'

import axios from "axios";
import { cookies } from 'next/headers';

const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

export const submitResetPasswordUserServer = async (userData: object) => {
    try {
        const response = await axios.post(apiUrl + '/api/login/resetpassword/new', userData, { withCredentials: true });
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
}