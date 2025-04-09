'use client';

import {useTranslations} from 'next-intl';
import GoogleMap from './GoogleMap'
import { useState } from 'react'; 
import { Player } from '@lottiefiles/react-lottie-player';
import { useRouter } from 'next/navigation';  
import Link from 'next/link';


export default function Home() {
  const t = useTranslations('home');
  const [postId, setPostId] = useState(''); 
  const router = useRouter();

  const handleSubmit = () => {
    if (!postId.trim()) {
      alert('Please enter a valid post ID.');
      return;
    } 
    router.push(`/Tracking?page=${postId}`);
  };

  return (
      <main className=" px-4 sm:px-8 py-8 sm:py-4 ">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-1 ml-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <span className="text-sm">{t('subtitle')}</span>
          </div>
          <div className='flex'>
            <h1 className="text-5xl md:text-[8vw] font-regular flex leading-0 ">
              {t('title1')} 
              <span>
                <Player
                  autoplay
                  loop
                  src="/animation.json"
                  style={{ height: '8vmax', width: '10vmax' }}
                />
              </span>
              {t('title2')}
            </h1>
          </div>
        </div>
        <div className="w-full md:w-2/5 ">
          <h2 className="text-xl font-semibold mb-4">{t('trackPost')}</h2>
          <input
            type="text"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            placeholder={t('postIdPlaceholder')}
            className="border w-[30vmax] md:w-[24vw] mb-3 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black/50"
          />
          <button
            onClick={handleSubmit}
            className="px-3 py-2 bg-red-800 text-white rounded-lg ml-3"
          >
            {t('submit')}
          </button>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2 mt-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-red-700 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-red-900 border-2 border-white"></div>
            </div>
            <span className="text-md font-normal mt-3">
              {t('trustText')}
            </span>
          </div>
        </div>
      </div>  
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 ">
        <div className="md:col-span-3 order-2 md:order-1">
          <h2 className="text-xl font-medium mb-4">{t('postalService.title')}</h2>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-red-900 rounded-full" />
            <div className="w-8 h-8 bg-red-700 rounded-full" />
            <div className="w-8 h-8 bg-yellow-500 rounded-full" />
          </div>
          <p className="text-md text-gray-600 mb-6">
            {t('postalService.description')}
          </p>
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">{t('pincode.title')}</h2>
            <div className="flex justify-between items-center mb-6">
              <Link href={"Pincode"} className='px-6 py-2 bg-yellow-500 rounded-lg font-medium text-white'>
                {t('pincode.button')}
              </Link>
            </div>
            <p className="text-sm text-gray-600">
              {t('pincode.description')}
            </p>
          </div>
        </div>
        <div className="md:col-span-6 order-1 md:order-2">
          <div className="aspect-[3/2] overflow-hidden rounded-lg">
            <GoogleMap />
          </div>
        </div>
        <div className="md:col-span-3 order-3 flex flex-col gap-8">
          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-medium mb-4">{t('postage.title')}</h2>
            <div className="flex justify-between items-center mb-6">
              <Link href={"Calcpostage"} className='px-6 py-2 bg-yellow-500 rounded-lg font-medium text-white'>
                {t('postage.button')}
              </Link>
            </div>
            <p className="text-sm text-gray-600">
              {t('postage.description')}
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">{t('postOffice.title')}</h2>
            <div className="flex justify-between items-center mb-6">
              <Link href={"Postoffice"} className='px-6 py-2 bg-yellow-500 rounded-lg font-medium text-white'>
                {t('postOffice.button')}
              </Link>
            </div>
            <p className="text-sm text-gray-600">
              {t('postOffice.description')}
            </p>
          </div>
        </div>
      </div>  
      </main>
  )
}