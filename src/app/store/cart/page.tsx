import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function page() {
   return (
      <div className="flex items-center justify-center h-screen text-black font-bold w-full bg-gray-300">

         {/* left side */}
         <div className="flex flex-2 flex-col items-center justify-start bg-white w-1/2 h-11/12 space-y-2">

            {/* cart logo */}
            <div className="mt-4 text-8xl">🛒</div>

            {/* items */}
            <div>map over list</div>
            <div className="flex items-center justify-around w-full bg-gray-300 p-8 rounded-4xl shadow-lg">
               <Image src="/public/image/shirt_logo.jpeg" alt="Shirt Logo" width={100} height={100} className="rounded-lg shadow-lg mb-4" />
               <div className="flex flex-col">
                  <h2 className="text-lg font-bold mb-2">Item Name</h2>
                  <p className="text-gray-700 mb-2">$20.00</p>
                  <p className="text-gray-700 mb-2">By William</p>
               </div>
               <div className="text-4xl">😉</div>
               <button className="bg-amber-300 hover:bg-amber-400 hover:cursor-pointer text-2xl p-4 rounded-4xl">Follow</button>
               <button className="bg-red-400 hover:bg-red-600 hover:cursor-pointer text-2xl w-16 h-16 rounded-2xl">X</button>
            </div>

            {/* return to shopping */}
            <button className="bg-blue-400 hover:bg-blue-600 hover:cursor-pointer p-4 rounded-2xl">
               <Link href="/store">Return Shopping</Link>
            </button>

         </div>

         {/* right side */}
         <div className="flex flex-1 flex-col items-center justify-center w-1/2 h-11/12 bg-white shadow-lg p-4">

            {/* credit card */}
            <div>Stripe Payment link thing</div>

            {/* shipping options */}
            <select className="border border-gray-300 rounded-lg p-4 w-full mb-4">
               <option value="standard">Standard Shipping</option>
               <option value="express">Express Shipping</option>
            </select>

            {/* buy */}
            <div className="bg-green-400 hover:bg-green-600 hover:cursor-pointer text-2xl p-4 w-full text-center rounded-2xl">Buy</div>
         </div>
      </div>
   )
}
