import { ListChecks } from 'lucide-react'
import React from 'react'

export default function DashboardCard({available, icon, title, percent}) {
  return (
    <div className='font-poppins'>
        <div class="flex sm:flex-row rounded-lg h-full bg-white p-6 flex-col">
        <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 class="text-orange-500 text-4xl font-poppins font-semibold mb-2">{available}</h2>
        <p class="leading-relaxed text-sm font-medium"> {title} </p>
        
        
      </div>
      <div class="sm:w-20 sm:order-none order-first sm:h-20 h-14 w-14 mt-4 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
        <span className='text-teal-600 text-xl font-bold' > {icon} </span>
        
      </div>
        </div>
    </div>
  )
}
