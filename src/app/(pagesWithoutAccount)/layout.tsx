'use client'

import "@/style/global.css";
import style from "@/style/layout.pagesWithoutAccount.module.css";
import { useAppSelector, useAppDispatch, useAppStore } from '@/components/hooks'
import { useEffect, useState } from "react";

import { setAuth, setUserData } from '@/festures/authSlice'
import axios from "axios";

import { useRouter  } from "next/navigation";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // const { isAuth, userData } = useAppSelector(state => state.authReducer)
  // const dispatch = useAppDispatch()
  // const router = useRouter();
  // const searchParams = useSearchParams();

  //useSearchParams Error

  const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL

  return (

    <div className={style.pagesWithoutAccount}>
      { children }
    </div>
    
  );

}
