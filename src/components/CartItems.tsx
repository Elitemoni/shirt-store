"use client"

import React from 'react'

import Image from 'next/image'

import { subtractFromCart } from '@/actions/actions'

export default function CartItems({ cart } : any) {
   console.log('data for 1st shirt', cart[0])
   const handleSubtractCart = async (itemId: number) => {
      await subtractFromCart(itemId)
   }

   return (
      <div>
         {/* items */}
         {cart.map((item : any, index : any) => (
            <div key={index} className="flex items-center justify-around w-full bg-gray-300 p-8 rounded-4xl shadow-lg">
               <Image src="/public/image/shirt_logo.jpeg" alt="Shirt Logo" width={100} height={100} className="rounded-lg shadow-lg mb-4" />
               <div className="flex flex-col">
                  <h2 className="text-lg font-bold mb-2">{item.shirt.name}</h2>
                  <p className="text-gray-700 mb-2">{item.shirt.price}</p>
                  <p className="text-gray-700 mb-2">{item.quantity}</p>
                  <p className="text-gray-700 mb-2">By William</p>
               </div>
               <div className="text-4xl">😉</div>
               <button className="bg-amber-300 hover:bg-amber-400 hover:cursor-pointer text-2xl p-4 rounded-4xl">Follow</button>
               <button onClick={() => handleSubtractCart(item.id)} className="bg-red-400 hover:bg-red-600 hover:cursor-pointer text-2xl w-16 h-16 rounded-2xl">X</button>
            </div>
         ))}
      </div>
   )
}
