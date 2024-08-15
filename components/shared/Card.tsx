import { IParking } from '@/lib/database/models/parking.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'

type CardProps = {
    parking: IParking,
    hasOrderLink?: boolean,
    hidePrice?: boolean
}

const Card = ({ parking, hasOrderLink, hidePrice }: CardProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
  
    const isParkingCreator = userId === parking.postedBy._id.toString();
    return (
        <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-gray-50 shadow-md md:min-h-[438px]'>
            <Link 
                href={`/parking/${parking._id}`}
                style={{ backgroundImage: `url(${parking.imageUrl})` }}
                className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500 transition-transform duration-300 ease-in-out hover:scale-105"
            />

            {isParkingCreator && !hidePrice && (
                <div className="flex relative">
                    <div className="absolute right-12 top-4 bg-green-300 flex flex-row gap-4 rounded-xl p-1.5 shadow-sm transition-all">
                        <Link href={`/parking/${parking._id}/update`}>
                            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} className='transition-transform duration-300 ease-in-out hover:scale-110'/>
                        </Link>
                    </div>
                    <div className="absolute right-2 top-4 flex bg-red-300 flex-row gap-4 rounded-xl p-1.5 shadow-sm transition-all ">
                        <DeleteConfirmation parkingId={parking._id} />
                    </div>
                </div>
            )}

            <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
                {!hidePrice && (
                    <div className="flex gap-2">
                        <span className="p-semibold-14 w-min rounded-sm bg-blue-100 px-4 py-1 text-blue-400">
                            {`₹${parking.price}`}
                        </span>
                        <p className="p-semibold-14 w-min rounded-sm bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
                            {parking.city.name}
                        </p>
                    </div>
                )}

                <div className="text-gray-700">
                    <p className="p-medium-16 p-medium-18 flex items-center gap-1">
                        <span className='font-semibold text-gray-900'>From:</span>
                        {formatDateTime(parking.startDateTime).dateTime}
                    </p>
                    <p className="p-medium-16 p-medium-18 flex items-center gap-1">
                        <span className='font-semibold text-gray-900'>To:</span>
                        {formatDateTime(parking.endDateTime).dateTime}
                    </p>
                </div>

                <Link href={`/parking/${parking._id}`} className="flex-1">
                    <p className="text-xl font-medium text-black line-clamp-2">
                        {parking.name}
                    </p>
                </Link>

                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">posted by </span>
                        {parking.postedBy.firstName} {parking.postedBy.lastName}
                    </p>

                    {hasOrderLink && (
                        <Link href={`/order?parkingId=${parking._id}`} className="flex items-center gap-1 text-blue-700">
                            <p>Order Details</p>
                            <Image src="/assets/icons/arrow.svg" alt="search" width={10} height={10} />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card
