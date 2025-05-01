import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
   return (
      <div className="flex justify-center items-center bg-gray-800 text-black font-bold h-16">
         <Image
            src="/public/shirt_logo.jpeg"
            alt="Logo"
            width={1}
            height={1}
            className="flex-1 h-full rounded-lg shadow-lg"  
         />
         <Link href="/store" className="flex-3 flex items-center justify-center bg-blue-500 h-full">
            Store
         </Link>
         <Link href="/create" className="flex-2 flex items-center justify-center h-full bg-amber-300">
            Create
         </Link>
         <button className="flex-1 bg-white h-full">Sign-In</button>
      </div>
   )
}
