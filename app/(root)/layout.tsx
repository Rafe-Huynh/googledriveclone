import React from 'react'
import Sidebar from '../components/Sidebar'
import MobileNavigation from '../components/MobileNavigation'
import Header from '../components/Header'
import { getUser } from '@/lib/actions/user.action'
import { redirect } from 'next/navigation'

const layout = async ({children} : {children: React.ReactNode}) => {
    const user = await getUser()
    if(!(user)){
        return redirect('/sign-in')
    }
  return (
    <main className='flex h-screen'>
        <Sidebar {...user}/>
        <section className='flex h-full flex-1 flex-col'>
            <MobileNavigation {...user}/>
            <Header/>
            <div className='main-content'>
                {children}
            </div>
        </section>
    </main>
  )
}

export default layout