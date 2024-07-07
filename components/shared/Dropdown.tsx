import React, { startTransition, useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ICity } from '@/lib/database/models/city.model'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '../ui/input'
import { createCity, getAllCities } from '@/lib/actions/city.actions'


type DropdownProps = {
    value?: string
    onChangeHandler?: () => void
}
const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
    const [cities, setCities] = useState<ICity[]>([]);
    const [newCity, setNewCity] = useState('');

    const handleAddCity = () =>{
        createCity({
            cityName: newCity.trim()
        }).then((city)=>{
            setCities((prevState) => [...prevState, city])
        })
    }

    useEffect(() => {
        const getCities = async()=>{
            const cityList=await getAllCities();

            cityList && setCities(cityList as ICity[])
        }
        getCities();
    }, [])

    return (
        <div>
            <Select onValueChange={onChangeHandler} defaultValue={value}>
                <SelectTrigger className="select-field">
                    <SelectValue placeholder="City" className='idk'/>
                </SelectTrigger>
                <SelectContent>
                    {cities.length > 0 && cities.map((city) => (
                        <SelectItem key={city._id} value={city._id} className="select-item p-regular-14">
                            {city.name}
                        </SelectItem>
                    ))}
                    <AlertDialog>
                        <AlertDialogTrigger className='p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500'>Add new city</AlertDialogTrigger>
                        <AlertDialogContent className='bg-white'>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Enter city name</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <Input type='text' placeholder='City name' className='input-field mt-3' onChange={(e) => setNewCity(e.target.value)}/>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() =>startTransition(handleAddCity)}>Add</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </SelectContent>
            </Select>
        </div>
        
    )
}

export default Dropdown
