'use client';

import '@/style/global.css';
import style from '@/style/layout.pagesWithoutAccount.module.css';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className={style.pagesWithoutAccount}>{children}</div>;
}
