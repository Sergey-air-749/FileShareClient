import { Metadata } from 'next';
import DeleteAccountSuccessfully from './DeleteAccountSuccessfully';
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
        title: messages['deleteAccountSuccessfully.page.title'],
    };
}

function DeleteAccountSuccessfullyPage() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <DeleteAccountSuccessfully />
        </div>
    );
}

export default DeleteAccountSuccessfullyPage;
