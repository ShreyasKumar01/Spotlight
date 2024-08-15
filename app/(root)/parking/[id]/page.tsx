import CheckoutButton from '@/components/shared/CheckoutButton';
import Collection from '@/components/shared/Collection';
import DynamicMap from '@/components/shared/DynamicMap';
import Mapu from '@/components/shared/Mapu';
import { getParkingById, getRelatedParkingsByCity } from '@/lib/actions/parking.actions'
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import React from 'react'

const ParkingDetails = async ({params:{id}, searchParams}: SearchParamProps) => {
  const parking = await getParkingById(id);

  const parkingInCity= await getRelatedParkingsByCity({
    cityId:parking.city._id,
    parkingId: parking._id,
    page: searchParams.page as string,
  });

  return (
    <>
    <section className='flex justify-center bg-primary-50 bg-contain'>
      <div className="grid grid-cold-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image src={parking.imageUrl} alt='parking image' width={1000} height={1000} className='h-full min-h-[300px] object-cover object-center'/>
        <div className='flex w-full flex-col gap-8 p-5 md:p-10'>
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold">
              {parking.name}
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items center">
              <div className="flex gap-3">
                <p className='p-bold-20 bg-blue-400/20 px-5 py-2 rounded-sm' style={{color:'#001e70'}}>
                {`₹${parking.price}`}
                </p>
                <p className='p-bold-16 bg-grey-500/10 px-4 py-2.5 text-gray-700 rounded-sm'>
                {parking.city.name}
                </p>
              </div>
              {/* <p className='p-medium-18 ml-2 mt-2 sm:mt-0 '>
                posted by{' '}
                <span>{parking.postedBy.firstName} {parking.postedBy.lastName}</span>
              </p> */}
            </div>
          </div>
          {/* {checkout button} */}
          <CheckoutButton parking={parking}/>
          <div className="flex flex-col gap-5">
            <div className='flex gap-2 md:gap-3'>
              <Image src="/assets/icons/calendar.svg" alt="calendar" width={32} height={32} />
              <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                <p className='mr-4'>
                  {formatDateTime(parking.startDateTime).dateOnly} - {' '}
                  {formatDateTime(parking.startDateTime).timeOnly}
                </p>
                <p>
                  {formatDateTime(parking.endDateTime).dateOnly} -  {' '}
                  {formatDateTime(parking.endDateTime).timeOnly}
                </p>
              </div>
            </div>

            <div className="p-regular-20 flex items-center gap-3">
              <Image src="/assets/icons/location.svg" alt="location" width={32} height={32} />
              <p className="p-medium-16 lg:p-regular-20">{parking.location}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">What You'll Learn:</p>
            <p className="p-medium-16 lg:p-regular-18">{parking.description}</p>
            <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{parking.url}</p>
          </div>
          <p className='p-medium-18 ml-2 mt-2 sm:mt-0 '>
                posted by{' '}
                <span style={{color:'#001e70'}}>{parking.postedBy.firstName} {parking.postedBy.lastName}</span>
              </p>
        </div> 
      </div>
    </section>
    {/* Map section here  */}
    <section className='wrapper flex flex-col my-8 gap-8 md:gap-12'>
    <h2 className="h2-bold flex justify-center">
        Location in Map
      </h2>
      <DynamicMap address={parking.location}/>
    </section>
    <section className='wrapper flex flex-col my-8 gap-8 md:gap-12'>
      <h2 className="h2-bold flex justify-center">
        More Parkings in {parking.city.name}
      </h2>
      <Collection
        data={parkingInCity?.data}
        emptyTitle="No Parkings created yet.."
        emptyStateSubtext="Create a Parking"
        collectionType="All_Parkings"
        limit={3}
        page={searchParams.page as string}
        totalPages={parkingInCity?.totalPages}
        />
    </section>
    </>
  )
}

export default ParkingDetails
