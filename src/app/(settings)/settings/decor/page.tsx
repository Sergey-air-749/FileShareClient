import { Metadata } from 'next';
import Decor from './Decor';
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
        title: messages['decor.page.title'],
        description: messages['decor.page.description'],
    };
}

function SettingsPage() {
    return (
        <div>
            <Decor />
        </div>
    );
}

export default SettingsPage;
