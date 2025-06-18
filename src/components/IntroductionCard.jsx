import React from 'react';

export default function IntroductionCard({title,desc}) {
  return (
    <div className="flex font-poppins justify-center items-center">
      <div className="h-full text-center flex flex-col items-center">
        {/* Centered Rounded Shape */}
        <div className="h-20 w-20 rounded-full flex flex-col items-center bg-teal-600">
        </div>
        <h2 className="text-gray-900 mt-8 text-lg font-bold tracking-wider">
          {title}
        </h2>

        <p className="leading-relaxed font-light mt-4 px-4">
          {desc}
        </p>
        {/* <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span> */}
        
      </div>
    </div>
  );
}
