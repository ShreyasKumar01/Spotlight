import CityFilter from '@/components/shared/CityFilter';
import Collection from '@/components/shared/Collection';
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
      <section className='wrapper1'>
        {/* <CarouselPlugin /> */}
        <div
          className="main-image relative w-full"
          style={{
            paddingTop: '56.25%', // This creates a 16:9 aspect ratio
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1484359755660-c7ed8f31f0cc?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="text-center px-4 sm:px-6 lg:px-8">
              <h1 className="text-white text-2xl sm:text-5xl md:text-6xl tracking-widest font-normal">SPOTLIGHT</h1>
              <Link href="/#parkings">
                <button className="mt-5 px-2 py-1 sm:px-6 sm:py-2 text-lg text-white border-2 border-white hover:bg-white hover:text-black transition">
                  Explore Parkings
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-primary-50 bg-contain py-5 md:py-10'>
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-1 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8 items-center">
            <h1 className='h1-bold text-center'><span style={{ color: '#001e70' }}>Spot</span>light<br /><span className='h3-bold'>Your Smart Solution for Hassle-Free Parking </span></h1>
            <p className="p-regular-16 md:p-regular-20">Discover how Spotlight revolutionizes parking with advanced technology, helping you effortlessly find the perfect parking spot. Whether you're in a crowded city or a busy event, Spotlight's smart parking management system ensures you save time and reduce stress by guiding you to the nearest available space with real-time updates</p>
          </div>
          <Image src="/assets/images/hero.png" alt='main-image' height={1200} width={1200} className='max-h-[70vh] object-center object-contain 2xl:max-h-[50vh]' />
        </div>
      </section>
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
    </>
  )
}

export default page;
