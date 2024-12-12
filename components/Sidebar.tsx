'use client'
import { avatarPlaceholderUrl, navItems } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
interface Props{
    fullName:string,
    avatar: string,
    email: string
}

const Sidebar = ({fullName, avatar, email}: Props) => {
    const pathname = usePathname()
    
  return (
    <aside className='sidebar'>
        <Link href="/">
        <Image src="/assets/icons/logo-full-brand.svg" alt="logo" width={160} height={50} className='hidden h-auto lg:block'/>
        <Image src="/assets/icons/logo-brand.svg" alt="logo" width={52} height={52} className='lg:hidden' />
        </Link>
    <nav className='sidevar-nav'>
    <ul className='flex flex-1 flex-col gap-6'>
        {navItems.map((item) => {
            return(
                <Link href={item.url} key={item.url} className='lg:w-full'>
                    <li className={cn("sidebar-nav-item", pathname === item.url && "shad-active")}>
                        <Image src={item.icon} alt="icon" width={24} height={24} className={cn('nav-icon',pathname === item.url  && 'nav-icon--active')}/>
                        <p className='hidden lg:block'>
                            {item.name}
                        </p>
                    </li>
                </Link>
            )
        })}
    </ul>
    </nav>
    <Image src="/assets/images/files-2.png"  alt="logo" width={506} height={418} className='w-full'/>
    <div className='sidebar-user-info'>
        <Image src={avatarPlaceholderUrl} alt="avatar" width={44} height={44} className='side-bar-avatar'/>
        <div className='hidden lg:block '>
            <p className='subtitle-2 capitalize'>
                {fullName}
            </p>
            <p className='subtitle-2 capitalize'>
                {email}
            </p>
        </div>
    </div>
    </aside>
  )
}

export default Sidebar