import { Metadata } from 'next';
import Recovering from './Recovering';
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
        title: messages['recovering.account.page.title'],
        description: messages['recovering.account.page.description'],
    };
}

function RecoveringPage() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Recovering />
        </div>
    );
}

export default RecoveringPage;
