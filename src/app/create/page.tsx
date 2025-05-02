import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function page() {
   return (
      <div className="flex items-center justify-around h-screen w-full">

         {/* left side */}
         <div className="flex-1 flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg shadow-lg">
            {/* drawing tools */}
            <div>Drawing tools</div>
         </div>

         {/* middle */}
         <div className="flex-1 flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg shadow-lg">
            {/* shirt */}
            <div>name</div>
            <Image
               src="/public/image/shirt_logo.jpeg"
               alt="Logo"
               width={1}
               height={1}
               className="flex-1 h-full rounded-lg shadow-lg"  
            />
         </div>

         {/* right side */}
         <div className="flex-1 flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg shadow-lg space-y-2">
            <div className="bg-gray-300 p-4 w-32 text-center rounded-4xl">save</div>
            <Link href="/create/upload" className="bg-amber-300 p-4 w-32 text-center rounded-4xl">upload</Link>
         </div>
      </div>
   )
}
