'use client';
import {useEffect} from 'react';
import {track} from '@/lib/analytics';
export function AnalyticsProvider(){useEffect(()=>{void track('$pageview',{page:window.location.pathname});},[]);return null;}
