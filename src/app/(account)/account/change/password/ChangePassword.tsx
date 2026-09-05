'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import style from '@/style/change.password.module.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { submitChangeUserPasswordServer } from './actions';
import { useIntl } from 'react-intl';

export default function ChangePassword() {
    const [passwordOld, setPasswordOld] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const [passwordRepeatNew, setPasswordRepeatNew] = useState('');
    const [error, setError] = useState('');

    const [showOldPasswordStatus, setShowOldPasswordStatus] = useState('password');
    const [showNewPasswordStatus, setShowNewPasswordStatus] = useState('password');
    const [showRepeatNewPasswordStatus, setShowRepeatNewPasswordStatus] = useState('password');

    const [showLoader, setShowLoader] = useState(false);

    const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const router = useRouter();

    const intl = useIntl();

    const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

    const showLoaderFun = () => {
        setShowLoader(true);
    };

    const closeLoaderFun = () => {
        setShowLoader(false);
    };

    const validationInputPasswordOld = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        //console.log(passwordRegexp.test(value));
        setPasswordOld(value);
        closeLoaderFun();
    };

    const validationInputPasswordNew = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        //console.log(passwordRegexp.test(value));

        if (passwordRegexp.test(value) == true) {
            setError('');
        } else {
            setError(intl.formatMessage({ id: 'changePassword.input.newPasswode.validation' }));
        }

        setPasswordNew(value);
        closeLoaderFun();
    };

    const validationInputPasswordRepeatNew = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        //console.log(passwordRegexp.test(value));

        if (passwordRegexp.test(value) == true) {
            setError('');
        } else {
            setError(intl.formatMessage({ id: 'changePassword.input.newPasswode.validation' }));
        }

        setPasswordRepeatNew(value);
        closeLoaderFun();
    };

    const showOldPasswordFun = () => {
        if (showOldPasswordStatus == 'password') {
            setShowOldPasswordStatus('text');
        } else {
            setShowOldPasswordStatus('password');
        }
    };

    const showNewPasswordFun = () => {
        if (showNewPasswordStatus == 'password') {
            setShowNewPasswordStatus('text');
        } else {
            setShowNewPasswordStatus('password');
        }
    };

    const showRepeatNewPasswordFun = () => {
        if (showRepeatNewPasswordStatus == 'password') {
            setShowRepeatNewPasswordStatus('text');
        } else {
            setShowRepeatNewPasswordStatus('password');
        }
    };

    const buttonBackPage = () => {
        router.back();
    };

    const submitChangeUserPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (passwordNew == passwordRepeatNew) {
            try {
                showLoaderFun();

                const userUpData = {
                    passwordOld: passwordOld,
                    passwordNew: passwordNew,
                };

                //console.log(userUpData);

                const response = await submitChangeUserPasswordServer(userUpData);

                //console.log('Response:', response);

                router.push('/sendfile');

                location.pathname = '/account';
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
        } else {
            closeLoaderFun();
            setError(intl.formatMessage({ id: 'changePassword.passwordDoesNotMatch.validation' }));
        }
    };

    return (
        <div className={style.changePassword}>
            <form className={style.formChangePassword} onSubmit={(e) => submitChangeUserPassword(e)}>
                <div className={style.formHead}>
                    <div className={style.formIcon}>
                        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect
                                x="21.5"
                                y="58.5"
                                width="49"
                                height="27"
                                rx="13.5"
                                transform="rotate(-90 21.5 58.5)"
                                stroke="#96C3FF"
                                strokeWidth="5"
                            />
                            <path
                                d="M55 30.583C57.3471 30.583 59.2499 32.4859 59.25 34.833V58.833C59.25 61.1802 57.3472 63.083 55 63.083H15C12.6528 63.083 10.75 61.1802 10.75 58.833V34.833C10.7501 32.4859 12.6529 30.583 15 30.583H55ZM34.9883 38.8398C32.7791 38.8398 30.9883 40.6307 30.9883 42.8398C30.9885 44.4852 31.9824 45.8977 33.4023 46.5117V53.2393C33.4023 54.1228 34.1185 54.8396 35.002 54.8398C35.8856 54.8398 36.6025 54.1229 36.6025 53.2393V46.499C38.0073 45.8785 38.9881 44.4742 38.9883 42.8398C38.9883 40.6307 37.1974 38.8398 34.9883 38.8398Z"
                                fill="#008CFF"
                            />
                            <circle cx="55" cy="56" r="12" fill="white" stroke="white" strokeWidth="2" />
                            <path
                                d="M61.5031 53.3742C61.5812 53.4523 61.5812 53.5789 61.5031 53.657L53.8817 61.2785C53.8036 61.3566 53.677 61.3566 53.5988 61.2785L49.639 57.3187C49.5609 57.2406 49.5609 57.1139 49.639 57.0358L57.2605 49.4144C57.3386 49.3363 57.4652 49.3363 57.5433 49.4144L61.5031 53.3742Z"
                                fill="#008CFF"
                            />
                            <path
                                d="M63.7765 51.1013C63.8547 51.1794 63.8547 51.306 63.7765 51.3841L62.0833 53.0773C62.0052 53.1554 61.8786 53.1554 61.8005 53.0773L57.8407 49.1175C57.7626 49.0394 57.7626 48.9128 57.8407 48.8347L59.5339 47.1415C59.612 47.0634 59.7386 47.0634 59.8167 47.1415L63.7765 51.1013Z"
                                fill="#008CFF"
                            />
                            <path
                                d="M49.4371 57.7096L53.2069 61.4794C53.3139 61.5863 53.268 61.7687 53.1232 61.8123L47.7267 63.4391C47.5739 63.4851 47.4314 63.3426 47.4774 63.1899L49.1042 57.7933C49.1479 57.6485 49.3302 57.6027 49.4371 57.7096Z"
                                fill="#008CFF"
                            />
                        </svg>
                    </div>

                    <div className={style.formTitle}>
                        <h2>{intl.formatMessage({ id: 'changePassword.formTitleH2' })}</h2>
                        <p>{intl.formatMessage({ id: 'changePassword.formDescriptionP' })}</p>
                    </div>
                </div>

                <div className={style.formInputs}>
                    <div className={style.passwordBlock}>
                        <input
                            className={style.inputStylePassword}
                            onChange={(e) => validationInputPasswordOld(e)}
                            placeholder={intl.formatMessage({ id: 'changePassword.input.oldPasswode' })}
                            type={showOldPasswordStatus}
                            name="passwordOld"
                            id="passwordOld"
                            required
                        />

                        <button
                            className={style.buttonStylePassword}
                            onClick={() => showOldPasswordFun()}
                            type="button"
                        >
                            {showOldPasswordStatus == 'password' ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="var(--color-text)"
                                >
                                    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="var(--color-text)"
                                >
                                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className={style.passwordBlock}>
                        <input
                            className={style.inputStylePassword}
                            onChange={(e) => validationInputPasswordNew(e)}
                            placeholder={intl.formatMessage({ id: 'changePassword.input.newPasswode' })}
                            type={showNewPasswordStatus}
                            name="passwordNew"
                            id="passwordNew"
                            required
                        />

                        <button
                            className={style.buttonStylePassword}
                            onClick={() => showNewPasswordFun()}
                            type="button"
                        >
                            {showNewPasswordStatus == 'password' ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="var(--color-text)"
                                >
                                    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="var(--color-text)"
                                >
                                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className={style.passwordBlock}>
                        <input
                            className={style.inputStylePassword}
                            onChange={(e) => validationInputPasswordRepeatNew(e)}
                            placeholder={intl.formatMessage({ id: 'changePassword.input.repeatPassword' })}
                            type={showRepeatNewPasswordStatus}
                            name="passwordRepeatNew"
                            id="passwordRepeatNew"
                            required
                        />

                        <button
                            className={style.buttonStylePassword}
                            onClick={() => showRepeatNewPasswordFun()}
                            type="button"
                        >
                            {showRepeatNewPasswordStatus == 'password' ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="var(--color-text)"
                                >
                                    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="var(--color-text)"
                                >
                                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <span className={style.error}>{error}</span>
                </div>

                <div className={style.formButtons}>
                    <button type="submit" className={style.buttonSubmit}>
                        {intl.formatMessage({ id: 'changePassword.button.submit' })}
                    </button>
                    <button type="button" onClick={() => buttonBackPage()} className={style.buttonCancel}>
                        {intl.formatMessage({ id: 'changePassword.button.cancel' })}
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
