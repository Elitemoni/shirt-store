import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import CartItems from '@/components/CartItems'
import { getCartItems } from '@/actions/actions'

export default async function page() {
   const cartItems = await getCartItems()

   return (
      <div className="flex items-center justify-center h-screen text-black font-bold w-full bg-gray-300">

         {/* left side */}
         <div className="flex flex-2 flex-col items-center justify-start bg-white w-1/2 h-11/12 space-y-2">

            {/* cart logo */}
            <div className="mt-4 text-8xl">🛒</div>

            <CartItems cart={cartItems} />

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
