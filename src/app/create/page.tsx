"use server"

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import UploadShirtForm from '@/components/UploadShirtForm'

//import { uploadShirt } from '@/actions/actions'

export default async function page() {
   const templateImage = "https://ik.imagekit.io/ZephyrShard/shirt-store/shirt-template.png?updatedAt=1746661487049"

   return (
      <div className="flex items-center justify-around h-128 w-full">

         {/* left side */}
         <div className="flex-1 flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg shadow-lg h-full">
            {/* template download */}
            <div className="flex flex-col items-center justify-center bg-gray-300 p-4 w-full text-center rounded-4xl space-y-2">
               <div>
                  Draw on this Shirt
               </div>
               <Image
                  src={templateImage}
                  alt="Shirt Template"
                  width={256}
                  height={128}
                  className="flex-1 h-full rounded-lg shadow-lg"
               />
               <Link download href={templateImage} className="bg-blue-400 hover:bg-blue-600 p-4 w-32 text-center rounded-4xl">
                  Download
               </Link>
            </div>
         </div>

         {/* right side */}
         <UploadShirtForm />

      </div>
   )
}
