import CityFilter from '@/components/shared/CityFilter';
import Collection from '@/components/shared/Collection';
import FAQItem from '@/components/shared/FAQItem';
import HeroSection from '@/components/shared/Hero';
import Hero2 from '@/components/shared/Hero2';
import Search from '@/components/shared/Search';
import { getAllParkings } from '@/lib/actions/parking.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = searchParams?.query as string || "";
  const city = searchParams?.city as string || "";
  const parkings = await getAllParkings({
    query: searchText,
    city,
    page,
    limit: 6
  });
  return (
    <>
      <HeroSection />

      <Hero2 />

      <section id='parkings' className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
        <div className='flex w-full flex-col gap-5 md:flex-row'>
          <Search />
          <CityFilter />
        </div>
        <Collection
          data={parkings?.data}
          emptyTitle="No Parkings created yet.."
          emptyStateSubtext="Create a Parking"
          collectionType="All_Parkings"
          limit={6}
          page={page}
          urlParamName="ordersPage"
          totalPages={parkings?.totalPages}
        />
      </section>

      <section id='faq' className='w-full bg-gray-100 py-8 md:py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <FAQItem />
        </div>
      </section>

    </>
  )
}

export default page;
