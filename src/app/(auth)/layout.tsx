'use client';
// import type { Metadata } from "next";
// import { Roboto } from 'next/font/google';

import { setThemeFun } from '@/components/layoutActionsClient';
import '@/style/global.css';
import style from '@/style/layout.auth.module.css';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    setThemeFun();

    return <div className={style.auth}>{children}</div>;
}
