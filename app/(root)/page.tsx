import { getFile, getTotalSpaceUsed } from '@/lib/actions/files.action'
import { convertFileSize, getUsageSummary } from '@/lib/utils'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@radix-ui/react-separator'
import FormattedDateTime from '../components/FormattedDateTime'
import { Chart } from '../components/Chart'

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFile({types:[], limit: 10}),
    getTotalSpaceUsed()
  ])
  const usageSummary = getUsageSummary(totalSpace)
  return (
    <div className='dashboard-container'>
      <section>
        <Chart used={totalSpace.used}/>
        <ul className='dashboard-summary-list'>
          {
            usageSummary.map((summary) => (
              <Link href={summary.url} key={summary.title} className='dashboard-summary-card'>
              <div className='space-y-4'>
                <div className='flex justify-between gap-3'>
                  <Image src={summary.icon} width={100} height={100} alt="upload image" className='summary-type-size'/>
                <h4 className='summary-type-size'>
                  {convertFileSize(summary.size) || 0}
                </h4>
                
                </div>
                <h5 className='summary-type-title'>
                  {summary.title}
                </h5>
                <Separator className='bg-light-400'/>
                <FormattedDateTime date={summary.latestDate} className='text-center'/>
              </div>

              </Link>
            ))
          }
        </ul>
      </section>
    </div>
  )
}

export default Dashboard