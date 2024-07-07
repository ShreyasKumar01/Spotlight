import ParkingForm from "@/components/shared/ParkingForm";
import { getParkingById } from "@/lib/actions/parking.actions";
import { auth } from "@clerk/nextjs/server";

type updateParkingProps={params:{id: string}}

const UpdateParking = async ({params: {id}}:updateParkingProps) => {
  const {sessionClaims} =auth();

  const userId = sessionClaims?.userId as string;

  const parking=await getParkingById(id);

  return (
    <>
      <section className="bg-primary-50 bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center">
        Update Parking
        </h3>
      </section>
      <div className="wrapper my-8">
        <ParkingForm 
        parking={parking} 
        parkingId={parking._id} 
        userId={userId} 
        type="Update"/>
      </div>
    </>
  )
}

export default UpdateParking;
