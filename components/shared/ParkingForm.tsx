"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { parkingFormSchema } from "@/lib/validator";
import Dropdown from "./Dropdown";
import { Textarea } from "../ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import DatePicker from "react-datepicker";
import {useUploadThing} from '@/lib/uploadthing'

import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createParking, updateParking } from "@/lib/actions/parking.actions";
import { IParking } from "@/lib/database/models/parking.model";


type ParkingFormProps = {
  userId: string
  type: "Create" | "Update"
  parking?:IParking
  parkingId?:string
}

const ParkingForm = ({userId, type, parking, parkingId}: ParkingFormProps) => {
  const [files,setFiles]=useState<File[]>([]);

    const initialValues =parking && type==='Update' ?{
      ...parking,
      startDateTime:new Date(parking.startDateTime),
      endDateTime:new Date(parking.endDateTime)
    }:
    {
    name: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    cityId: '',
    price: '',
    spaces: ''
   }

  const router= useRouter();

  const {startUpload} = useUploadThing('imageUploader');

  const form = useForm<z.infer<typeof parkingFormSchema>>({
    resolver: zodResolver(parkingFormSchema),
    defaultValues: initialValues,
  })
 
  async function onSubmit(values: z.infer<typeof parkingFormSchema>) {
    
    let uploadedImageUrl = values.imageUrl;
    if(files.length>0){
      const uploadedImages = await startUpload(files);

      if(!uploadedImages){
        return
      }

      uploadedImageUrl = uploadedImages[0].url
    }

    if(type === "Create"){
      try{
        const updatedParking = await createParking({
          parking: {...values, imageUrl: uploadedImageUrl},
          userId, 
          path: '/profile'
        })
        if(updatedParking){
          form.reset();
          router.push(`/parking/${updatedParking._id}`)
        }
      }catch(error){
        console.log(error);
      }
    }

    if(type === "Update"){
      if(!parkingId){
        console.log("No such parking available");
        router.back();
        return;
      }
      try{
        const updatedParking = await updateParking({
          userId, 
          parking: {...values, imageUrl: uploadedImageUrl, _id: parkingId},
          path: `/parking/${parkingId}`
        })
        if(updatedParking){
          form.reset();
          router.push(`/parking/${updatedParking._id}`)
        }
      }catch(error){
        console.log(error);
      }
    }

  }
  return (
    <>
      <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 ">
        <div className="flex flex-col gap-5 md:flex-row">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Parking Name" {...field} className="input-field"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cityId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Dropdown onChangeHandler={field.onChange} value={field.value}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="h-10">
                <Textarea placeholder="Mention the details about the parking as in only two-wheelers allowed or four-wheelers can be accomodated too." {...field} className="input-field" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Parking Address" {...field} className="input-field"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden bg-grey-50 px-4 py-2">
                      <p className="ml-3 whitespace-nowrap text-grey-500">Start Date:</p>
                      <DatePicker className="text-grey-500"
                        selected={field.value} 
                        onChange={(date) => {
                          if (date !== null) {
                            field.onChange(date);
                          }}}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        
          <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden bg-grey-50 px-4 py-2">
                      <p className="ml-3 whitespace-nowrap text-grey-500">End Date:</p>
                      <DatePicker className="text-grey-500"
                        selected={field.value} 
                        onChange={(date) => {
                          if (date !== null) {
                            field.onChange(date);
                          }}}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
        <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden bg-grey-50 px-4 py-2">
                      <Input type="number" placeholder="Price" {...field} className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focrs:border-0 
                      focus-visible:ring-0 focus-visible:ring-offset-0"/>
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        <FormField
              control={form.control}
              name="spaces"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden bg-grey-50 px-4 py-2">
                      <Input type="number" placeholder="Number of spaces available" {...field} className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focrs:border-0 
                      focus-visible:ring-0 focus-visible:ring-offset-0"/>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="h-20">
                <FileUploader
                onFieldChange={field.onChange}
                imageUrl={field.value}
                setFiles={setFiles}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="button col-span-2 w-full">
        {form.formState.isSubmitting?("Submitting..."):`${type=="Create" ? "Create":"Update"} Parking`}
        </Button>
      </form>
    </Form>
    </>
  )
}

export default ParkingForm
