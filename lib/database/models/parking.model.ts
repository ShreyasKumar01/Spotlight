import { Schema, model, models, Document } from 'mongoose';

const ReviewSchema = new Schema({
  _id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  review: { type: String, required: true }
});

export interface IParking extends Document {
  _id: string;
  name: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price?: string;
  spaces?: string;
  city: {_id: string, name:string};
  postedBy: {_id: string, firstName: string, lastName: string};
  reviews?: Array<{
    _id?: string; 
    firstName: string;
    lastName: string;
    review: string;
  }>;
}

const ParkingSchema = new Schema<IParking>({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  price: { type: String },
  spaces: { type: String },
  city: { type: Schema.Types.ObjectId, ref: 'City' },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  reviews:[ReviewSchema]
});

const Parking = models.Parking || model<IParking>('Parking', ParkingSchema);

export default Parking;
