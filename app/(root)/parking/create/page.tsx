import ParkingForm from "@/components/shared/ParkingForm";
import { auth } from "@clerk/nextjs/server";

const CreateParking = () => {
  const {sessionClaims} =auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-primary-50 bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center">
        Upload Parking
        </h3>
      </section>
      <div className="wrapper my-8">
        <ParkingForm userId={userId} type="Create"/>
      </div>
    </>
  )
}

export default CreateParking;
