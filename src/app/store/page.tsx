import React from 'react'

export default function page() {
   return (
      <div className="flex items-center justify-center h-screen bg-orange-200 text-black font-bold w-full">

         {/* Filter Dropdowns */}
         <div className="flex flex-col items-center justify-center bg-white w-1/2 h-11/12">
            Filter Dropdowns
         </div>

         {/* Right Side */}
         <div className="flex flex-col items-center justify-center w-1/2 h-11/12 bg-white rounded-lg shadow-lg p-4">

            {/* Search Bar */}
            <input
               type="text"
               placeholder="Search..."
               className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
            />

            {/* Items */}
            <div>Map over the csv list</div>
               
         </div>
      </div>
   )
}
