import React from 'react'
import Image from 'next/image'
import logo from "./logo.webp";
import Link from 'next/link';
const Navigation = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-4 md:px-7">
        <div className="flex items-center gap-2">
          <div className="w-[5em] ">
            <Image src={logo}
            alt="India post logo"
            objectFit="cover"
            />
          </div>
          <span className="text-lg font-semibold">India Post</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/Pincode" className="text-sm hover:text-red-600">
              Pincode
          </Link>
          <Link href="/Postoffice" className="text-sm hover:text-red-600">
              Post Office
          </Link>
          <Link href="/Tracking" className="text-sm hover:text-red-600">
              Tracking
          </Link>
          <Link href="/Pincode" className="text-sm hover:text-red-600">
              Postage
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </div>
      </nav>
  )
}

export default Navigation