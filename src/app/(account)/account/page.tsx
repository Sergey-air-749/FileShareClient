import { Metadata } from 'next';
import Account from './Account';
import { cookies } from 'next/headers';

// export const metadata: Metadata = {
//   title: "Аккаунт",
//   description: "Управление Аккаунтам",
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
        title: messages['account.page.title'],
        description: messages['account.page.description'],
    };
}

function LoginPage() {
    return (
        <div>
            <Account />
        </div>
    );
}

export default LoginPage;
