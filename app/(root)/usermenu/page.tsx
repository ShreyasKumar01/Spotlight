import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { getParkingsByUser } from '@/lib/actions/parking.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const page = async ({ searchParams }: SearchParamProps) => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;

    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const parkingsPage = Number(searchParams?.parkingsPage) || 1;
  
    const orders = await getOrdersByUser({ userId, page: ordersPage})
  
    const orderedParkings = orders?.data.map((order: IOrder) => order.parking) || [];

    const uploadedParkings = await getParkingsByUser({userId, page:1});
  return (
    <>
      <section className="bg-primary-50 bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center text-center">
            <h3 className="h3-bold text-center">
                My tickets
            </h3>
            {/* <Button asChild className='button hidden sm:flex rounded-sm'>
                <Link href="/#parkings">
                    Find Parkings
                </Link>
            </Button> */}
        </div>
      </section>
      <section className='wrapper my-8'>
      <Collection
        data={orderedParkings}
        emptyTitle="No tickets purchased by you.."
        emptyStateSubtext=""
        collectionType="My_Parkings"
        limit={6}
        page={ordersPage}
        urlParamName="ordersPage"
        totalPages={2}
        />
      </section>

      <section className="bg-primary-50 bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center text-center">
            <h3 className="h3-bold flex text-center">
                Uploaded Parkings
            </h3>
            {/* <Button asChild className='button hidden sm:flex rounded-sm'>
                <Link href="/parking/create">
                    Upload Parking
                </Link>
            </Button> */}
        </div>
      </section>      
      <section className='wrapper my-8'>
      <Collection
        data={uploadedParkings?.data}
        emptyTitle="No parkings uploaded by you"
        emptyStateSubtext="Upload a Parking"
        collectionType="Parkings_Organized"
        limit={6}
        page={parkingsPage}
        urlParamName="parkingsPage"
        totalPages={uploadedParkings?.totalPages}
        />
      </section>
    </>
  )
}

export default page
