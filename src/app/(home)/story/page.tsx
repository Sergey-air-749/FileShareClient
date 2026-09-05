import { Metadata } from 'next';
import Story from './Story';
import { cookies } from 'next/headers';

// export const metadata: Metadata = {
//   title: "История файл",
//   description: "История отправленых и полученых файлов",
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
        title: messages['storyPage.page.title'],
        description: messages['storyPage.page.description'],
    };
}

function StoryPage() {
    return (
        <div>
            <Story />
        </div>
    );
}

export default StoryPage;
