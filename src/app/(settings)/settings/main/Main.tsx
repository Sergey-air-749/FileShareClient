'use client';
import { useState, ChangeEvent, useRef, FormEvent } from 'react';

import { useAppSelector } from '@/components/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import SettingsMainBlock from '../SettingsMainBlock';

export default function Main() {
    return <SettingsMainBlock />;
}
