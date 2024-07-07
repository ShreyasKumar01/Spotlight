"use server";

import { CreateCityParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import City from "../database/models/city.model";

export const createCity = async ({cityName}: CreateCityParams) =>{
    try{
        await connectToDatabase();
        const newCity = await City.create({name:cityName});

        return JSON.parse(JSON.stringify(newCity));

    }catch(error){
        handleError(error);
    }
}


export const getAllCities = async () =>{
    try{
        await connectToDatabase();
        const cities = await City.find();

        return JSON.parse(JSON.stringify(cities));

    }catch(error){
        handleError(error);
    }
}