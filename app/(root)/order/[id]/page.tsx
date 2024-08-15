import OrderForm from "@/components/shared/OrderForm";
import ParkingDetails from "@/components/shared/ParkingDetails";
import { getParkingById } from "@/lib/actions/parking.actions";
import { auth } from "@clerk/nextjs/server";

type updateParkingProps={params:{id: string}}

const buyOrder = async ({params: {id}}:updateParkingProps) => {
  const {sessionClaims} =auth();

  const userId = sessionClaims?.userId as string;

  const parking=await getParkingById(id);

  return (
    <>
      <section className="bg-primary-50 bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center">
        Buy Ticket
        </h3>
      </section>
      <div className="wrapper my-8">
      <ParkingDetails parking={parking} />
        <OrderForm parking={parking} parkingId={parking._id} userId={userId} />
      </div>
    </>
  )
}

export default buyOrder;
