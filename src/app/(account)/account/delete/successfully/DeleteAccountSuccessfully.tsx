'use client';

import style from '@/style/delete.account.successfully.module.css';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DeleteAccountSuccessfully() {
    const [isVerify, setIsVerify] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();

    const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

    useEffect(() => {
        const verifySession = async () => {
            try {
                const token = localStorage?.getItem('token');

                const response = await axios.get(
                    apiUrl + '/api/get/session',

                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                const localSession = localStorage.getItem('session');
                const serverSession = response.data.sessionId;

                //console.log(response);
                //console.log(localSession);

                if (localSession != serverSession) {
                    router.back();
                } else {
                    setIsVerify(true);
                }
            } catch (error) {
                console.log(error);
                if (axios.isAxiosError(error)) {
                    const serverMessage = error;
                    //console.log(serverMessage);

                    if (serverMessage.response?.data?.msg != undefined) {
                        console.log(serverMessage.response?.data?.msg);
                        if (serverMessage.response?.data?.msg == 'Нет сессий') {
                            location.pathname = '/account/delete/verification';
                        }
                        setError(serverMessage.response?.data?.msg);
                    } else {
                        console.log(serverMessage.message);
                        setError(serverMessage.message);
                    }
                }
            }
        };

        verifySession();
    }, []);

    return (
        <div className={style.deleteAccountSuccessfully}>
            <form className={style.deleteAccountSuccessfullyForm}>
                <div className={style.content}>
                    <main>
                        <div className={style.deleteAccountSuccessfullyMainHead}>
                            <div className={style.formIcon}>
                                <svg
                                    width="70"
                                    height="70"
                                    viewBox="0 0 70 70"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M54 49.5C54 54.1944 45.4934 58 35 58C24.5066 58 16 54.1944 16 49.5C16 47.0553 18.3069 44.8517 22 43.301C25.3986 41.874 29.9712 41 35 41C45.4934 41 54 44.8056 54 49.5Z"
                                        fill="#96C3FF"
                                    />
                                    <circle cx="35" cy="30" r="8" fill="#96C3FF" />
                                    <circle cx="35" cy="35" r="23.5" stroke="#008CFF" strokeWidth="3" />
                                    <circle cx="52" cy="51" r="8" fill="white" stroke="white" strokeWidth="2" />
                                    <path
                                        d="M55.75 49H57M55.75 49L54.5 49.0005H49.5L48.25 49.0002M55.75 49L54.6321 56.1544C54.5561 56.6412 54.1368 57 53.6441 57H50.3559C49.8632 57 49.4439 56.6412 49.3679 56.1544L48.25 49.0002M48.25 49.0002L47 49"
                                        stroke="#008CFF"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                    <mask
                                        id="path-6-outside-1_258_516"
                                        maskUnits="userSpaceOnUse"
                                        x="48.5"
                                        y="45"
                                        width="7"
                                        height="4"
                                        fill="black"
                                    >
                                        <rect fill="white" x="48.5" y="45" width="7" height="4" />
                                        <path d="M50.5 47.1C50.5 47.0448 50.5448 47 50.6 47H53.4C53.4552 47 53.5 47.0448 53.5 47.1V49H50.5V47.1Z" />
                                    </mask>
                                    <path
                                        d="M49 47.1C49 46.2163 49.7163 45.5 50.6 45.5H53.4C54.2837 45.5 55 46.2163 55 47.1L52 48.5L49 47.1ZM52 48.5M53.5 49H50.5H53.5M49 49V47.1C49 46.2163 49.7163 45.5 50.6 45.5L52 48.5V49H49ZM53.4 45.5C54.2837 45.5 55 46.2163 55 47.1V49H52V48.5L53.4 45.5Z"
                                        fill="#008CFF"
                                        mask="url(#path-6-outside-1_258_516)"
                                    />
                                </svg>
                            </div>

                            <div className={style.formTitle}>
                                <h2>Ваш аккаунт удален</h2>
                            </div>
                        </div>

                        <div className={style.deleteAccountSuccessfullyInfo}>
                            <p>
                                Ваш аккаунт, отправленные файлы и история, были удалены, отменить удаление можно в
                                течение 14 дней
                            </p>
                        </div>

                        <div className={style.deleteAccountSuccessfullyLinks}>
                            <Link href="/sendfile" className={style.Link}>
                                На главную
                            </Link>
                        </div>
                    </main>
                </div>
            </form>
        </div>
    );
}
