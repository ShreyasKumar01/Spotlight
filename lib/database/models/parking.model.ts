import { Schema, model, models, Document } from 'mongoose';

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
  city: { type: Schema.Types.ObjectId, ref: 'Category' },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Parking = models.Parking || model<IParking>('Parking', ParkingSchema);

export default Parking;
