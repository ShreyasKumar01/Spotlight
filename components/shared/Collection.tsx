import React from 'react'
import { IParking } from '@/lib/database/models/parking.model'
import Link from 'next/link'
import Card from './Card'
import Pagination from './Pagination'


type CollectionProps = {
    data: IParking[],
    emptyTitle: string, 
    emptyStateSubtext: string,
    limit: number,
    page: number|string,
    totalPages?:number,
    urlParamName?:string,
    collectionType: 'Parkings_Organized'|'My_Parkings'|'All_Parkings'
}

const Collection = ({
    data, emptyTitle, emptyStateSubtext, page, totalPages=0, collectionType,
    urlParamName 
}:CollectionProps) => {
  return (
    <>
      {data.length>0?(
        <div className='flex flex-col items-center gap-10'>
          <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
          {data.map((parking) => {
            const hasOrderLink = collectionType === 'Parkings_Organized';
            const hidePrice = collectionType === 'My_Parkings';

            return(
              <li key={parking._id} className='flex justify-center'>
                <Card parking={parking} hasOrderLink={hasOrderLink} hidePrice={hidePrice}/>
              </li>
            )
          })}
          </ul>
          {totalPages>1 && (
            <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages}/>
          )}
        </div>
      ):(
        <div className='flex-center wrapper min-h-[200px] w-full flex-col rounded-[14px] bg-grey-50 py-28 text-center'>
          <h3 className='p-bold-20 md:h5-bold'>{emptyTitle}</h3>
          <Link href="/parking/create" className='text-primary-500 p-regular-14'>{emptyStateSubtext}</Link>
        </div>
      )}
    </>
  )
}

export default Collection