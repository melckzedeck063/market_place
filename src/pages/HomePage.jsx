import React from 'react';
import NavBar from '../components/NavBar';
import image from '../assets/images/accounting.png';
import FeaturesSection from '../components/FeaturesSection';
import IntroductionSection from '../components/IntroductionSection';
import TestimonialSection from '../components/TestimonialSection';
import FooterSection from '../components/FooterSection';

export default function HomePage() {
  return (
    <div className='font-poppins relative'>
      <NavBar />

      {/* Circles Background */}
      <div className="relative">
        <div className="absolute inset-0 mt-96 flex items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-[80vw] w-[80vw] max-h-[580px] max-w-[580px] flex items-center justify-center rounded-full border border-teal-600">
              <div className="h-[60vw] w-[60vw] max-h-[370px] max-w-[370px] flex items-center justify-center rounded-full border border-teal-600">
                <div className="h-[30vw] w-[30vw] max-h-[170px] max-w-[170px] flex items-center justify-center rounded-full border border-teal-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section on Top */}
      <div className="relative w-11/12 mx-auto flex items-center justify-center min-h-screen">
        <section className="text-gray-600 body-font w-full">
          <div className="container px-5 py-4 mx-auto flex flex-wrap">
            <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10 items-center text-center">
              <div className="sm:p-4 px-4 mb-6 mt-24 w-full">
                <div className="text-5xl text-center font-bold mb-8">
                  Empowering You to 
                  <span className='text-teal-600 mb-1'> Save, Borrow</span>, and 
                  <span className="text-teal-600"> Grow Financially</span>
                </div>
                
                <div className="leading-relaxed font-light text-center w-11/12 mx-auto">
                  Access Your SACCOSS account, manage savings, apply for loans and track transactions - all in one secure place.
                </div>

                <button type="button" className="text-white w-7/12 mx-auto ml-16 mt-12 bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                  Get started
                </button>
              </div>
            </div>

            <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0 p-20 ml-6">
              <img className="object-cover object-center w-full h-full" src={image} alt="stats"/>
            </div>
          </div>
        </section>
      </div>

      <section>
        <FeaturesSection />
      </section>
      <section>
        <IntroductionSection  />
      </section>
      <section>
        <TestimonialSection />
      </section>
      <section>
        <FooterSection  />
      </section>
    </div>
  );
}
