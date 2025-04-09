'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Disable SSR for components that rely on `document`, `window`, etc.
const Home = dynamic(() => import('./Components/Home'), { ssr: false });
const Navigation = dynamic(() => import('./Components/Navigation'), { ssr: false });

export default function Page() {
  return (
    <main>
      <Suspense fallback={<div>Loading Navigation...</div>}>
        <Navigation />
      </Suspense>
      <Suspense fallback={<div>Loading Home...</div>}>
        <Home />
      </Suspense>
    </main>
  );
}
