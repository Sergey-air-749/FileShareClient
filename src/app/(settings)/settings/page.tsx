import { Metadata } from 'next';
import Settings from '@/app/(settings)/settings/Settings';
import { cookies } from 'next/headers';

// export const metadata: Metadata = {
//     title: 'Настройки',
//     description: 'Настройки сайта',
// };

export async function generateMetadata(): Promise<Metadata> {
    const cookieStore = await cookies();
    const locale = cookieStore.get('language')?.value;
    let messages;

    if (locale != undefined) {
        messages = (await import(`@/translations/${locale}.json`)).default;
    } else {
        messages = (await import(`@/translations/ru.json`)).default;
    }

    return {
        title: messages['settings.page.title'],
        description: messages['settings.page.description'],
    };
}

function SettingsPage() {
    return (
        <div>
            <Settings />
        </div>
    );
}

export default SettingsPage;
