import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Search from './Search'
import { signoutUser } from '@/lib/actions/user.action'


const Header = () => {
  return (
    <header className='header'>
        Search
        <div className='header-wrapper'>
            <Search />
            <form action={async () => {
              'use server';
              await signoutUser()
            }}>
                <Button type="submit" className='sign-out-button'>
                    <Image src="/assets/icons/logout.svg" alt="logo" width={24} height={24} className='w-6'/>
                </Button>
            </form>
        </div>
    </header>
  )
}

export default Header