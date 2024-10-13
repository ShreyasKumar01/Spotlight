import React from 'react';

const OurServices = () => {
  return (
    <>
      <h2 className="text-4xl font-bold text-center text-gray-900 mt-16 mb-12">
        Our Services
      </h2>

      <section className='bg-gray-50 py-10 md:py-16'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 md:gap-24">
            {/* Smart Parking Locator */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
              <div className="flex flex-col justify-center gap-6">
                <h3 className='text-3xl font-bold text-gray-800'>Smart Parking Locator</h3>
                <p className="text-lg text-gray-600">
                  Find the perfect parking spot in real-time with our advanced AI-powered system. Say goodbye to circling blocks and hello to stress-free parking. Whether you're in a crowded city or at a busy event, our smart parking management system ensures you save time and reduce stress.
                </p>
              </div>
              <div className="relative w-full h-64 md:h-80">
                <img
                  src="https://img.freepik.com/free-vector/gps-navigator-concept-illustration_114360-7374.jpg"
                  alt='Smart parking illustration'
                  className='rounded-lg shadow-md w-full h-full object-cover'
                />
              </div>
            </div>

            {/* Contactless Payment Solutions */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
              <div className="order-2 md:order-1 relative w-full h-64 md:h-80">
                <img
                  src="https://img.freepik.com/free-photo/person-using-nfc-technology-pay-bill-restaurant_23-2150039418.jpg"
                  alt='Contactless payment illustration'
                  className='rounded-lg shadow-md w-full h-full object-cover'
                />
              </div>
              <div className="order-1 md:order-2 flex flex-col justify-center gap-6">
                <h3 className='text-3xl font-bold text-gray-800'>Contactless Payment Solutions</h3>
                <p className="text-lg text-gray-600">
                  Seamlessly pay for parking using our secure, contactless payment system. No more fumbling for change or racing back to the meter. Our user-friendly interface makes transactions quick and hassle-free, ensuring a smooth parking experience from start to finish.
                </p>
              </div>
            </div>

            {/* Parking Space Management */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
              <div className="flex flex-col justify-center gap-6">
                <h3 className='text-3xl font-bold text-gray-800'>Parking Space Management</h3>
                <p className="text-lg text-gray-600">
                  For lot owners: Optimize your parking space utilization with our comprehensive management tools. Increase efficiency and boost revenue. Our system provides real-time analytics, automated reporting, and customizable pricing strategies to maximize your parking lot's potential.
                </p>
              </div>
              <div className="relative w-full h-64 md:h-80">
                <img
                  src="https://img.freepik.com/free-photo/transport-concept-parked-vehicles_23-2148959697.jpg"
                  alt='Parking management dashboard'
                  className='rounded-lg shadow-md w-full h-full object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurServices;
