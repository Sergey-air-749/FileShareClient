'use server'
import { IntlProvider } from 'react-intl';
import ruMessages from '@/translations/ru.json';
import enMessages from '@/translations/en.json';
import { cookies } from 'next/headers';

const messages = { ru: ruMessages, en: enMessages };

export default async function IntlWrapper({ children }) {

    let locale = 'ru'
    const cookieStore = await cookies()
    

    const savedLocale = cookieStore.get('language')?.value;

    console.log(savedLocale);

    if (savedLocale != undefined) {
        
        if (savedLocale && messages[savedLocale]) {
            locale = savedLocale
        }

    }
    
    console.log(locale);
    

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            {children}
        </IntlProvider>
    );
}
