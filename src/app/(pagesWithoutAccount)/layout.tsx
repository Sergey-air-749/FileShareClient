'use client';

import { setThemeFun } from '@/components/layoutActionsClient';
import '@/style/global.css';
import style from '@/style/layout.pagesWithoutAccount.module.css';
import { useEffect } from 'react';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    setThemeFun();

    return <div className={style.pagesWithoutAccount}>{children}</div>;
}
