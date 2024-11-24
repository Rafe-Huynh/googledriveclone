import Card from '@/app/components/Card'
import Sort from '@/app/components/Sort'
import { getFile } from '@/lib/actions/files.action'
import { getFileTypesParams } from '@/lib/utils'
import { Models } from 'node-appwrite'
import React from 'react'

 
const Page = async ({searchParams, params} : SearchParamProps) => {
    const type = (await params)?.type as string || ' '
    const searchText = ((await params)?.query as string) || ""
    const sort = ((await params)?.sort as string) || ""
    const types = getFileTypesParams(type) as FileType[]
    const files = await getFile({types, searchText, sort})
  return (
    <div className='page-container'>
      <section className="w-full">
        <h1 className='h1 capitalize'>
          {type}
        </h1>
        <div className='total-size-section'>
        <p className='body-1'>
        Total: <span className='body-1'>
        0 MB
        </span>
        </p>
        <div className='sort-container'>
          <p className='body-1 hidden sm:block text-light-200 '>
          Sort by:
          </p>
          <Sort />
        </div>
        </div>
      </section>
      {files.total > 0 ? (
        <section className='file-list'>
            {files.documents.map((file: Models.Document) => (
              <Card file={file} key={file.$id}/>
            ))}
            
        </section>
          
      ): <p className='empty-list'>No File uploaded </p>}
    </div>
  )
}

export default Page