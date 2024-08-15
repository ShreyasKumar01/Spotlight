import { Schema, model, models, Document } from 'mongoose'

export interface IOrder extends Document {
  _id: string;
  vehicleName: string;
  vehicleCompany: string;
  vehicleNumber: string;
  vehicleType?: string;
  startDateTime: Date;
  endDateTime: Date;
  price?: string;
  createdAt: Date;
  parking: {
    _id: string
    name: string
  }
  buyer: {
    _id: string
    firstName: string
    lastName: string
  }
}

export type IOrderItem = {
  _id: string
  totalAmount: string
  createdAt: Date
  parkingName: string
  parkingId: string
  buyer: string
}

const OrderSchema = new Schema({
  vehicleName: { type: String, required: true },
  vehicleNumber: { type: String, required: true},
  vehicleCompany: { type: String},
  vehicleType: { type: String},
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  price: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parking: {
    type: Schema.Types.ObjectId,
    ref: 'Parking',
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Order = models.Order || model<IOrder>('Order', OrderSchema)

export default Order
