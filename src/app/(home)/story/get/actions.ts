'use server'

import axios from "axios";
import { cookies } from 'next/headers';

const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;
const fileApiUrl = process.env.NEXT_PUBLIC_SERVER_FILE_API_URL;

// export const fileAcceptFunServer = async (shareId: string, fileId: string) => {
//     try {
//         //Получает файл преоброзует его споиащю блоб и создаёт ссылку

//         const response = await axios.get(fileApiUrl + `/api/getDownload/file/${shareId}/${fileId}`);
//         console.log(response.data);
//         return response.data

//     } catch (error) {
//         console.log(error);
//         if (axios.isAxiosError(error)) {
//             const serverMessage = error;
//             console.log(serverMessage);

//             if (serverMessage.response?.data?.msg != undefined) {
//                 throw new Error(serverMessage.response?.data?.msg);
//             } else {
//                 throw new Error(serverMessage.message);
//             }
//         }
//     }

// };

export const getStoryGetFileServer = async () => {

    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    try {

        const response = await axios.get(apiUrl + '/api/story/get', {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Response:', response.data);
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


export const deleteAllFilesStoryGetServer = async () => {

    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    try {
        const response = await axios.post(
            fileApiUrl + '/api/story/get/deleteAll/',
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log('Response:', response.data);
        return response
        
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


export const deleteFileStoryGetServer = async (id: string) => {

    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    try {
        const response = await axios.post(
            fileApiUrl + '/api/story/get/delete/' + id,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        //console.log('Response:', response.data);
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