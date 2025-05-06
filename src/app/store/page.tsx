"use server"

import React from 'react'
//import { useState } from 'react';

import Image from 'next/image'
import Link from 'next/link'

import { addToCart, getShirts } from '@/actions/actions'
import StoreItems from '@/components/StoreItems'

type Shirt = {
   id: number
   account_id: number
   uploaded: boolean
   name: string
   design_url: string
   style_type: string
   shirt_type: string
   price: number
}

export default async function page() {
   //const [searchName, setSearchName] = useState('')
   let searchName = ''
   const data = await getShirts()

   /* const handleAddToCart = async (shirtId: number) => {
      // Call the addToCart action with the shirt ID
      await addToCart(shirtId)
   } */

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
            <StoreItems data={data} />
         </div>
      </div>
   )
}
