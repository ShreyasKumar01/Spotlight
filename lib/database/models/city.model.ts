import { Schema, model, models } from "mongoose";

export interface ICity extends Document{
    _id: string;
    name: string;
}

const CitySchema = new Schema({
    name:{type: String, required: true, unique: true}
})

const City= models.City || model('City', CitySchema);

export default City;