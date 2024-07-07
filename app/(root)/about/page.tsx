import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <>
    <h2 className="h2-bold flex justify-center mt-3">
        About us
    </h2>
      <section className='bg-primary-50 bg-contain py-5 md:py-10'>
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className='h1-bold'><span style={{color:'#001e70'}}>Spot</span>light<br />Your Smart Solution for Hassle-Free Parking </h1>
            <p className="p-regular-16 md:p-regular-20">Discover how Spotlight revolutionizes parking with advanced technology, helping you effortlessly find the perfect parking spot. Whether you're in a crowded city or a busy event, Spotlight's smart parking management system ensures you save time and reduce stress by guiding you to the nearest available space with real-time updates</p>
          </div>
          <Image src="/assets/images/hero.png" alt='main-image' height={1200} width={1200} className='max-h-[70vh] object-center object-contain 2xl:max-h-[50vh]'/>
        </div>
      </section>

      <section className='bg-primary-50 bg-contain py-5 md:py-10'>
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <Image src="/assets/images/hero.png" alt='main-image' height={1200} width={1200} className='max-h-[70vh] object-center object-contain 2xl:max-h-[50vh]'/>
          <div className="flex flex-col justify-center gap-8">
            <h1 className='h1-bold'><span style={{color:'#001e70'}}>Spot</span>light<br />Your Smart Solution for Hassle-Free Parking </h1>
            <p className="p-regular-16 md:p-regular-20">Discover how Spotlight revolutionizes parking with advanced technology, helping you effortlessly find the perfect parking spot. Whether you're in a crowded city or a busy event, Spotlight's smart parking management system ensures you save time and reduce stress by guiding you to the nearest available space with real-time updates</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default page
