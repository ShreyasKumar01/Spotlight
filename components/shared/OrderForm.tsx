"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { orderFormSchema } from "@/lib/validator";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { IParking } from "@/lib/database/models/parking.model";
import { createOrder } from "@/lib/actions/order.actions";

type ParkingFormProps = {
    userId: string
    parking?: IParking
    parkingId?: string
}

const OrderForm = ({ userId, parking, parkingId }: ParkingFormProps) => {

    const initialValues ={
            vehicleName: '',
            vehicleCompany: '',
            vehicleNumber: '',
            vehicleType: '',
            startDateTime: parking? (new Date(parking.startDateTime)): (new Date()),
            endDateTime: parking? (new Date(parking.endDateTime)): (new Date())
        }

    const router = useRouter();

    const form = useForm<z.infer<typeof orderFormSchema>>({
        resolver: zodResolver(orderFormSchema),
        defaultValues: initialValues,
    })

    async function onSubmit(values: z.infer<typeof orderFormSchema>) {

        if (!parkingId) {
            console.log("No such parking available");
            router.back();
            return;
        }
        try {
            const newOrder = await createOrder({
                order: { ...values},
                parkingId: parkingId,
                buyerId: userId
            })
            if (newOrder) {
                form.reset();
                alert('Order made successfully !!');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 ">
                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="vehicleCompany"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="Company" {...field} className="input-field" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="vehicleName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="Vehicle Name" {...field} className="input-field" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="vehicleType"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="select-field">
                                                <SelectValue placeholder="Vehicle type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Two-wheeler" className="select-item p-regular-14">Two-wheeler</SelectItem>
                                                <SelectItem value="Four-wheeler" className="select-item p-regular-14">Four-wheeler</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="vehicleNumber"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="Vehicle number" {...field} className="input-field" />
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
                                                    }
                                                }}
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
                                                    }
                                                }}
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

                    <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="button col-span-2 w-full">
                        {form.formState.isSubmitting ? ("Submitting...") : `Buy Ticket`}
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default OrderForm
