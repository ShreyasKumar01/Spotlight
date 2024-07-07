import * as z from "zod";

export const parkingFormSchema = z.object({
    name: z.string().min(3, "name must be atleast 3 characters"),
    description:z.string().min(3, "Description must be at least 3 characters").max(250, "Descreption must be less than 250 characters"),
    location:z.string().min(3, "Description must be at least 3 characters").max(250, "Descreption must be less than 250 characters"),
    imageUrl:z.string(),
    startDateTime:z.date(),
    endDateTime:z.date(),
    cityId:z.string(),
    price:z.string(),
    spaces:z.string()
  })