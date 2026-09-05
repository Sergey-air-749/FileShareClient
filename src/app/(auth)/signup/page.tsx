import { Metadata } from 'next';
import Signup from './Signup';
import { cookies } from 'next/headers';

// export const metadata: Metadata = {
//   title: "Регистрация",
//   description: "Регистрация новый аккаунт или продолжить как гость",
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
        title: messages['signup.page.title'],
    };
}

function SignupPage() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Signup />
        </div>
    );
}

export default SignupPage;
