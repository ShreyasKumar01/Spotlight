"use client"

import { IParking } from '@/lib/database/models/parking.model'
import { SignedOut } from '@clerk/clerk-react'
import { SignedIn, useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Checkout from './Checkout'

const CheckoutButton = ({parking}:{parking: IParking}) => {
    const {user} = useUser();
    const userId= user?.publicMetadata.userId as string;
    const isParkingExpired= new Date(parking.endDateTime) < new Date()
    return (
    <div className='flex items-center gap-3'>
        {isParkingExpired ? (
            <p>Sorry, the end time for the parking has been achieved</p>
        ):(
            <>
            <SignedOut>
                <Button className="button rounded-sm" size="lg">
                    <Link href="/sign-in">
                        Buy Ticket
                    </Link>
                </Button>
            </SignedOut>

            <SignedIn>
                <Checkout parking={parking} userId={userId}/>
            </SignedIn>
            </>
        )}
    </div>
  )
}

export default CheckoutButton
