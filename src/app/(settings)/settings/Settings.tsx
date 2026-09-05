'use client';

import style from '@/style/settings.module.css';

import SettingsNav from '@/app/(settings)/settings/SettingsNav';
import SettingsMainBlock from './SettingsMainBlock';

export default function Settings() {
    return (
        <div className={style.settings}>
            <div className={style.settingsBlock}>
                <SettingsMainBlock />
            </div>

            <div className={style.settingsNavMobileBlock}>
                <SettingsNav />
            </div>
        </div>
    );
}
