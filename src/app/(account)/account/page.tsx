"use client"
import { useState, useEffect, ChangeEvent, useRef, FormEvent } from "react"
import style from "@/style/account.module.css";
import { useAppSelector, useAppDispatch, useAppStore } from '@/components/hooks'
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Account() {

    const [fileAvatar, setFileAvatar] = useState<File[]>([])
    const [showAvatarPreviwePopUp, setAvatarPreviweShowPopUp] = useState(false)
    const [deleteAccountPopUp, setDeleteAccountPopUp] = useState(false)
    const [filePreviwe, setFilePreviwe] = useState<string | ArrayBuffer | null>(null)

    const [submitLoader, setSubmitLoader] = useState(false);
    const [error, setError] = useState('')

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL

    
    const fileInputChange = () => {
        fileInputRef.current?.click(); 
    }
    
    const { isAuth, userData } = useAppSelector(state => state.authReducer)
    const router = useRouter()
    
    useEffect(() => {

        // localStorage.setItem('leave', 'true')

    }, [])


    
    const showSubmitLoaderFun = () => {
        setSubmitLoader(true)
    }

    const closeSubmitLoaderFun = () => {
        setSubmitLoader(false)
    }

    
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        //console.log(1);
        //console.log(e.target.files);
        
        

        if (e.target.files != null) {
            const files = e.target.files;
            //console.log(files);
            let fileFilter = []

            if (files[0].size != 0 || files[0].size != undefined) {
                fileFilter.push(files[0])
            }

            setFileAvatar(fileFilter) 

            const file = files[0];
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
                //console.log(reader.result);
                setFilePreviwe(reader.result)      
            };  

            showAvatarFullViewPopUp()    

        }
    };



    const upLoadAvatar = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {

            showSubmitLoaderFun()

            if (fileAvatar != null) {

                const token = localStorage?.getItem("token")

                const date = new Date()

                let month: number | string = date.getMonth() + 1

                if (month < 10) {
                    month = '0' + month
                }

                // console.log(`${date.getDate()}${month}${date.getFullYear()}`)

                const formData = new FormData();
                formData.append('avatar', fileAvatar[0]);
                formData.append('v', `${date.getDate()}${month}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`);

                // formData.forEach((value, key) => {
                    //console.log(`${key}:`, value);
                // });


                const response = await axios.post(apiUrl + '/api/change/avatar', 


                    formData, 

                    {
                        headers: {
                            'authorization': `Bearer ${token}`,
                        }
                    });

                //console.log(response);
                closeAvatarFullViewPopUp()
                location.reload()
                
                    
            } else {

            }

        } catch (error) {
            closeSubmitLoaderFun()
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

    const setDefaultAvatar = async () => {

        const token = localStorage?.getItem("token")

        try {

            showSubmitLoaderFun()

            const response = await axios.post(apiUrl + '/api/change/avatar/default', 
                {},
                {
                    headers: {
                        'authorization': `Bearer ${token}`,
                    }
                }
            );

        } catch (error) {
            closeSubmitLoaderFun()
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

        //console.log(response);
        // closeAvatarFullViewPopUp()
        location.reload()
    }
    


    const showAvatarFullViewPopUp = () => {
        setAvatarPreviweShowPopUp(true)
    }

    const closeAvatarFullViewPopUp = () => {
        setAvatarPreviweShowPopUp(false)
        setFilePreviwe(null) 
    }


    const showDeleteAccountPopUpFun = () => {
        setDeleteAccountPopUp(true)
    }

    const closeDeleteAccountPopUpFun = () => {
        setDeleteAccountPopUp(false)
    }
    

    const logOutFun = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }

    const buttonBackPage = () => {
        router.push('/sendfile')
    }



    return (
        <div className={style.account}>

            <div className={style.accountBlock}>


                {
                    showAvatarPreviwePopUp != false ? (
                        <div className={style.avatarPreviweBackground}>

                            <form className={style.avatarPreviwe} onSubmit={(e) => upLoadAvatar(e)}>

                                <div className={style.avatarPreviweHead}>

                                    <div className={style.previweHeadTitle}>
                                        <h2>Ваша аватарка</h2>
                                    </div>

                                    <div className={style.previweHeadButtonClose}>

                                        <button type="button" onClick={() => closeAvatarFullViewPopUp()} className={style.styleButtonPopUpClose}>

                                            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF">
                                                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                                            </svg>

                                        </button>

                                    </div>

                                </div>

                                <div className={style.avatarPreviweImgBlock}>

                                    <div className={style.avatarPreviweImgMask} style={{backgroundImage: `url(${String(filePreviwe == null ? userData?.avatar[1000] : filePreviwe)})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover'}}>
    
                                    </div>

                                    <span className={style.colorRed}>{ error }</span>
                                    
                                </div>

                                {
                                    filePreviwe == null ? (
                                        <div className={style.avatarPreviweButtons}>
                                            <button type="button" onClick={() => fileInputChange()} className={style.styleButtonSave}>Изменить</button>
                                            <button type="button" onClick={() => setDefaultAvatar()} className={style.styleButtonCancel}>Удалить</button>
                                        </div>
                                    ) : (
                                        <div className={style.avatarPreviweButtons}>

                                            {

                                                submitLoader != false ? (

                                                    <button className={style.styleButtonLoader} type="button">
                                                    
                                                        <svg width="25" height="25" className={style.userDataLoaderImg} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clipPath="url(#clip0_223_516)">
                                                                <circle cx="25" cy="25" r="22.5" stroke="#132a47" strokeWidth="5"/>
                                                                <path d="M34.5524 45.3716C35.1386 46.6217 34.6033 48.1232 33.3009 48.5817C29.1743 50.0343 24.7234 50.3834 20.3948 49.5722C15.2442 48.6069 10.5271 46.0475 6.91016 42.2557C3.29318 38.4638 0.959162 33.6313 0.237921 28.4408C-0.368215 24.0788 0.19048 19.6493 1.83617 15.5958C2.35556 14.3165 3.88066 13.8527 5.10172 14.4972V14.4972C6.32277 15.1417 6.77389 16.6504 6.28665 17.9423C5.1119 21.0571 4.72854 24.4293 5.19034 27.7527C5.76733 31.905 7.63454 35.7711 10.5281 38.8045C13.4217 41.838 17.1954 43.8855 21.3159 44.6578C24.6137 45.2758 28.0003 45.052 31.1671 44.0255C32.4805 43.5997 33.9662 44.1215 34.5524 45.3716V45.3716Z" fill="#C7E6FF"/>
                                                            </g>

                                                            <defs>
                                                                <clipPath id="clip0_223_516">
                                                                    <rect width="50" height="50" fill="white"/>
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    
                                                    </button>

                                                ) : (
                                                    <button type="submit" className={style.styleButtonSave}>Сохранить</button>
                                                )

                                            }

                                        </div>
                                    )
                                }


                                {
                                    submitLoader != false ? (

                                        <div className={style.submitLoaderBackground}>

                                        </div>

                                    ) : (
                                        <div style={{position: 'absolute'}}></div>
                                    )
                                }

                               

                            </form>

                        </div>
                    ) : (
                        <div></div>
                    )
                }

{/* 
                {
                    deleteAccountPopUp != false ? (
                        <div className={style.deleteAccountBackground}>

                            <div className={style.deleteAccount}>

                                <div className={style.deleteAccountInfo}>
                                    <h2>Удалить аккаунт</h2>
                                    <p>Ваш аккаунт будет навсегда и без возвратно удалён</p>
                                </div>

                                <div className={style.deleteAccountButtons}>
                                    <button type="submit" className={style.styleButtonDelete}>Удалить</button>
                                    <button type="button" onClick={() => closeDeleteAccountPopUpFun()} className={style.styleButtonCancel}>Отмена</button>
                                </div>

                            </div>

                        </div>
                    ) : (
                        <div></div>
                    )
                }

                 */}





                <header className={style.accountHeader}>
    
                    <div className={style.buttonBackPageBlock}>
                        <button type="button" onClick={() => buttonBackPage()} className={style.buttonBackPage}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#ffffff"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
                        </button>
                    </div>           
                            
                    <div className={style.headerTitle}>
                        <h2>Аккаунт</h2>
                    </div>

                </header>

                { 

                    isAuth == false ? (
                        <div className={style.loadingBlock}>
                            <span className={style.loading}>Загрузка...</span>
                        </div>
                    ) : (
            
                    <div className={style.accountInfo}>


                        <div className={style.accountInfoBlock}>

                            <div className={style.userData}>

                                <div className={style.userAvatarBlock}>
                                    <img onClick={() => showAvatarFullViewPopUp()} className={style.avatarEdit} src={'./avatarEditNew.svg'} alt={''}/>
                                    <img className={style.userAvatarImg} src={ userData?.avatar[400] as string | undefined } alt={`Аватар пользователя ${userData?.username}`}/>
                                </div>

                                <div className={style.userInfoBlock}>
                                    <h3 className={style.userName}>{ userData?.username }</h3>
                                    <span className={style.userEmail}>{ userData?.email}</span>
                                </div>
     
                                <form className={style.hide}>
                                    <input type="file" ref={fileInputRef} accept="image/*" onChange={(e) => handleFileChange(e)}/>
                                </form>

                            </div>

                        </div>
                        


                        <div className={style.accountSetting}>

                            <div className={style.links}>
                                <Link className={style.link} href={'/change/email'}>Изменить адрес эл. почты</Link>
                                <Link className={style.link} href={'/change/name'}>Изменить имя пользователя</Link>
                                <Link className={style.link} href={'/change/password'}>Изменить пароль</Link>
                                {/* <button className={`${style.colorRed} ${style.linkButton}`} onClick={() => showDeleteAccountPopUpFun()}>Удалить аккаунт</button> */}
                                <Link className={`${style.colorRed} ${style.link}`} href={'/delete/verification'}>Удалить аккаунт</Link>
                            </div>

                        </div>

                        <div className={style.accountSettingDop}>
                            <button className={style.buttonLogOut} onClick={() => logOutFun()}>Выход</button>
                        </div>

                    </div>
                

                    )
                        
                }

            </div>

        </div>

    )

}