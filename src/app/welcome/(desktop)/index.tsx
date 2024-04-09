'use client';

import { memo } from 'react';

import ClientResponsiveContent from '@/components/client/ClientResponsiveContent';

import Showcase from './features/Showcase';

const Desktop = memo(() => (
  <>
    <Showcase />
  </>
));

export default ClientResponsiveContent({ Desktop, Mobile: () => import('../(mobile)') });
