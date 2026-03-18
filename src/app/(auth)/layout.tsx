// import type { Metadata } from "next";
import { Roboto } from 'next/font/google';

import '@/style/global.css';
import style from '@/style/layout.auth.module.css';

const robotoSans = Roboto({
    weight: ['400'],
    variable: '--font-roboto',
    subsets: ['latin'],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className={style.auth}>{children}</div>;
}
