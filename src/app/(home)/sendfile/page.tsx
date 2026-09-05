import { Metadata } from 'next';
import Sendfile from './SendFile';
import { cookies } from 'next/headers';

// export const metadata: Metadata = {
//   title: "Отправить файл",
//   description: "Здесь вы можете отправить файл на другое устройства или другому пользователю",
// };

export async function generateMetadata(): Promise<Metadata> {
    const cookieStore = await cookies();
    const locale = cookieStore.get('language')?.value;
    let messages;

    if (locale == undefined) {
        messages = (await import(`@/translations/ru.json`)).default;
    } else {
        messages = (await import(`@/translations/${locale}.json`)).default;
    }

    return {
        title: messages['sendfilePage.page.title'],
        description: messages['sendfilePage.page.description'],
    };
}

function SendfilePage() {
    return (
        <div>
            <Sendfile />
        </div>
    );
}

export default SendfilePage;
