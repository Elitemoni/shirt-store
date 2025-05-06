"use client"

import React from 'react'
import { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { addToCart } from '@/actions/actions'
import { prisma } from '@/lib/db'

export default function StoreItems({ data } : any) {
   const [searchName, setSearchName] = useState('')

   const handleAddToCart = (shirtId: number) => {
      addToCart(shirtId)
   }

   return (
      <form onSubmit={(e) => e.preventDefault()}>

         {/* Search Bar */}
         <div className="flex items-center justify-center w-full mb-4">
            <input
               type="text"
               placeholder="Search..."
               className="border border-gray-300 rounded-lg p-4 w-full"
               onChange={(e) => setSearchName(e.target.value)}
            />

            <button className="bg-amber-300 hover:bg-amber-400 hover:cursor-pointer p-4 rounded-lg ml-2">
               <Link href="/store/cart">🛒</Link>
            </button>
         </div>

         {/* Items */}
         {data.map((shirt : any, index : any) => (
            data.length > 0 && shirt.name.toLowerCase().includes(searchName.toLowerCase()) && (
            <div key={index} className="flex items-center justify-around w-full bg-gray-300 p-8 rounded-4xl shadow-lg">
               <Image src="/public/image/shirt_logo.jpeg" alt="Shirt Logo" width={100} height={100} className="rounded-lg shadow-lg mb-4" />
               <div className="flex flex-col">
                  <h2 className="text-lg font-bold mb-2">{shirt.name}</h2>
                  <p className="text-gray-700 mb-2">{shirt.price}</p>
                  <p className="text-gray-700 mb-2">By William</p>
               </div>
               <div className="text-4xl">😉</div>
               <button onClick={() => handleAddToCart(shirt.id)} className="bg-green-400 hover:bg-green-600 hover:cursor-pointer select-none text-4xl w-16 h-16 rounded-4xl">+</button>
            </div>
         )))}

      </form>
      
   )
}
