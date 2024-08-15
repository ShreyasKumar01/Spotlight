"use server"

import { CreateOrderParams, GetOrdersByParkingParams, GetOrdersByUserParams } from "@/types"
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';
import Parking from '../database/models/parking.model';
import {ObjectId} from 'mongodb';
import User from '../database/models/user.model';

export const createOrder = async ({order, parkingId, buyerId}: CreateOrderParams) => {
  try {
    await connectToDatabase();

    console.log(order);
    
    const newOrder = await Order.create({
      ...order,
      parking: parkingId,
      buyer: buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY PARKING
export async function getOrdersByParking({ searchString, parkingId }: GetOrdersByParkingParams) {
  try {
    await connectToDatabase()

    if (!parkingId) throw new Error('Parking ID is required')
    const parkingObjectId = new ObjectId(parkingId)

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'parkings',
          localField: 'parking',
          foreignField: '_id',
          as: 'parking',
        },
      },
      {
        $unwind: '$parking',
      },
      {
        $project: {
          _id: 1,
          totalAmount: '$parking.price',
          createdAt: 1,
          parkingName: '$parking.name', 
          parkingId: '$parking._id',
          buyer: {
            $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
          },
        },
      },
      {
        $match: {
          $and: [
            { parkingId: parkingObjectId },
            { buyer: { $regex: RegExp(searchString, 'i') } },
          ],
        },
      },
    ])
    console.log(JSON.stringify(orders));
    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    handleError(error)
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: userId }

    const orders = await Order.distinct('parking._id')
      .find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'parking',
        model: Parking,
        populate: {
          path: 'postedBy',
          model: User,
          select: '_id firstName lastName',
        },
      })

    const ordersCount = await Order.distinct('parking._id').countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
  } catch (error) {
    handleError(error)
  }
}