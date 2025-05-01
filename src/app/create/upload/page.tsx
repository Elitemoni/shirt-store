import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function page() {
   return (
      <div className="flex items-center justify-around h-screen w-full">

         {/* left side */}
         <div className="flex-1 flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg shadow-lg space-y-2">

            {/* share */}
            <div className="flex items-center justify-center bg-gray-300 p-4 text-center rounded-4xl w-full">
               <div>😄</div>
               <div className="flex items-center justify-center">
                  <div>Share With:&nbsp;</div>
                  <div>😎</div>
               </div>
            </div>

            {/* set price */}
            <div className="flex items-center justify-center bg-gray-300 p-4 text-center rounded-4xl w-full">
               <div>Set Price:</div>
               <input
                  type="text"
                  placeholder="$20.00" 
                  className="border border-gray-300 rounded-lg p-2 ml-2"
               />
            </div>

            {/* shipping options */}
            <select className="border border-gray-300 rounded-lg p-4 w-full mb-4">
               <option value="standard">Standard Shipping</option>
               <option value="express">Express Shipping</option>
            </select>

         </div>

         {/* right side */}
         <div className="flex-1 flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg shadow-lg space-y-2">
            <div>name</div>
            <Image
               src="/public/shirt_logo.jpeg"
               alt="Logo"
               width={1}
               height={1}
               className="flex-1 h-full rounded-lg shadow-lg"
            />
            <Link href="/store" className="bg-green-400 p-4 rounded-4xl">Upload to the Store!</Link>
         </div>
      </div>
   )
}
