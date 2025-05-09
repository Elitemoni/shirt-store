"use server"

import React from 'react'
//import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import {RegisterLink, LoginLink, LogoutLink} from '@kinde-oss/kinde-auth-nextjs/components'
//import { checkAuthentication } from '@/lib/server-utils'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export default async function Header() {
   const { isAuthenticated, getUser } = getKindeServerSession()
   const isLoggedIn = await isAuthenticated()
   const user = await getUser()
   
   /* if (!(await isAuthenticated()) || !user) {
      return redirect("/api/auth/login")
   } */

   return (
      <div className="flex justify-center items-center bg-gray-800 text-black font-bold h-16">

         {/* Logo, Home Navigation */}
         <Link href="/" className="bg-gray-800 hover:bg-gray-600 hover:cursor-pointer flex items-center justify-center h-full">
            <Image
               src="https://ik.imagekit.io/ZephyrShard/shirt-store/shirt_logo.jpeg?updatedAt=1746660462234"
               alt="Logo"
               width={64}
               height={64}
               className="h-full hover:opacity-80 transition-opacity duration-100 ease-in-out"  
            />
         </Link>

         {/* Store Navigation */}
         <Link href="/store" className="bg-blue-400 hover:bg-blue-600 hover:cursor-pointer flex-6 flex items-center justify-center h-full">
            Store
         </Link>

         {/* Create Navigation */}
         <Link href="/create" className="bg-amber-300 hover:bg-amber-500 hover:cursor-pointer flex-4 flex items-center justify-center h-full">
            Create
         </Link>

         {/* Login/Register or Logout Navigation */}
         {isLoggedIn && user ? (
            <>
               <div className="text-white p-4">{user.email}</div>
               <LogoutLink className="bg-white hover:bg-gray-300 hover:cursor-pointer flex-1 flex items-center justify-center h-full">Logout</LogoutLink>
            </>
            ) : (
            <>
               <LoginLink className="bg-white hover:bg-gray-300 hover:cursor-pointer flex-1 flex items-center justify-center h-full">Login</LoginLink>
               <RegisterLink className="bg-white hover:bg-gray-300 hover:cursor-pointer flex-1 flex items-center justify-center h-full">Register</RegisterLink>
            </>
         )}
         
      </div>
   )
}

/*  
links don't work correctly, need to be fixed
*/