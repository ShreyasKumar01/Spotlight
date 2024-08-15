import { IParking } from '@/lib/database/models/parking.model'

interface ParkingDetailsProps {
  parking: IParking;
}

const ParkingDetails: React.FC<ParkingDetailsProps> = ({ parking }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Parking Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Name:</p>
          <p className="font-semibold">{parking.name}</p>
        </div>
        <div>
          <p className="text-gray-600">Description:</p>
          <p className="font-semibold">{parking.description || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-600">Location:</p>
          <p className="font-semibold">{parking.location || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-600">Start Date:</p>
          <p className="font-semibold">{new Date(parking.startDateTime).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-600">End Date:</p>
          <p className="font-semibold">{new Date(parking.endDateTime).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-600">Price:</p>
          <p className="font-semibold">{parking.price || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-600">Spaces:</p>
          <p className="font-semibold">{parking.spaces || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-600">City:</p>
          <p className="font-semibold">{parking.city?.name || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-600">Posted By:</p>
          <p className="font-semibold">{`${parking.postedBy?.firstName || ""} ${parking.postedBy?.lastName || ""}`}</p>
        </div>
      </div>
    </div>
  );
};

export default ParkingDetails;
