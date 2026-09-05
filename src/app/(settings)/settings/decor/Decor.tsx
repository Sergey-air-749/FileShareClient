'use client';
import { useState, ChangeEvent, useRef, FormEvent, useEffect } from 'react';

import style from '@/style/settings.decor.module.css';

import { useAppSelector } from '@/components/hooks';
import SettingsNav from '@/app/(settings)/settings/SettingsNav';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { useIntl } from 'react-intl';

import { useTheme } from 'next-themes';

import Cookies from 'js-cookie';

export default function Decor() {
    const [themesSelect, setThemesSelect] = useState('');
    const [error, setError] = useState('');

    const intl = useIntl();

    const { theme, resolvedTheme, setTheme } = useTheme();

    console.log(useTheme());
    console.log(theme);

    const themesArr = [
        { value: 'system', text: intl.formatMessage({ id: 'decor.themes.option.value.system' }) },
        { value: 'light', text: intl.formatMessage({ id: 'decor.themes.option.value.light' }) },
        { value: 'dark', text: intl.formatMessage({ id: 'decor.themes.option.value.dark' }) },
    ];

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

    useEffect(() => {
        const themeSelect = localStorage.getItem('theme');

        if (themeSelect != null) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setThemesSelect(themeSelect);
        }
    }, []);

    const fileInputChange = () => {
        fileInputRef.current?.click();
    };

    const { isAuth, userData } = useAppSelector((state) => state.authReducer);
    const router = useRouter();

    // const showSubmitLoaderFun = () => {
    //     setSubmitLoader(true);
    // };

    // const closeSubmitLoaderFun = () => {
    //     setSubmitLoader(false);
    // };

    const setThemeFun = (e: ChangeEvent<HTMLSelectElement>) => {
        const theme = e.target.value;
        console.log('theme:', theme);

        if (theme == 'system' && resolvedTheme != undefined) {
            Cookies.set('theme', resolvedTheme, {
                path: '/',
                secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'production',
                sameSite: process.env.NEXT_PUBLIC_COOKIE_SECURE ? 'none' : 'lax',
            });
        } else {
            Cookies.set('theme', theme, {
                path: '/',
                secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'production',
                sameSite: process.env.NEXT_PUBLIC_COOKIE_SECURE ? 'none' : 'lax',
            });
        }

        setTheme(theme);
    };

    const buttonBackPage = () => {
        router.push('/settings');
    };

    return (
        <div className={style.settingsBlock}>
            <header className={style.settingsHeader}>
                <div className={style.buttonBackPageBlock}>
                    <button type="button" onClick={() => buttonBackPage()} className={style.buttonBackPage}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="36px"
                            viewBox="0 -960 960 960"
                            width="36px"
                            fill="var(--color-text)"
                        >
                            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
                        </svg>
                    </button>
                </div>

                <h2>{intl.formatMessage({ id: 'decor.settingsHeaderH2' })}</h2>
            </header>

            <main className={style.settingsMainBlock}>
                <div className={style.themesSelectBlock}>
                    <h2 className={style.themesSelectTitle}>{intl.formatMessage({ id: 'decor.themes.title' })}</h2>

                    <div className={style.themesInputSelectBlock}>
                        <select className={style.themesInputSelect} onChange={(e) => setThemeFun(e)}>
                            {themesArr.map((item, index) =>
                                item.value == themesSelect ? (
                                    <option selected key={index} value={item.value}>
                                        {item.text}
                                    </option>
                                ) : (
                                    <option key={index} value={item.value}>
                                        {item.text}
                                    </option>
                                )
                            )}
                        </select>

                        {/* <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
                        </button> */}
                    </div>
                </div>
            </main>
        </div>
    );
}
