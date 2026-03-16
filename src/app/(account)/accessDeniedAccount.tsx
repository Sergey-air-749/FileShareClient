import styleAccountAccessDenied from "@/style/access.denied.account.module.css";
import Link from "next/link";

function AccountAccessDeniedPage() {

  return (
    <div className={styleAccountAccessDenied.accountSettingAccessdDnied}>
            
            <form className={styleAccountAccessDenied.accountSettingAccessdDniedForm}>

                <div className={styleAccountAccessDenied.content}>

                    <main>

                        <div className={styleAccountAccessDenied.accountSettingAccessdDniedMainHead}>

                            <div className={styleAccountAccessDenied.formIcon}>

                              <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M54 49.5C54 54.1944 45.4934 58 35 58C24.5066 58 16 54.1944 16 49.5C16 47.0553 18.3069 44.8517 22 43.301C25.3986 41.874 29.9712 41 35 41C45.4934 41 54 44.8056 54 49.5Z" fill="#96C3FF"/>
                                <circle cx="35" cy="30" r="8" fill="#96C3FF"/>
                                <circle cx="35" cy="35" r="23.5" stroke="#008CFF" strokeWidth="3"/>
                                <circle cx="54" cy="52.7964" r="8" fill="white" stroke="white" strokeWidth="2"/>
                                <circle cx="35" cy="52.7964" r="8" fill="white" stroke="white" strokeWidth="2"/>
                                <circle cx="35" cy="52.7964" r="8" fill="white" stroke="white" strokeWidth="2"/>
                                <rect x="48.7227" y="56.3145" width="12.4396" height="2.48792" rx="1.24396" transform="rotate(-45 48.7227 56.3145)" fill="#008CFF"/>
                                <rect x="57.5186" y="58.0737" width="12.4396" height="2.48792" rx="1.24396" transform="rotate(-135 57.5186 58.0737)" fill="#008CFF"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M32.643 57.2426C33.0208 56.8648 33.6667 57.1324 33.6667 57.6667C33.6667 58.403 34.2636 59 35 59C35.7364 59 36.3333 58.403 36.3333 57.6667C36.3333 57.1324 36.9793 56.8649 37.357 57.2426C37.8777 57.7633 38.7219 57.7633 39.2426 57.2426C39.7633 56.7219 39.7633 55.8777 39.2426 55.357C38.8649 54.9793 39.1324 54.3333 39.6667 54.3333C40.403 54.3333 41 53.7364 41 53C41 52.2636 40.403 51.6667 39.6667 51.6667C39.1324 51.6667 38.8649 51.0207 39.2427 50.6429C39.7634 50.1222 39.7634 49.278 39.2427 48.7573C38.722 48.2366 37.8778 48.2366 37.3571 48.7573C36.9793 49.1351 36.3333 48.8676 36.3333 48.3333C36.3333 47.597 35.7364 47 35 47C34.2636 47 33.6667 47.597 33.6667 48.3333C33.6667 48.8676 33.0207 49.1351 32.643 48.7574C32.1223 48.2367 31.2781 48.2367 30.7574 48.7574C30.2367 49.2781 30.2367 50.1223 30.7574 50.643C31.1351 51.0207 30.8676 51.6667 30.3333 51.6667C29.597 51.6667 29 52.2636 29 53C29 53.7364 29.597 54.3333 30.3333 54.3333C30.8676 54.3333 31.1351 54.9792 30.7574 55.357C30.2367 55.8777 30.2367 56.7219 30.7574 57.2426C31.2781 57.7633 32.1223 57.7633 32.643 57.2426Z" fill="#008CFF"/>
                                <circle cx="35" cy="53" r="2" fill="white" stroke="white"/>
                              </svg>

                            </div>

                            <div className={styleAccountAccessDenied.formTitle}>
                              <h2>Доступ закрыт</h2>
                            </div>

                        </div>


                        <div className={styleAccountAccessDenied.accountSettingAccessdDniedInfo}>

                          <p>
                            Настройки аккаунта недоступны в гостевом режимеы
                          </p>
                        
                        </div>

                        <div className={styleAccountAccessDenied.accountSettingAccessdDniedButtons}>

                          <Link href="/" className={styleAccountAccessDenied.styleButtonBackHome}>Вернуться на главную</Link>
                        
                        </div>

                    </main>
                </div>

            </form>


          </div>
  );
}

export default AccountAccessDeniedPage