"use server"

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import City from "../database/models/city.model";
import Parking from "../database/models/parking.model";
import User from "../database/models/user.model";
import { handleError } from "../utils"
import {CreateParkingParams, DeleteParkingParams, GetAllParkingsParams, GetParkingsByUserParams, GetRelatedParkingsByCityParams, UpdateParkingParams} from '@/types'

const populateParking = async (query: any) =>{
    return query.populate({path: 'postedBy', model: User, select: '_id firstName lastName'})
    .populate({path: 'city', model: City, select: '_id name'})
}

const getCityByName = async (name: string) =>{
    return City.findOne({name:{$regex:name, $options: 'i'}});
}

export const createParking = async ({parking, userId, path}: CreateParkingParams)=>{
    try{
        await connectToDatabase();

        const postedBy = await User.findById(userId);

        if(!postedBy){
            throw new Error("Organizer not found");
        }
        const newParking= await Parking.create({
            ...parking, 
            city: parking.cityId,
            postedBy: userId,
        });
        
        return JSON.parse(JSON.stringify(newParking));
    }catch(error){
        handleError(error);
    }
}

export const getParkingById = async (parkingId: string) =>{
    try{
        await connectToDatabase();

        const parking = await populateParking(Parking.findById(parkingId));

        if(!parking){
            throw new Error("Parking not found!");
        }
        
        return JSON.parse(JSON.stringify(parking));
    }catch(error){
        handleError(error);
    }
}

export const getAllParkings = async ({query, limit= 6, page, city}: GetAllParkingsParams) =>{
    try{
        await connectToDatabase();

        const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
        const cityCondition = city ? await getCityByName(city) : null
        const conditions = {
        $and: [titleCondition, cityCondition ? { city: cityCondition._id } : {}],
        }

        const skipAmount = (Number(page) - 1) * limit

        const parkingQuery = Parking.find(conditions)
        .sort({createdAt: 'desc'})
        .skip(skipAmount)
        .limit(limit);

        const parkings = await populateParking(parkingQuery);
        const parkingsCount = await Parking.countDocuments(conditions);
        
        return {
            data: JSON.parse(JSON.stringify(parkings)),
            totalPages: Math.ceil(parkingsCount/(limit)),
        }
    }catch(error){
        handleError(error);
    }
}

export const deleteParking = async ({parkingId, path}: DeleteParkingParams) =>{
    try{
        await connectToDatabase();

        const deletedParking =await Parking.findByIdAndDelete(parkingId);

        if(deletedParking) revalidatePath(path);
        
        Parking.deleteOne({_id: parkingId});
    }catch(error){
        handleError(error);
    }
}

export async function updateParking({ userId, parking, path }: UpdateParkingParams) {
    try {
      await connectToDatabase()
  
      const parkingToUpdate = await Parking.findById(parking._id)
      if (!parkingToUpdate) {
        throw new Error('Parking does not exist')
      }
  
      const updatedParking = await Parking.findByIdAndUpdate(
        parking._id,
        { ...parking, city: parking.cityId },
        { new: true }
      )
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(updatedParking))
    } catch (error) {
      handleError(error);
    }
  }

export async function getRelatedParkingsByCity({
    cityId,
    parkingId,
    limit = 3,
    page = 1,
  }: GetRelatedParkingsByCityParams) {
    try {
      await connectToDatabase()
  
      const skipAmount = (Number(page) - 1) * limit
      const conditions = { $and: [{ city: cityId }, { _id: { $ne: parkingId } }] }
  
      const parkingsQuery = Parking.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const parkings = await populateParking(parkingsQuery)
      const parkingsCount = await Parking.countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(parkings)), totalPages: Math.ceil(parkingsCount / limit) }
    } catch (error) {
      handleError(error)
    }
}

export async function getParkingsByUser({ userId, limit = 6, page }: GetParkingsByUserParams) {
    try {
      await connectToDatabase()
  
      const conditions = { postedBy: userId }
      const skipAmount = (page - 1) * limit
  
      const parkingsQuery = Parking.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const parkings = await populateParking(parkingsQuery)
      const parkingsCount = await Parking.countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(parkings)), totalPages: Math.ceil(parkingsCount / limit) }
    } catch (error) {
      handleError(error)
    }
  }

