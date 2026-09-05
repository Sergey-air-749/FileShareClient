'use client';
import { useState, ChangeEvent, useRef, FormEvent, useEffect } from 'react';
import Cookies from 'js-cookie';
import style from '@/style/settings.main.block.module.css';
import { useIntl } from 'react-intl';

import { useAppSelector } from '@/components/hooks';
import SettingsNav from '@/app/(settings)/settings/SettingsNav';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SettingsMainBlock() {
    // const [option, setOption] = useState('');

    const [submitLoader, setSubmitLoader] = useState(false);
    const [timeFormat, setTimeFormat] = useState('');
    const [locale, setLocale] = useState<string>('');
    const [error, setError] = useState('');

    const intl = useIntl();

    const languages = [
        { value: 'ru', text: intl.formatMessage({ id: 'settings.languages.option.value.ru' }) },
        { value: 'en', text: intl.formatMessage({ id: 'settings.languages.option.value.en' }) },
    ];

    const timeFormats = [
        { value: '12', text: intl.formatMessage({ id: 'settings.date.option.value.12' }) },
        { value: '23', text: intl.formatMessage({ id: 'settings.date.option.value.23' }) },
    ];

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

    useEffect(() => {
        const savedLocale = Cookies.get('language');
        if (savedLocale != undefined) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLocale(savedLocale);
            console.log(savedLocale);
        }
    }, []);

    useEffect(() => {
        const timeFormatSelect = localStorage.getItem('timeFormat');

        if (timeFormatSelect != null) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTimeFormat(timeFormatSelect);
        } else {
            const is12hour = new Date().toLocaleTimeString();

            console.log(is12hour.includes('pm') != false && is12hour.includes('am') != false);

            if (is12hour.includes('pm') != false || is12hour.includes('am') != false) {
                localStorage.setItem('timeFormat', '12');
                setTimeFormat('12');
            } else {
                localStorage.setItem('timeFormat', '23');
                setTimeFormat('23');
            }
        }
    }, []);

    const fileInputChange = () => {
        fileInputRef.current?.click();
    };

    const switchLocale = (newLocale: string) => {
        setLocale(newLocale);
        console.log(newLocale);

        Cookies.set('language', newLocale, {
            path: '/',
            secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'production',
            sameSite: process.env.NEXT_PUBLIC_COOKIE_SECURE ? 'none' : 'lax',
        });

        console.log(Cookies.get('language'));
    };

    const { isAuth, userData } = useAppSelector((state) => state.authReducer);
    const router = useRouter();

    const selectFunSettings = (e: ChangeEvent<HTMLSelectElement>, settings: string) => {
        const value = e.target.value;
        localStorage.setItem(settings, value);
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

                <h2>{intl.formatMessage({ id: 'settings.settingsHeaderH2' })}</h2>
            </header>

            <main className={style.settingsMainBlock}>
                <div className={style.settingsItems}>
                    <h2 className={style.settingsItemsTitle}>{intl.formatMessage({ id: 'settings.date.title' })}</h2>

                    <div className={style.timeFormatSelectBlock}>
                        <select className={style.selectInputStyle} onChange={(e) => selectFunSettings(e, 'timeFormat')}>
                            {timeFormats.map((item, index) =>
                                item.value == timeFormat ? (
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
                    </div>
                </div>

                {/* settingsItemsBlockTitle */}

                <div className={style.settingsItems}>
                    <h2 className={style.settingsItemsTitle}>
                        {intl.formatMessage({ id: 'settings.languages.title' })}
                    </h2>

                    <div className={style.languageSelectBlock}>
                        <select
                            value={locale}
                            className={style.selectInputStyle}
                            onChange={(e) => switchLocale(e.target.value)}
                        >
                            {languages.map((item, index) => (
                                <option key={index} value={item.value}>
                                    {item.text}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </main>
        </div>
    );
}
