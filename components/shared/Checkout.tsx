import { IParking } from '@/lib/database/models/parking.model'
import React from 'react'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const Checkout = ({parking, userId}:{parking:IParking, userId: string}) => {
  const router=useRouter();
  const onCheckout = async () =>{
    try{
      router.push(`/order/${parking._id}`)
    }catch(error){
      console.log(error);
    }
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
