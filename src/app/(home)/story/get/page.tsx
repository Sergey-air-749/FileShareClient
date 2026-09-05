import { Metadata } from 'next';
import GetFileStory from './GetFileStory';
import { cookies } from 'next/headers';

// export const metadata: Metadata = {
//     title: 'История принятых файлов',
//     description: 'Здесь вы можете посмотреть все файлы которые скачали, время, от кого и с какого устройства',
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
        title: messages['getFileStory.page.title'],
        description: messages['getFileStory.page.description'],
    };
}

function getFileStoryPage() {
    return (
        <div>
            <GetFileStory />
        </div>
    );
}

export default getFileStoryPage;
