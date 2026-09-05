import { Metadata } from 'next';
import ResetPassword from './ResetPassword';
import { cookies } from 'next/headers';

// export const metadata: Metadata = {
//     title: 'Сбросить пароль',
//     description: 'Сбросить пароль то аккаунта',
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
        title: messages['resetPassword.page.title'],
        description: messages['resetPassword.page.description'],
    };
}

function ResetPasswordPage() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ResetPassword />
        </div>
    );
}

export default ResetPasswordPage;
