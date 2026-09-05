import { Metadata } from 'next';
import WhatYouWantToСhoose from './WhatYouWantToСhoose';
import { cookies } from 'next/headers';

// export const metadata: Metadata = {
//   title: "Что вы хотите выбрать чтобы закончить регистрацию?",
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
        title: messages['whatyouwanttochoose.page.title'],
    };
}

function WhatYouWantToСhoosePage() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <WhatYouWantToСhoose />
        </div>
    );
}

export default WhatYouWantToСhoosePage;
