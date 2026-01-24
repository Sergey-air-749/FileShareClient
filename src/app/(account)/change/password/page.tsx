"use client"
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import style from "@/style/change.password.module.css"
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {

    const [passwordOld, setPasswordOld] = useState("")
    const [passwordNew, setPasswordNew] = useState("")
    const [passwordRepeatNew, setPasswordRepeatNew] = useState("")
    const [error, setError] = useState("")

    const [showOldPasswordStatus, setShowOldPasswordStatus] = useState("password")
    const [showNewPasswordStatus, setShowNewPasswordStatus] = useState("password")
    const [showRepeatNewPasswordStatus, setShowRepeatNewPasswordStatus] = useState("password")

    
    const [showLoader, setShowLoader] = useState(false)

    
    const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const router = useRouter()

    const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL


    
    const showLoaderFun = () => {
        setShowLoader(true)
    }

    const closeLoaderFun = () => {
        setShowLoader(false)
    }


    const validationInputPasswordOld = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        //console.log(passwordRegexp.test(value)); 
        setPasswordOld(value) 
        closeLoaderFun() 
    }

    const validationInputPasswordNew = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        //console.log(passwordRegexp.test(value)); 

        if (passwordRegexp.test(value) == true) {
            setError("")
        } else {
            setError("Пароль должна состоять от 8 символов, включая цифры, заглавные буквы, строчные буквы и спец символов: @, $, !, %, *, ?, &.")
        }

        setPasswordNew(value)
        closeLoaderFun()   
    }

    const validationInputPasswordRepeatNew = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        //console.log(passwordRegexp.test(value)); 

        if (passwordRegexp.test(value) == true) {
            setError("")
        } else {
            setError("Пароль должна состоять от 8 символов, включая цифры, заглавные буквы, строчные буквы и спец символов: @, $, !, %, *, ?, &.")
        }

        setPasswordRepeatNew(value) 
        closeLoaderFun()  
    }






    const showOldPasswordFun = () => {
        if (showOldPasswordStatus == "password") {
            setShowOldPasswordStatus("text")
        } else {
            setShowOldPasswordStatus("password")
        }
    }

    const showNewPasswordFun = () => {
        if (showNewPasswordStatus == "password") {
            setShowNewPasswordStatus("text")
        } else {
            setShowNewPasswordStatus("password")
        }
    }

    const showRepeatNewPasswordFun = () => {
        if (showRepeatNewPasswordStatus == "password") {
            setShowRepeatNewPasswordStatus("text")
        } else {
            setShowRepeatNewPasswordStatus("password")
        }
    }

    const buttonBackPage = () => {
        router.back()
    }

    const submitUserUpData = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

            try {

                showLoaderFun()
            
                const token = localStorage?.getItem('token')

                const userUpData = {
                    passwordOld: passwordOld,
                    passwordNew: passwordNew,
                    passwordRepeatNew: passwordRepeatNew,
                }

                //console.log(userUpData);

                const response = await axios.put(apiUrl + '/api/change/password', 
                    userUpData,
                    {
                        headers: {
                            'authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }, 
                    }

                );
                //console.log('Response:', response);

                router.push('/sendfile')
                
                location.pathname = '/account'


            } catch (error) {
                closeLoaderFun() 
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



    return (
        <div className={style.changePassword}>
            
            <form className={style.formChangePassword} onSubmit={(e) => submitUserUpData(e)}>

                <div className={style.formHead}>

                    <div className={style.formIcon}>
                        
                        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M54 49.5C54 54.1944 45.4934 58 35 58C24.5066 58 16 54.1944 16 49.5C16 47.0553 18.3069 44.8517 22 43.301C25.3986 41.874 29.9712 41 35 41C45.4934 41 54 44.8056 54 49.5Z" fill="#96C3FF"/>
                            <circle cx="35" cy="30" r="8" fill="#96C3FF"/>
                            <circle cx="35" cy="35" r="23.5" stroke="#008CFF" strokeWidth="3"/>
                            <rect x="4" y="45" width="36" height="12" rx="6" fill="white"/>
                            <circle cx="10" cy="51" r="2" fill="#008CFF"/>
                            <circle cx="18" cy="51" r="2" fill="#008CFF"/>
                            <circle cx="26" cy="51" r="2" fill="#008CFF"/>
                            <circle cx="34" cy="51" r="2" fill="#008CFF"/>
                            <circle cx="52" cy="51" r="8" fill="white" stroke="white" strokeWidth="2"/>
                            <path d="M50.4024 54.6395L47.7522 55.1684L48.2811 52.5182L54.8923 45.907L57.0136 48.0283L50.4024 54.6395Z" fill="white" stroke="#008CFF"/>
                            <rect x="57.7207" y="48.0283" width="3" height="4" rx="0.2" transform="rotate(135 57.7207 48.0283)" fill="#008CFF"/>
                        </svg>


                    </div>

                    <div className={style.formTitle}>

                        <h2>Изменить пароль</h2>
                    </div>

                </div>

                <div className={style.formInputs}>

                    <div className={style.passwordBlock}>
                        <input className={style.inputStylePassword} onChange={(e) => validationInputPasswordOld(e)} placeholder="Старый пароль" type={showOldPasswordStatus} name="passwordOld" id="passwordOld" required/>

                        <button className={style.buttonStylePassword} onClick={() => showOldPasswordFun()} type="button">
                            {
                                showOldPasswordStatus == "password" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                                )
                            }
                            
                        </button>
                    </div>

                    <div className={style.passwordBlock}>
                        <input className={style.inputStylePassword} onChange={(e) => validationInputPasswordNew(e)} placeholder="Новый пароль" type={showNewPasswordStatus} name="passwordNew" id="passwordNew" required/>

                        <button className={style.buttonStylePassword} onClick={() => showNewPasswordFun()} type="button">
                            {
                                showNewPasswordStatus == "password" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                                )
                            }
                            
                        </button>
                    </div>

                    <div className={style.passwordBlock}>
                        <input className={style.inputStylePassword} onChange={(e) => validationInputPasswordRepeatNew(e)} placeholder="Повторите новый пароль" type={showRepeatNewPasswordStatus} name="passwordRepeatNew" id="passwordRepeatNew" required/>

                        <button className={style.buttonStylePassword} onClick={() => showRepeatNewPasswordFun()} type="button">
                            {
                                showRepeatNewPasswordStatus == "password" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                                )
                            }
                            
                        </button>
                    </div>

                    <span className={style.error}>{error}</span>
                </div>

                <div className={style.formButtons}>
                    <button type="submit" className={style.buttonSubmit}>Сохронить изменения</button>
                    <button type="button" onClick={() => buttonBackPage()} className={style.buttonCancel}>Отмена</button>
                </div>



                {
                    showLoader ? (

                        <div className={style.userDataLoaderBackground}>

                            <div className={style.userDataLoader}>

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

            </form>

        </div>
    );
}