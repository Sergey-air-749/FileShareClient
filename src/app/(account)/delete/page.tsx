"use client"
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import style from "@/style/delete.account.module.css"
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAppSelector } from "@/components/hooks";

export default function DeleteAccount() {

    const { isAuth, userData } = useAppSelector(state => state.authReducer)
    
    const [isVerify, setIsVerify] = useState(false)
    const [error, setError] = useState("")

    const router = useRouter()

    const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL

    useEffect(() => {

        const verifySession = async () => {
            try {

                const token = localStorage?.getItem('token')

                const response = await axios.get(apiUrl + '/api/get/session',

                    {
                        headers: {
                            'authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }, 
                    }
                );

                const localSession = localStorage.getItem('session')
                const serverSession = response.data.sessionId

                //console.log(response);
                //console.log(localSession);
                
                if (localSession != serverSession) {
                    router.back()
                } else {
                    setIsVerify(true)
                }

            } catch (error) {
                console.log(error);
                if (axios.isAxiosError(error)) {
                    const serverMessage = error
                    //console.log(serverMessage);
                    
                    if (serverMessage.response?.data?.msg != undefined) {
                        console.log(serverMessage.response?.data?.msg);     
                        if (serverMessage.response?.data?.msg == 'Нет сессий') {
                            location.pathname = '/delete/verification'
                        }
                        setError(serverMessage.response?.data?.msg)
                    } else {
                        console.log(serverMessage.message)
                        setError(serverMessage.message)
                    }
                }
            }
        }

        verifySession()

    }, [])







    const submitAccountDelete = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

            try {
            
                const token = localStorage?.getItem('token')

                const response = await axios.delete(apiUrl + '/api/account/delete',

                    {
                        headers: {
                            'authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }, 
                    }
                );
                //console.log('Response:', response);

                location.pathname = '/delete/successfully'

                localStorage.removeItem('token')
                

            } catch (error) {
                console.log(error);
                if (axios.isAxiosError(error)) {
                    const serverMessage = error
                    //console.log(serverMessage);
                    
                    if (serverMessage.response?.data?.msg != undefined) {
                        console.log(serverMessage.response?.data?.msg);     
                        setError(serverMessage.response?.data?.msg)
                    } else {
                        console.log(serverMessage.message)
                        setError(serverMessage.message)
                    }
                }
            }
    }


    const buttonBackPage = () => {
        router.push('/account')
    }


    return (
        <div className={style.deleteAccount}>

            <form onSubmit={(e) => submitAccountDelete(e)} className={style.deleteAccountForm}>



                <header className={style.deleteAccountHead}>

                    <div className={style.buttonBackPageBlock}>
                        <button type="button" onClick={() => buttonBackPage()} className={style.buttonBackPage}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#ffffff"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
                        </button>
                    </div>           
                            
                    {/* <div className={style.headerTitle}>
                        <h2>Аккаунт</h2>
                    </div> */}
                   
                </header>



                <div className={style.content}>

                    <main>

                        <div className={style.deleteAccountMainHead}>

                            <div className={style.formIcon}>

                                <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M54 49.5C54 54.1944 45.4934 58 35 58C24.5066 58 16 54.1944 16 49.5C16 47.0553 18.3069 44.8517 22 43.301C25.3986 41.874 29.9712 41 35 41C45.4934 41 54 44.8056 54 49.5Z" fill="#96C3FF"/>
                                    <circle cx="35" cy="30" r="8" fill="#96C3FF"/>
                                    <circle cx="35" cy="35" r="23.5" stroke="#008CFF" strokeWidth="3"/>
                                    <circle cx="52" cy="51" r="8" fill="white" stroke="white" strokeWidth="2"/>
                                    <rect x="47" y="50" width="10" height="2" rx="1" fill="#008CFF"/>
                                    <rect x="51" y="56" width="10" height="2" rx="1" transform="rotate(-90 51 56)" fill="#008CFF"/>
                                </svg>


                            </div>

                            <div className={style.formTitle}>
                                <h2>Удалить аккаунт</h2>
                            </div>

                        </div>


                        <div className={style.deleteAccountInfo}>

                            <h3>Внимательно прочтите это перед тем как удалить аккаунта</h3>

                            <p>Ваш аккаунт, отправленные вам файлы и история, будет навсегда удален, отменить удаление можно в течение 14 дней</p>
                        
                        </div>

                    </main>


                    <footer className={style.styleFooter}>

                        {/* <span className={style.error}>{error}</span> */}

                        {

                            isVerify == true ? (
                                <button type="submit" className={style.styleButtonDelete}>Удалить</button>
                            ) : (
                                <div></div>
                            )

                        }
                    </footer>


                </div>


                
            </form>

        </div>
    );
}