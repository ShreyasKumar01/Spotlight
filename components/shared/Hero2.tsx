import React from 'react';
import Image from 'next/image';

const Hero2 = () => {
  return (
    <section className='bg-gray-100 bg-contain py-10 md:py-16'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 md:gap-12">
        <div className="flex flex-col justify-center gap-6 items-center text-center">
          <h2 className='text-4xl md:text-5xl font-bold text-black'>
            Spotlight
            <br />
            <span className='text-2xl md:text-3xl font-semibold text-gray-700'>Your Smart Solution for Hassle-Free Parking</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl">
            Discover how Spotlight revolutionizes parking with advanced technology, helping you effortlessly find the perfect parking spot. Our smart parking management system ensures you save time and reduce stress by guiding you to the nearest available space with real-time updates.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative w-full h-64 md:h-80">
            <img
              src="https://img.freepik.com/free-photo/top-view-electric-cars-parking-lot_23-2148972403.jpg?t=st=1728813237~exp=1728816837~hmac=958c953ae2d87ccca454eb5fff70865166b096e766f21678824bbc2ca41eca97&w=1060"
              alt="Smart parking app interface"
              className="rounded-lg shadow-md object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Real-Time Parking Availability</h3>
            <p className="text-gray-600">
              Our advanced sensors and AI-powered system provide up-to-the-minute information on parking space availability. Never circle the block again – Spotlight guides you directly to open spots.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Seamless Navigation &amp; Booking</h3>
            <p className="text-gray-600">
              Integrate Spotlight with your favorite navigation app for turn-by-turn directions to your reserved parking spot. Book in advance or on-the-go, ensuring a stress-free parking experience every time.
            </p>
          </div>
          <div className="relative w-full h-64 md:h-80 order-1 md:order-2">
            <img
              src="https://img.freepik.com/premium-photo/midsection-man-using-mobile-phone_1048944-27411105.jpg?w=996"
              alt="Car parking with smart sensors"
              className="rounded-lg shadow-md object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero2;