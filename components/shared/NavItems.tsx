"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItems = () => {
  const pathname=usePathname();

  return ( 
    <ul className='md:flex-between flex w-full flex-col items-start gap-8 md:flex-row '>
        <li>
            <Link href="/" className='flex-center p-medium-16 whitespace-nowrap' style={pathname === '/' ? { color: '#001e70' } : {color: 'black'}}>Home</Link>
        </li>
        <li>
            <Link href="/about" className='flex-center p-medium-16 whitespace-nowrap' style={pathname === '/about' ? { color: '#001e70' } : {color: 'black'}}>About us</Link>
        </li>
        <li>
            <Link href="/parking/create" className='flex-center p-medium-16 whitespace-nowrap' style={pathname === '/parking/create' ? { color: '#001e70' } : {color: 'black'}}>Upload parking</Link>
        </li>
        <li>
            <Link href="/usermenu" className='flex-center p-medium-16 whitespace-nowrap' style={pathname === '/usermenu' ? { color: '#001e70' } : {color: 'black'}}>User menu</Link>
        </li>
    </ul>
  )
}

export default NavItems
