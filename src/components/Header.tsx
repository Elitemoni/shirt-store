import React from 'react'
import Image from 'next/image'

export default function Header() {
   return (
      <div>
         <Image
            src="public/shirt_logo.jpeg"
            alt="Logo"
            width={100}
            height={100}
            className="absolute top-0 left-0 z-10"  
         />
         <button>Store</button>
         <button>Cart</button>
         <button>Sign-In</button>
      </div>
   )
}
