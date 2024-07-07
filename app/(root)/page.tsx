import { CarouselPlugin } from '@/components/shared/Carousel1';
import Collection from '@/components/shared/Collection';
import { getAllParkings } from '@/lib/actions/parking.actions';
import Image from 'next/image';
import React from 'react'

const page = async () => {
  const parkings= await getAllParkings({
    query:'',
    city:'',
    page:1,
    limit:6
  });
  return (
    <>
    <section className='wrapper flex'>
        <CarouselPlugin />
    </section>
      <section className='bg-primary-50 bg-contain py-5 md:py-10'>
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-1 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8 items-center">
            <h1 className='h1-bold text-center'><span style={{color:'#001e70'}}>Spot</span>light<br /><span className='h3-bold'>Your Smart Solution for Hassle-Free Parking </span></h1>
            <p className="p-regular-16 md:p-regular-20">Discover how Spotlight revolutionizes parking with advanced technology, helping you effortlessly find the perfect parking spot. Whether you're in a crowded city or a busy event, Spotlight's smart parking management system ensures you save time and reduce stress by guiding you to the nearest available space with real-time updates</p>
          </div>
          <Image src="/assets/images/hero.png" alt='main-image' height={1200} width={1200} className='max-h-[70vh] object-center object-contain 2xl:max-h-[50vh]'/>
        </div>
      </section>
      <section id='events' className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
        <div className='flex w-full flex-col gap-5 md:flex-row'>
          Search
          CategoryFilter
        </div>
        <Collection
        data={parkings?.data}
        emptyTitle="No Parkings created yet.."
        emptyStateSubtext="Create a Parking"
        collectionType="All_Parkings"
        limit={6}
        page={1}
        urlParamName="ordersPage"
        totalPages={2}
        />
      </section>
    </>
  )
}

export default page;
