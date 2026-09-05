import { Metadata } from 'next';
import GetFile from './GetFile';
import { cookies } from 'next/headers';

// export const metadata: Metadata = {
//     title: 'Получить файл',
//     description: 'Здесь вы можете получить отправленые вам файлы',
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
        title: messages['getfilePage.page.title'],
        description: messages['getfilePage.page.description'],
    };
}

function GetfilePage() {
    return (
        <div>
            <GetFile />
        </div>
    );
}

export default GetfilePage;
