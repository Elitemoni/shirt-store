import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function page() {
   return (
      <div className="flex items-center justify-center h-screen bg-gray-300 text-black font-bold w-full">

         {/* Left Side */}
         <div className="flex flex-1 flex-col items-center justify-center bg-white w-1/2 h-11/12 space-y-2">
            <div>Filter Dropdowns</div>
            <button className="bg-blue-400 hover:bg-blue-600 hover:cursor-pointer p-4 w-1/3">Shirt Type</button>
            <button className="bg-blue-400 hover:bg-blue-600 hover:cursor-pointer p-4 w-1/3">Style</button>
            <button className="bg-blue-400 hover:bg-blue-600 hover:cursor-pointer p-4 w-1/3">Creators</button>
         </div>

         {/* Right Side */}
         <div className="flex flex-2 flex-col items-center justify-center w-1/2 h-11/12 bg-white shadow-lg p-4">

            {/* Search Bar */}
            <div className="flex items-center justify-center w-full mb-4">
               <input
                  type="text"
                  placeholder="Search..."
                  className="border border-gray-300 rounded-lg p-4 w-full"
               />

               <button className="bg-amber-300 hover:bg-amber-400 hover:cursor-pointer p-4 rounded-lg ml-2">
                  <Link href="/store/cart">🛒</Link>
               </button>
            </div>

            {/* Items */}
            <div>Map over the csv list</div>
            <div className="flex items-center justify-around w-full bg-gray-300 p-8 rounded-4xl shadow-lg">
               <Image src="/public/shirt_logo.jpeg" alt="Shirt Logo" width={100} height={100} className="rounded-lg shadow-lg mb-4" />
               <div className="flex flex-col">
                  <h2 className="text-lg font-bold mb-2">Item Name</h2>
                  <p className="text-gray-700 mb-2">$20.00</p>
                  <p className="text-gray-700 mb-2">By William</p>
               </div>
               <div className="text-4xl">😉</div>
               <button className="bg-green-400 hover:bg-green-600 hover:cursor-pointer text-4xl w-16 h-16 rounded-4xl">+</button>
            </div>
            
         </div>
      </div>
   )
}
