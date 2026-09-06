'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {track} from '@/lib/analytics';
export function AnalyticsProvider(){const path=usePathname();useEffect(()=>{void track('$pageview',{page:path});},[path]);return null;}
