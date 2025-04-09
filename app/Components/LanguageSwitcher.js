'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale, asPath } = router;

  const changeLanguage = (newLocale) => {
    if (locale === newLocale) return; // Prevent changing to the same language
    router.push(asPath, asPath, { locale: newLocale });
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')} className="text-sm hover:text-red-600">
        English
      </button>
      <button onClick={() => changeLanguage('hi')} className="text-sm hover:text-red-600 ml-4">
        Hindi
      </button>
    </div>
  );
};

export default LanguageSwitcher;
