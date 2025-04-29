import React from 'react'
import Image from 'next/image'

export default function Header() {
   return (
      <div className="flex justify-center items-center bg-gray-800 text-black font-bold black-white h-16">
         {/* <Image
            src="public/shirt_logo.jpeg"
            alt="Logo"
            width={100}
            height={100}
            className="absolute top-0 left-0 z-10"  
         /> */}
         <button className="flex-2 bg-blue-500 h-full">Store</button>
         <button className="flex-1 bg-amber-300 h-full">Cart</button>
         <button className="flex-1 bg-white h-full">Sign-In</button>
      </div>
   )
}
