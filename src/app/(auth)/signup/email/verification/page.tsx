import { Metadata } from 'next';
import SignupEmail from './SignupEmail';
import { cookies } from 'next/headers';

// export const metadata: Metadata = {
//   title: "Подтвердить почту",
//   description: "Подтвердить почту чтобы закончить регистрацию",
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
        title: messages['signupEmail.page.title'],
        description: messages['signupEmail.page.description'],
    };
}

function SignupEmailPage() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SignupEmail />
        </div>
    );
}

export default SignupEmailPage;
