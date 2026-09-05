'use client'

import { useTheme } from "next-themes";
import Cookies from 'js-cookie';

export const setThemeFun = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { theme, resolvedTheme, setTheme } = useTheme();
    console.log('theme:', theme);
    console.log('resolvedTheme:', resolvedTheme);

    if (theme == 'system' && resolvedTheme != undefined) {
        Cookies.set('theme', resolvedTheme, {
            path: '/',
            secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'production',
            sameSite: process.env.NEXT_PUBLIC_COOKIE_SECURE ? 'none' : 'lax',
        });
    } else if (theme != undefined) {
        Cookies.set('theme', theme, {
            path: '/',
            secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'production',
            sameSite: process.env.NEXT_PUBLIC_COOKIE_SECURE ? 'none' : 'lax',
        });
    }

    if (theme != undefined) {
        setTheme(theme);
    }
};

