import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-none mb-4">
              <span className="text-gray-900">Spot</span>
              <span className="text-gray-800">light</span>
            </h1>
            <p className="text-gray-800 text-xl sm:text-2xl mb-4">Urban parking simplified.</p>
            <p className="text-gray-600 text-base sm:text-lg mb-8">
              Expert solutions for urban parking challenges. We optimize your space,
              ensuring seamless experiences for every visitor. With cutting-edge technology
              and a dedicated team, we make parking effortless.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/#parkings">
                <button className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
                  Explore Parkings
                </button>
              </Link>
              <Link href='/about'>
                <button className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className="relative w-full h-0 pb-[75%] lg:pb-[66.66%]">
              <div className="absolute inset-0 overflow-hidden rounded-md">
                <img
                  src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Aerial view of parking lot"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
