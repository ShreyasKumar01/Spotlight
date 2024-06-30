"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItems = () => {
  const pathname=usePathname();

  return ( 
    <ul className='md:flex-between flex w-full flex-col items-start gap-8 md:flex-row '>
        <li>
            <Link href="/" className={`${(pathname==='/') && 'underline'} flex-center p-medium-16 whitespace-nowrap`}>Home</Link>
        </li>
        <li>
            <Link href="/parking/create" className={`${(pathname==='/parking/create') && 'underline'} flex-center p-medium-16 whitespace-nowrap`}>Create Parking</Link>
        </li>
        <li>
            <Link href="/profile" className={`${(pathname==='/profile') && 'underline'} flex-center p-medium-16 whitespace-nowrap`}>Profile</Link>
        </li>
    </ul>
  )
}

export default NavItems
