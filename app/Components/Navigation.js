'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="relative px-4 py-4 md:px-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[5em]">
            <Image
              src="/logo.webp"
              alt="India post logo"
              width={100}
              height={80}
              objectFit="cover"
            />
          </div>
          <span className="text-lg font-semibold">India Post</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/Awarenes" className="text-sm hover:text-red-600">
            Awareness
          </Link>
          <Link href="/Pincode" className="text-sm hover:text-red-600">
            Pincode
          </Link>
          <Link href="/Postoffice" className="text-sm hover:text-red-600">
            Post Office
          </Link>
          <Link href="/Tracking" className="text-sm hover:text-red-600">
            Tracking
          </Link>
          <Link href="/Calcpostage" className="text-sm hover:text-red-600">
            Postage
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="md:hidden" onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md md:hidden">
          <div className="flex flex-col items-start p-4 space-y-4">
            <Link href="/Awarenes" className="text-sm hover:text-red-600">
              Awareness
            </Link>
            <Link href="/Pincode" className="text-sm hover:text-red-600">
              Pincode
            </Link>
            <Link href="/Postoffice" className="text-sm hover:text-red-600">
              Post Office
            </Link>
            <Link href="/Tracking" className="text-sm hover:text-red-600">
              Tracking
            </Link>
            <Link href="/Calcpostage" className="text-sm hover:text-red-600">
              Postage
            </Link>
            <button className="text-sm hover:text-red-600 flex items-center" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Search
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation

