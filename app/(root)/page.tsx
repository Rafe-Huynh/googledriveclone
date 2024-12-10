import { getFile, getTotalSpaceUsed } from '@/lib/actions/files.action'
import { convertFileSize, getUsageSummary } from '@/lib/utils'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@radix-ui/react-separator'
import FormattedDateTime from '../components/FormattedDateTime'
import { Chart } from '../components/Chart'
import { Models } from 'node-appwrite'
import Thumbnail from '../components/Thumbnail'
import ActionDropdown from '../components/ActionDropdown'

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
                
              </div>

              </Link>
            ))
          }
        </ul>
      </section>
      <section className="dashboard-recent-files">
        <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
        {files.documents.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-5">
            {files.documents.map((file: Models.Document) => (
              <Link
                href={file.url}
                target="_blank"
                className="flex items-center gap-3"
                key={file.$id}
              >
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                />

                <div className="recent-file-details">
                  <div className="flex flex-col gap-1">
                    <p className="recent-file-name">{file.name}</p>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="caption"
                    />
                  </div>
                  <ActionDropdown file={file} />
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="empty-list">No files uploaded</p>
        )}
      </section>
    </div>
  )
}

export default Dashboard