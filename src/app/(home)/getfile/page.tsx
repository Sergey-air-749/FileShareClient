"use client"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import style from "@/style/getfile.module.css";

import { setAuth, setUserData } from '@/festures/authSlice'
import { useAppSelector, useAppDispatch, useAppStore } from '@/components/hooks'
import { io, Socket } from 'socket.io-client'

import Link from "next/link";
import axios from "axios";

interface FileItem {
  filename: string;
  sentFromDevice: string;
  sentToUser: string;
  userWillReceive: string;
  text: string;
  data: string;
  id: string;
}

export default function Getfile() {
  const [showPopUp, setShowPopUp] = useState(false)
  const [files, setFiles] = useState<FileItem[]>([])
  const [shareId, setShareId] = useState<String>('')
  const { isAuth, userData } = useAppSelector(state => state.authReducer)
  
  // const socket = io('http://localhost:7001/');

  const socketRef = useRef<Socket | any>(null);

  const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL
  const fileApiUrl = process.env.NEXT_PUBLIC_SERVER_FILE_API_UR
  const soketUrl = process.env.NEXT_PUBLIC_SERVER_SOCET_URL

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(`${soketUrl}/`);
    }

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    //console.log(files);
  }, [files])

  useEffect(() => {
    //console.log('New Share ID is:', shareId);
  }, [shareId])
  

  
  useEffect(() => {
    if (userData?.shareId != undefined) {

      socketRef.current.on('files', async (files: any[]) => {
        //console.log(files);
        setFiles(files)
        showPopUpFun()
      });

      socketRef.current.emit('pingfilesShareId', userData?.shareId);

    } else {
      //console.log(2);
    }
    //console.log(userData?.shareId);
  }, [userData?.shareId])




  const showPopUpFun = () => {
    setShowPopUp(true)
  }

  const closePopUpFun = () => {
    setShowPopUp(false)
  }





  const fileAcceptFun = async (filename: String, id: String) => {


    try {

      //Получает файл преоброзует его споиащю блоб ии создаёт ссылку

      const response = await axios.get(fileApiUrl + `/api/getDownloadNew/file/${userData?.shareId}/${id}`)
      //console.log(response.data);

      let link = document.createElement('a');
      link.download = String(filename);

      link.href = response.data.url
      link.click();

      //console.log(link);

    } catch (error) {
      console.log(error);
        if (axios.isAxiosError(error)) {
            const serverMessage = error
            //console.log(serverMessage);
            
            if (serverMessage.response?.data?.msg != undefined) {
              console.log(serverMessage.response?.data?.msg);     
            } else {
              console.log(serverMessage.message)
            }
        }
    } 


    //console.log({msg:'Файлы загружины'});


    const newFiles = files.filter((item) => item.id != id)

    if (JSON.stringify(newFiles) == JSON.stringify([])) {
      setShowPopUp(false)
    }
    setFiles(newFiles)


  }


  

  const textCopyFun = async (text: String, id: String) => {
    //console.log(text);
    navigator.clipboard.writeText(String(text))
    const response = await axios.get(fileApiUrl + `/api/getDownloadNew/text/${userData?.shareId}/${id}`)
    //console.log(response.data);

    const newFiles = files.filter((item) => item.id != id)
    if (JSON.stringify(newFiles) == JSON.stringify([])) {
      setShowPopUp(false)
    }
    setFiles(newFiles)
  }






  const filesAcceptFun = async () => {

    //console.log(String(files[0]?.filename));
    

    for (let i = 0; i < files.length; i++) {

      if (files[i].text != undefined) {

        for (let i = 0; i < files.length; i++) {

          navigator.clipboard.writeText(String(files[i].text))

          const response = await axios.get(fileApiUrl + `/api/getDownloadNew/text/${userData?.shareId}/${files[i].id}`)
          //console.log(response.data);

          const newFiles = files.filter((item) => item.id != files[i].id)
          setFiles(newFiles)

        }

      } else if (files[i].filename != undefined) {

        try {

          //Получает файл преоброзует его споиащю блоб ии создаёт ссылку

          const response = await axios.get(fileApiUrl + `/api/getDownloadNew/file/${userData?.shareId}/${files[i].id}`)
          //console.log(response.data);

          let link = document.createElement('a');
          link.download = String(files[i].filename);

          link.href = response.data.url
          link.click();

          const newFiles = files.filter((item) => item.id != files[i].id)
          setFiles(newFiles)
          
          //console.log(link);

        } catch (error) {
          console.log(error);
          if (axios.isAxiosError(error)) {
            const serverMessage = error
            //console.log(serverMessage);
            
            if (serverMessage.response?.data?.msg != undefined) {
              console.log(serverMessage.response?.data?.msg);     
            } else {
              console.log(serverMessage.message)
            }
          }
        } 

      }
      
    }


    //console.log({msg:'Файлы загружины'});
    setShowPopUp(false)
    setFiles([])

  }







  const allFilesCancelFun = async () => {
    try {

      const token = localStorage?.getItem("token")

      setFiles([])
      const response = await axios.post(fileApiUrl + '/api/files/cancel/' + userData?.shareId,
        {}, 
        {
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          }
        }
      )
      //console.log(response.data);

      setShowPopUp(false)
    
    } catch (error) {
      console.log(error);
    } 
  }

  const fileCancelFun = async (id: string) => {
    try {

      const token = localStorage?.getItem("token")

      const response = await axios.post(fileApiUrl + '/api/files/cancel/' + userData?.shareId + '/' +  id, 
        {}, 
        {
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          }
        }
      )
      //console.log(response.data);

      if (JSON.stringify(response.data) == JSON.stringify([])) {
        setShowPopUp(false)
      }

      const newFiles = files.filter((item) => item.id != id)
      setFiles(newFiles)

    
    } catch (error) {
      console.log(error);
    } 
  }


  //console.log(JSON.stringify(files));
  //console.log(JSON.stringify(files) != JSON.stringify([]));



  return (
    <div className={style.getfile}>

      <div className={style.blockForm}>

        <div className={style.formGetfile}>


          <div className={JSON.stringify(files) != JSON.stringify([]) && showPopUp != false ? (style.getFilePopUpBackground) : (style.hide)}>

            <div className={style.getFilePopUp}>

              <div className={style.acceptFiles}>

                <header className={style.getFilePopUpHeader}>

                  <h2 className={style.getFilePopUpTitle}>Принять файлы</h2>

                  <button type="button" onClick={() => closePopUpFun()} className={style.buttonFilePopUpClose}>                    
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                  </button>

                </header>


                <div>

                  {
                    showPopUp != false ? (
                      <div className={style.getFilePopUpItems}>
                        {
                          
                          files.map((file, index) => (

                              <div key={index} className={style.fileItem}>

                                {

                                  file.filename != undefined ? ( 

                                    <div className={style.fileBlock}>

                                      <div className={style.fileIcon}>

                                        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g clipPath="url(#clip0_103_46)">
                                            <path d="M100 100V0H50H37.5L0 37.5V50V100H100Z" fill="white"/>
                                            <path d="M50 0H37.5L0 37.5V50H50V0Z" fill="white"/>
                                            <path d="M8.53554 28.9645L28.9645 8.53553C32.1143 5.38571 37.5 7.61654 37.5 12.0711V32.5C37.5 35.2614 35.2614 37.5 32.5 37.5H12.0711C7.61654 37.5 5.38572 32.1143 8.53554 28.9645Z" fill="#E4E4E4"/>
                                            <path d="M0 37.5L37.5 0V18.75L18.75 37.5H0Z" fill="#E4E4E4"/>
                                          </g>

                                          <defs>
                                            <clipPath id="clip0_103_46">
                                            <rect width="100" height="100" rx="5" fill="white"/>
                                            </clipPath>
                                          </defs>

                                        </svg>

                                      </div>

                                      <div className={style.fileName}>
                                        <span>{file.filename}</span>
                                      </div>

                                    </div>
                                    
                                  ) : file.text != undefined ? (

                                    <div className={style.textBlock}>
                                      <span>{file.text}</span>
                                    </div>

                                  ) : (
                                    <div></div>
                                  )
                                  
                                }


                                <div className={style.fileInfo}>
                                  <span className={style.fileInfoText}>Отправитель: {file.sentToUser}</span>
                                  <span className={style.fileInfoText}>Получатель: {file.userWillReceive}</span>
                                  <span className={style.fileInfoText}>Отправлено с устройства: {file.sentFromDevice}</span>
                                  <span className={style.fileInfoText}>Время: {file.data}</span>
                                </div>

                                {

                                  file.filename != undefined ? ( 
                                    <div className={style.fileButtons}>
                                      <button className={style.styleButtonDownlodeCancel} type="button" onClick={() => fileCancelFun(file.id)}>Откланить</button>
                                      <button className={style.styleButtonDownlode} type="button" onClick={() => fileAcceptFun(file.filename, file.id)}>Скачать</button>
                                    </div>
                                  ) : file.text != undefined ? (
                                    <div className={style.fileButtons}>
                                      <button className={style.styleButtonDownlodeCancel} type="button" onClick={() => fileCancelFun(file.id)}>Откланить</button>
                                      <button className={style.styleButtonDownlode} type="button" onClick={() => textCopyFun(file.text, file.id)}>Капировать</button>
                                    </div>
                                  ) : (
                                    <div></div>
                                  )

                                }
                            
                              </div> 

                          )) 
                        }
                      </div>
                  
                    ) : (
                      <div></div>
                    )
                  }

                </div>

              </div>

              <div className={style.getFilePopUpButtonsBlock}>

                <div className={style.getFilePopUpButtons}>
                  <button type="button" onClick={() => allFilesCancelFun()} className={style.styleButtonCancel}>Откланить всё</button>
                  <button type="button" onClick={() => filesAcceptFun()} className={style.styleButtonAccept}>Принять всё</button>
                </div>

              </div>



            </div>

          </div>  


          <div className={style.formInfo}>

            <div className={style.formIcon}>

              <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="55" width="50" height="4" rx="2" fill="#008CFF"/>
                <rect x="33" y="48" width="35" height="4" rx="2" transform="rotate(-90 33 48)" fill="#96C3FF"/>
                <rect width="14.3294" height="3.82117" rx="1.91059" transform="matrix(-0.697868 0.716226 -0.697868 -0.716226 45 38.7368)" fill="#96C3FF"/>
                <rect width="14.3294" height="3.82117" rx="1.91059" transform="matrix(-0.697868 -0.716226 0.697868 -0.716226 35 49)" fill="#96C3FF"/>
              </svg>



            </div>

            <div className={style.formTitle}>
              <h2>Получить файл</h2>
              <p>Здесь вы можете принять файлы с других устройств</p>
            </div>

          </div>


          <div className={style.formData}>
            
            <div className={style.userIdBlock}>
              <p>id Вашего устройства устройства</p>
              {
                userData == null ? (
                  <h2>Загрузка</h2>
                ) : (
                  <div className={style.userId}>

                    <h2>{userData?.shareId}</h2>

                    {
                      JSON.stringify(files) != JSON.stringify([]) ? (
                        <button type="button"  className={style.openFilePopUp} onClick={() => showPopUpFun()}>Открыть список файлов</button>
                      ) : (
                        <div></div>
                      )
                    }

                  </div>
                  
                )

              }
            </div>

          </div>


          <div className={style.navExchangeBlock}>

            <div className={style.navExchange}>

              <Link className={`${style.LinkExchange} ${style.select}`} href={'/getfile'}>Получить</Link>
              <Link className={`${style.LinkExchange}`} href={'/sendfile'}>Отправить</Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
