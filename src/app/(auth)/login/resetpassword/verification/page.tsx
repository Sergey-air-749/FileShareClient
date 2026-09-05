import { Metadata } from 'next';
import ResetPasswordVerification from './ResetPasswordVerification';
import { cookies } from 'next/headers';

// export const metadata: Metadata = {
//   title: "Введите новый пароль",
//   description: "Введите новый пароль для аккаунта",
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
        title: messages['resetPasswordVerification.page.title'],
        description: messages['resetPasswordVerification.page.description'],
    };
}

function ResetPasswordVerificationPage() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ResetPasswordVerification />
        </div>
    );
}

export default ResetPasswordVerificationPage;
