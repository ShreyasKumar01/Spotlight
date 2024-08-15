"use client";
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { getAllCities } from '@/lib/actions/city.actions';
import { ICity } from '@/lib/database/models/city.model';
const CityFilter = () => {
  const [cities, setCities] = useState<ICity[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const getCities = async () => {
      const cityList = await getAllCities();

      cityList && setCities(cityList as ICity[])
    }
    getCities();
  }, [])


  const onSelectCity = (city: string) => {
        let newUrl='';
          if(city && city!="All"){
              newUrl = formUrlQuery({
                  params:searchParams.toString(),
                  key:'city',
                  value:city
              })
          }
          else{
              newUrl = removeKeysFromQuery({
                  params:searchParams.toString(),
                  keysToRemove:['city']
              })
          }
          router.push(newUrl, {scroll:false});
  }

  return (
    <>
      <Select onValueChange={(value: string) => onSelectCity(value)}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="City" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>

          {cities.map((city) => (
            <SelectItem value={city.name} key={city._id} className="select-item p-regular-14">
              {city.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}

export default CityFilter
