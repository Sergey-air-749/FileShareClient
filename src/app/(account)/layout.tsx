'use client'

import "@/style/global.css";
import styleAccount from "@/style/account.module.css";
import style from "@/style/layout.account.module.css";
import { useAppSelector, useAppDispatch, useAppStore } from '@/components/hooks'
import { useEffect, useState } from "react";

import { setAuth, setUserData } from '@/festures/authSlice'
import axios from "axios";

import { useRouter  } from "next/navigation";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isAuth, userData } = useAppSelector(state => state.authReducer)
  const dispatch = useAppDispatch()
  const router = useRouter();
  // const searchParams = useSearchParams();

  //useSearchParams Error

  const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL

  useEffect(() => {
    //console.log(isAuth);
  }, [isAuth])

  //console.log(router);

  useEffect(() => {
    const token = localStorage?.getItem("token")

    const getUserData = async () => {

      try {

        const response = await axios.get(apiUrl + '/api/getUserData', {
          headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        //console.log('Response:', response.data);

        dispatch(setUserData(response.data))
        dispatch(setAuth())

      } catch (error) {
          console.log(error);
          if (axios.isAxiosError(error)) {
              const serverMessage = error
              //console.log(serverMessage);
              
              if (serverMessage.response?.data?.msg != undefined) {
                console.log(serverMessage.response?.data?.msg);   
                
                if (serverMessage.response?.data?.msg != "invalid token" || serverMessage.response?.data?.msg != "invalid data") {

                  if (location.pathname != '/delete/successfully' && location.pathname != '/recovering/successfully') {
                    router.push('/login')
                  }

                }
                
              } else {
                console.log(serverMessage.message)
              }
          }
      }
    }

    // if (token != null) {
      getUserData()
    // } else {
      // router.push('/login')
    // }
  }, [])

  
    if (userData != null) {

      //console.log(userData?.isGuest == undefined);
    
      if (userData?.isGuest == undefined) {
  
        return (
          <div className={style.accountLayout}>
            { children }
          </div>
          
        );
  
      } else {
        
        return (
          <div className={styleAccount.accountSettingstyle}>
            
            <form className={styleAccount.accountSettingstyleForm}>

                <div className={styleAccount.content}>

                    <main>

                        <div className={styleAccount.accountSettingstyleMainHead}>

                            <div className={styleAccount.formIcon}>

                                <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M54 49.5C54 54.1944 45.4934 58 35 58C24.5066 58 16 54.1944 16 49.5C16 47.0553 18.3069 44.8517 22 43.301C25.3986 41.874 29.9712 41 35 41C45.4934 41 54 44.8056 54 49.5Z" fill="#96C3FF"/>
                                    <circle cx="35" cy="30" r="8" fill="#96C3FF"/>
                                    <circle cx="35" cy="35" r="23.5" stroke="#008CFF" strokeWidth="3"/>
                                    <circle cx="52" cy="51" r="8" fill="white" stroke="white" strokeWidth="2"/>
                                    <rect x="47" y="50" width="10" height="2" rx="1" fill="#008CFF"/>
                                    <rect x="51" y="56" width="10" height="2" rx="1" transform="rotate(-90 51 56)" fill="#008CFF"/>
                                </svg>


                            </div>

                            <div className={styleAccount.formTitle}>
                              <h2>Доступ закрыт</h2>
                            </div>

                        </div>


                        <div className={styleAccount.accountSettingstyleInfo}>

                          <p>
                            Настройки аккаунта недоступны в гостевом режимеы
                          </p>
                        
                        </div>

                        <div className={styleAccount.accountSettingstyleButtons}>

                          <a href="/" className={styleAccount.styleButtonBackHome}>Вернуться на главную</a>
                        
                        </div>

                    </main>
                </div>

            </form>


        </div>
        );
      }
      
    } else {

      return (

        <div className={style.accountLayout}>
          
          {
            userData == null ? (

              <div className={style.userDataLoaderBackground}>

                <div className={style.userDataLoader}>
                 
                  {/* <img src={'./loader.svg'} className={style.userDataLoaderImg} alt="Загрузка..." /> */}

                  <svg width="60" height="60" className={style.userDataLoaderImg} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_223_516)">
                          <circle cx="25" cy="25" r="22.5" stroke="#21487A" strokeWidth="5"/>
                          <path d="M34.5524 45.3716C35.1386 46.6217 34.6033 48.1232 33.3009 48.5817C29.1743 50.0343 24.7234 50.3834 20.3948 49.5722C15.2442 48.6069 10.5271 46.0475 6.91016 42.2557C3.29318 38.4638 0.959162 33.6313 0.237921 28.4408C-0.368215 24.0788 0.19048 19.6493 1.83617 15.5958C2.35556 14.3165 3.88066 13.8527 5.10172 14.4972V14.4972C6.32277 15.1417 6.77389 16.6504 6.28665 17.9423C5.1119 21.0571 4.72854 24.4293 5.19034 27.7527C5.76733 31.905 7.63454 35.7711 10.5281 38.8045C13.4217 41.838 17.1954 43.8855 21.3159 44.6578C24.6137 45.2758 28.0003 45.052 31.1671 44.0255C32.4805 43.5997 33.9662 44.1215 34.5524 45.3716V45.3716Z" fill="#C7E6FF"/>
                      </g>

                      <defs>
                          <clipPath id="clip0_223_516">
                              <rect width="50" height="50" fill="white"/>
                          </clipPath>
                      </defs>
                  </svg>
 

                </div>

              </div>

            ) : (
              <div></div>
            )
          }

        </div>
        
      );
      
    }

  

}
