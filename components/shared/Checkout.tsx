import { IParking } from '@/lib/database/models/parking.model'
import React from 'react'
import { Button } from '../ui/button';

const Checkout = ({parking, userId}:{parking:IParking, userId: string}) => {
  const onCheckout = async () =>{
    console.log('checkout');
  }
  return (
    <div>
      <form action={onCheckout}>
        <Button type="submit" role="link" size="lg" className="button sm:w-fit">
          Buy Ticket
        </Button>
      </form>
    </div>
  )
}

export default Checkout
