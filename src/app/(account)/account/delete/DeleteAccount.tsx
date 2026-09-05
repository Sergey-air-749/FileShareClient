'use client';
import { FormEvent, useEffect, useState } from 'react';
import style from '@/style/delete.account.module.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useIntl } from 'react-intl';
import { submitAccountDeleteServer, verifyAccountDeleteSessionServer } from './actions';

export default function DeleteAccount() {
    const [isVerify, setIsVerify] = useState(false);
    const [error, setError] = useState('');

    const [showLoader, setShowLoader] = useState(false);

    const showLoaderFun = () => {
        setShowLoader(true);
    };

    const closeLoaderFun = () => {
        setShowLoader(false);
    };

    const router = useRouter();

    const intl = useIntl();

    const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

    useEffect(() => {
        const verifyAccountDeleteSession = async () => {
            try {
                const response = await verifyAccountDeleteSessionServer();

                const localSession = sessionStorage.getItem('session');
                const serverSession = response.sessionId;

                if (localSession != serverSession) {
                    router.back();
                } else {
                    setIsVerify(true);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                closeLoaderFun();

                if (error.message == 'noSessions') {
                    location.pathname = '/account/delete/verification';
                    console.log(error.message);
                } else {
                    console.log(error.message);

                    const serverMessage = error.message;

                    setError(
                        intl.formatMessage({
                            id: `error.massage.${serverMessage}`,
                            defaultMessage: intl.formatMessage({ id: 'error.massage.unknown' }) + serverMessage,
                        })
                    );
                }
            }
        };

        verifyAccountDeleteSession();
    }, []);

    const submitAccountDelete = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            showLoaderFun();

            const response = submitAccountDeleteServer();

            //console.log('Response:', response);

            location.pathname = '/account/delete/successfully';
            // sessionStorage.removeItem('token');

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            closeLoaderFun();
            console.log(error.message);

            const serverMessage = error.message;

            setError(
                intl.formatMessage({
                    id: `error.massage.${serverMessage}`,
                    defaultMessage: intl.formatMessage({ id: 'error.massage.unknown' }) + serverMessage,
                })
            );
        }
    };

    const buttonBackPage = () => {
        router.push('/account');
    };

    return (
        <div className={style.deleteAccount}>
            <form onSubmit={(e) => submitAccountDelete(e)} className={style.deleteAccountForm}>
                <header className={style.deleteAccountHead}>
                    {/* <div className={style.buttonBackPageBlock}>
                        <button type="button" onClick={() => buttonBackPage()} className={style.buttonBackPage}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#ffffff"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
                        </button>
                    </div>            */}

                    {/* <div className={style.headerTitle}>
                        <h2>Аккаунт</h2>
                    </div> */}
                </header>

                <div className={style.content}>
                    <main>
                        <div className={style.deleteAccountMainHead}>
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
                                <h2>{intl.formatMessage({ id: 'deleteAccount.formTitleH2' })}</h2>
                            </div>
                        </div>

                        <div className={style.deleteAccountInfo}>
                            <h3>{intl.formatMessage({ id: 'deleteAccount.info.warning.title' })}</h3>
                            <p>{intl.formatMessage({ id: 'deleteAccount.info.warning.info' })}</p>
                        </div>

                        <span className={style.error}>{error}</span>
                    </main>

                    <footer className={style.styleFooter}>
                        {isVerify == true ? (
                            <div className={style.formButtons}>
                                <button type="submit" className={style.styleButtonDelete}>
                                    {intl.formatMessage({ id: 'deleteAccount.button.submit' })}
                                </button>
                                <button type="button" onClick={() => buttonBackPage()} className={style.buttonCancel}>
                                    {intl.formatMessage({ id: 'deleteAccount.button.cancel' })}
                                </button>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </footer>
                </div>

                {showLoader ? (
                    <div className={style.formLoaderBackground}>
                        <div className={style.formLoader}>
                            <svg
                                width="60"
                                height="60"
                                className={style.formLoaderImg}
                                viewBox="0 0 50 50"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_223_516)">
                                    <circle cx="25" cy="25" r="22.5" stroke="var(--color-blue-900)" strokeWidth="5" />
                                    <path
                                        d="M34.5524 45.3716C35.1386 46.6217 34.6033 48.1232 33.3009 48.5817C29.1743 50.0343 24.7234 50.3834 20.3948 49.5722C15.2442 48.6069 10.5271 46.0475 6.91016 42.2557C3.29318 38.4638 0.959162 33.6313 0.237921 28.4408C-0.368215 24.0788 0.19048 19.6493 1.83617 15.5958C2.35556 14.3165 3.88066 13.8527 5.10172 14.4972V14.4972C6.32277 15.1417 6.77389 16.6504 6.28665 17.9423C5.1119 21.0571 4.72854 24.4293 5.19034 27.7527C5.76733 31.905 7.63454 35.7711 10.5281 38.8045C13.4217 41.838 17.1954 43.8855 21.3159 44.6578C24.6137 45.2758 28.0003 45.052 31.1671 44.0255C32.4805 43.5997 33.9662 44.1215 34.5524 45.3716V45.3716Z"
                                        fill="var(--color-blue-300)"
                                    />
                                </g>

                                <defs>
                                    <clipPath id="clip0_223_516">
                                        <rect width="50" height="50" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </form>
        </div>
    );
}
