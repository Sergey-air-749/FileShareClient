import { Metadata } from 'next';
import SendFileStory from './SendFileStory';
import { cookies } from 'next/headers';

// export const metadata: Metadata = {
//     title: 'История отправленых файлов',
//     description:
//         'Здесь вы можете посмотреть все файлы которые вы отправели, время, кому вы отправель и с какого устройства',
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
        title: messages['sendFileStory.page.title'],
        description: messages['sendFileStory.page.description'],
    };
}

function sendFileStoryPage() {
    return (
        <div>
            <SendFileStory />
        </div>
    );
}

export default sendFileStoryPage;
