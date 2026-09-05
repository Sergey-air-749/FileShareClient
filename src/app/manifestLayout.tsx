import { cookies } from 'next/headers';

export default async function ManifestLayout() {
    const cookiesStore = await cookies();

    let lang = cookiesStore.get('language')?.value;

    if (lang == undefined) {
        lang = 'ru';
    }

    // eslint-disable-next-line prefer-const
    let manifest = `/manifest${lang.toLocaleUpperCase()}.json`;

    return <link rel="manifest" href={manifest} />;
}
