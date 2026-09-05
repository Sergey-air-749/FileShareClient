'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import style from '@/style/change.email.module.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAppSelector } from '@/components/hooks';
import { useIntl } from 'react-intl';
import { submitChangeUserEmailServer } from './actions';
import Cookies from 'js-cookie';

export default function ChangeEmail() {
    const { userData } = useAppSelector((state) => state.authReducer);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const [showLoader, setShowLoader] = useState(false);

    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const router = useRouter();

    const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

    const intl = useIntl();

    const showLoaderFun = () => {
        setShowLoader(true);
    };

    const closeLoaderFun = () => {
        setShowLoader(false);
    };

    const validationInputEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        //console.log(emailRegexp.test(value));

        if (emailRegexp.test(value) == true) {
            setError('');
        } else {
            setError(intl.formatMessage({ id: 'changeEmail.input.validation.email' }));
        }

        setEmail(value);
        closeLoaderFun();
        //console.log(email);
    };

    const submitChangeUserEmail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            showLoaderFun();

            let lang = Cookies.get('language');

            if (lang == undefined) {
                lang = 'ru';
            }

            const userUpData = {
                emailNew: email,
                lang: lang,
            };

            //console.log(userUpData);

            const response = await submitChangeUserEmailServer(userUpData);
            //console.log('Response:', response);

            location.pathname = '/account/change/email/verification/';
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
        router.back();
    };

    return (
        <div className={style.changeEmail}>
            <form className={style.formChangeEmail} onSubmit={(e) => submitChangeUserEmail(e)}>
                <div className={style.formHead}>
                    <div className={style.formIcon}>
                        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_381_661)">
                                <path
                                    d="M24.0947 36.9043L10 51C8.89543 51 8 50.1046 8 49V21C8 20.9384 8.00237 20.8775 8.00781 20.8174L24.0947 36.9043ZM32.0156 44.8252C33.6753 46.4847 36.3657 46.4846 38.0254 44.8252L44.1748 38.6748L56.5 51H13L25.5947 38.4043L32.0156 44.8252ZM62 21V49C62 50.1044 61.1044 50.9998 60 51H59.5L45.6748 37.1758L61.9922 20.8584C61.9955 20.9052 62 20.9523 62 21Z"
                                    fill="#008CFF"
                                />
                                <path
                                    d="M33.5858 42.9066L13.1125 22.4333C11.8525 21.1733 12.7449 19.019 14.5267 19.019H55.4733C57.2551 19.019 58.1474 21.1733 56.8875 22.4333L36.4142 42.9066C35.6331 43.6876 34.3668 43.6876 33.5858 42.9066Z"
                                    fill="#96C3FF"
                                />
                                <path
                                    d="M60.3017 19.019H9.69824L15.1792 24.5L54.8207 24.5L60.3017 19.019Z"
                                    fill="#96C3FF"
                                />
                                <circle cx="55" cy="48" r="12" fill="white" stroke="white" strokeWidth="2" />
                                <path
                                    d="M61.5041 45.3749C61.5822 45.453 61.5822 45.5797 61.5041 45.6578L53.8827 53.2792C53.8046 53.3573 53.6779 53.3573 53.5998 53.2792L49.64 49.3194C49.5619 49.2413 49.5619 49.1147 49.64 49.0366L57.2614 41.4151C57.3396 41.337 57.4662 41.337 57.5443 41.4151L61.5041 45.3749Z"
                                    fill="#008CFF"
                                />
                                <path
                                    d="M63.7775 43.102C63.8556 43.1801 63.8556 43.3067 63.7775 43.3848L62.0843 45.0781C62.0062 45.1562 61.8796 45.1562 61.8015 45.0781L57.8417 41.1183C57.7636 41.0401 57.7636 40.9135 57.8417 40.8354L59.5349 39.1422C59.613 39.0641 59.7396 39.0641 59.8177 39.1422L63.7775 43.102Z"
                                    fill="#008CFF"
                                />
                                <path
                                    d="M49.4381 49.7103L53.2079 53.4801C53.3148 53.5871 53.269 53.7694 53.1242 53.813L47.7276 55.4398C47.5749 55.4859 47.4324 55.3433 47.4784 55.1906L49.1052 49.794C49.1488 49.6492 49.3312 49.6034 49.4381 49.7103Z"
                                    fill="#008CFF"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_381_661">
                                    <rect width="70" height="70" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>

                    <div className={style.formTitle}>
                        <h2>{intl.formatMessage({ id: 'changeEmail.headerTitleH2' })}</h2>
                        <p>{intl.formatMessage({ id: 'changeEmail.formDescriptionP' })}</p>
                    </div>
                </div>

                <div className={style.formInputs}>
                    <input
                        className={style.inputStyle}
                        value={email}
                        onChange={(e) => validationInputEmail(e)}
                        placeholder={intl.formatMessage({ id: 'changeEmail.input.email' })}
                        type="email"
                        name="email"
                        id="email"
                        required
                    />

                    {userData != null ? (
                        <div className={style.currentEmail}>
                            <h3>{intl.formatMessage({ id: 'changeEmail.currentEmail' })} </h3>
                            <span>{userData.email}</span>
                        </div>
                    ) : (
                        <div className={style.currentEmail}>
                            <span>{intl.formatMessage({ id: 'changeEmail.currentEmail.login' })}</span>
                        </div>
                    )}

                    <span className={style.error}>{error}</span>
                </div>

                <div className={style.formButtons}>
                    <button type="submit" className={style.buttonSubmit}>
                        {intl.formatMessage({ id: 'changeEmail.button.submit' })}
                    </button>
                    <button type="button" onClick={() => buttonBackPage()} className={style.buttonCancel}>
                        {intl.formatMessage({ id: 'changeEmail.button.cancel' })}
                    </button>
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
