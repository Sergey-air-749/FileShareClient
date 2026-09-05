import { Metadata } from 'next';
import Main from './Main';
import { cookies } from 'next/headers';

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
        title: messages['settings.page.title'],
        description: messages['settings.page.description'],
    };
}

function SettingsPage() {
    return (
        <div>
            <Main />
        </div>
    );
}

export default SettingsPage;
