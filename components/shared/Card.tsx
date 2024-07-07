import { IParking } from '@/lib/database/models/parking.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {DeleteConfirmation} from './DeleteConfirmation'

type CardProps ={
    parking: IParking,
    hasOrderLink?:boolean,
    hidePrice?:boolean
}

const Card = ({parking, hasOrderLink, hidePrice}: CardProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
  
    const isParkingCreator = userId === parking.postedBy._id.toString();
  return (
    <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]'>
      <Link 
        href={`/parking/${parking._id}`}
        style={{backgroundImage: `url(${parking.imageUrl})`}}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

      {isParkingCreator && !hidePrice && (
          <div className="flex relative">
          <div className="absolute right-12 top-4 bg-green-300 flex flex-row gap-4 rounded-xl p-1.5 shadow-sm transition-all">
            <Link href={`/parking/${parking._id}/update`}>
            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
            </Link>
          </div>
          <div className="absolute right-2 top-4 flex bg-red-300 flex-row gap-4 rounded-xl p-1.5 shadow-sm transition-all">
            <DeleteConfirmation parkingId={parking._id} />
          </div>
          </div>
      )}

      <div
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      > 
       {!hidePrice && <div className="flex gap-2">
          <span className="p-semibold-14 w-min rounded-sm bg-blue-100 px-4 py-1 text-blue-400">
            {`₹${parking.price}`}
          </span>
          <p className="p-semibold-14 w-min rounded-sm bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
            {parking.city.name}
          </p>
        </div>}

        <p className="p-medium-16 p-medium-18 text-grey-600">
        <span className='text-gray-800'>From: </span>
          {formatDateTime(parking.startDateTime).dateTime}
        </p>

        <p className="p-medium-16 p-medium-18 text-grey-600">
            <span className='text-gray-800'>To: </span>
          {formatDateTime(parking.endDateTime).dateTime}
        </p>

        <Link href={`/parking/${parking._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{parking.name}</p>
        </Link>
        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16" style={{color:'#001e70'}}>
            <span className="p-medium-14 md:p-medium-16 text-grey-600">posted by </span>{parking.postedBy.firstName} {parking.postedBy.lastName}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?parkingId=${parking._id}`} className="flex gap-2">
              <p style={{color:'#001e70'}}>Order Details</p>
              <Image src="/assets/icons/arrow.svg" alt="search" width={10} height={10} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
