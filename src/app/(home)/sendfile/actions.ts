'use server'

import axios from "axios";
import { cookies } from 'next/headers';

const fileApiUrl = process.env.NEXT_PUBLIC_SERVER_FILE_API_URL;

export const valueShareIdServer = async (valueShareId: string) => {
    // const value = e.target.value;

    try {
        const response = await axios.get(fileApiUrl + '/api/getUserDataById/' + valueShareId);
        console.log(response);
        return response.data
    } catch (error) {

        console.log(error);
        
        if (axios.isAxiosError(error)) {
            const serverMessage = error;
            if (serverMessage.response?.data?.msg != undefined) {
                console.log(serverMessage.response?.data?.msg);
                if (serverMessage.response?.data?.msg == 'Пользователь не найден') {
                    throw new Error('Пользователь не найден');
                }
            } else {
                throw new Error(serverMessage.message);
            }
        }
    }
};


export const upLoadFilesServer = async (shareId: string, formData: FormData) => {
    
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    try {
        const response = await axios.post(fileApiUrl + '/api/fileLoad/' + shareId, formData, {
            headers: {
                authorization: `Bearer ${token}`,
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


export const upLoadTextServer = async (shareId: string, formData: object) => {
    
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    try {
        const response = await axios.post(fileApiUrl + '/api/textLoad/' + shareId, formData, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
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