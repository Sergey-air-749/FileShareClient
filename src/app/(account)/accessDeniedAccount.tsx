import styleAccountAccessDenied from '@/style/access.denied.account.module.css';
import Link from 'next/link';
import { useIntl } from 'react-intl';

function AccountAccessDeniedPage() {
    const intl = useIntl();

    const metaDescription = document.querySelector('meta[name="description"]');
    const metaTitle = document.querySelector('title');

    if (metaTitle) {
        metaTitle.textContent = intl.formatMessage({ id: 'AccountAccessDeniedPage.page.title' });
    }

    if (metaDescription) {
        metaDescription.setAttribute('content', intl.formatMessage({ id: 'AccountAccessDeniedPage.page.description' }));
    }

    return (
        <div className={styleAccountAccessDenied.accountSettingAccessdDnied}>
            <form className={styleAccountAccessDenied.accountSettingAccessdDniedForm}>
                <div className={styleAccountAccessDenied.content}>
                    <main>
                        <div className={styleAccountAccessDenied.accountSettingAccessdDniedMainHead}>
                            <div className={styleAccountAccessDenied.formIcon}>
                                <svg
                                    width="70"
                                    height="70"
                                    viewBox="0 0 70 70"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M54 49.5C54 54.1944 45.4934 58 35 58C24.5066 58 16 54.1944 16 49.5C16 47.0553 18.3069 44.8517 22 43.301C25.3986 41.874 29.9712 41 35 41C45.4934 41 54 44.8056 54 49.5Z"
                                        fill="#96C3FF"
                                    />
                                    <circle cx="35" cy="30" r="8" fill="#96C3FF" />
                                    <circle cx="35" cy="35" r="23.5" stroke="#008CFF" strokeWidth="3" />
                                    <circle cx="25" cy="53" r="8" fill="white" stroke="white" strokeWidth="2" />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M22.643 57.4462C23.0208 57.0685 23.6667 57.3361 23.6667 57.8703C23.6667 58.6067 24.2636 59.2036 25 59.2036C25.7364 59.2036 26.3333 58.6067 26.3333 57.8703C26.3333 57.336 26.9793 57.0685 27.357 57.4463C27.8777 57.967 28.7219 57.967 29.2426 57.4463C29.7633 56.9256 29.7633 56.0813 29.2426 55.5606C28.8649 55.1829 29.1324 54.5369 29.6667 54.5369C30.403 54.5369 31 53.94 31 53.2036C31 52.4672 30.403 51.8703 29.6667 51.8703C29.1324 51.8703 28.8649 51.2243 29.2427 50.8466C29.7634 50.3259 29.7634 49.4816 29.2427 48.9609C28.722 48.4402 27.8778 48.4402 27.3571 48.9609C26.9793 49.3387 26.3333 49.0712 26.3333 48.5369C26.3333 47.8006 25.7364 47.2036 25 47.2036C24.2636 47.2036 23.6667 47.8006 23.6667 48.5369C23.6667 49.0712 23.0207 49.3387 22.643 48.961C22.1223 48.4403 21.2781 48.4403 20.7574 48.961C20.2367 49.4817 20.2367 50.3259 20.7574 50.8466C21.1351 51.2244 20.8676 51.8703 20.3333 51.8703C19.597 51.8703 19 52.4672 19 53.2036C19 53.94 19.597 54.5369 20.3333 54.5369C20.8676 54.5369 21.1351 55.1828 20.7574 55.5606C20.2367 56.0813 20.2367 56.9255 20.7574 57.4462C21.2781 57.9669 22.1223 57.9669 22.643 57.4462Z"
                                        fill="#008CFF"
                                    />
                                    <circle cx="25" cy="53.2036" r="2" fill="white" stroke="white" />
                                    <circle cx="45" cy="53" r="8" fill="white" stroke="white" strokeWidth="2" />
                                    <rect
                                        x="40.7578"
                                        y="47.3433"
                                        width="14"
                                        height="2"
                                        rx="1"
                                        transform="rotate(45 40.7578 47.3433)"
                                        fill="#FF1E00"
                                    />
                                    <rect
                                        x="39.3428"
                                        y="57.2427"
                                        width="14"
                                        height="2"
                                        rx="1"
                                        transform="rotate(-45 39.3428 57.2427)"
                                        fill="#FF0000"
                                    />
                                </svg>
                            </div>

                            <div className={styleAccountAccessDenied.formTitle}>
                                <h2>{intl.formatMessage({ id: 'accountAccessDeniedPage.page.title' })}</h2>
                            </div>
                        </div>

                        <div className={styleAccountAccessDenied.accountSettingAccessdDniedInfo}>
                            <p>{intl.formatMessage({ id: 'accountAccessDeniedPage.page.description' })}</p>
                        </div>

                        <div className={styleAccountAccessDenied.accountSettingAccessdDniedButtons}>
                            <Link href="/" className={styleAccountAccessDenied.styleButtonBackHome}>
                                {intl.formatMessage({ id: 'accountAccessDeniedPage.page.link' })}
                            </Link>
                        </div>
                    </main>
                </div>
            </form>
        </div>
    );
}

export default AccountAccessDeniedPage;
