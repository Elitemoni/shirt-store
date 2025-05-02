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
         <Image
            src="/public/shirt_logo.jpeg"
            alt="Logo"
            width={1}
            height={1}
            className="flex-1 h-full rounded-lg shadow-lg"  
         />
         <Link href="/store" className="bg-blue-400 hover:bg-blue-600 hover:cursor-pointer flex-6 flex items-center justify-center h-full">
            Store
         </Link>
         <Link href="/create" className="bg-amber-300 hover:bg-amber-500 hover:cursor-pointer flex-4 flex items-center justify-center h-full">
            Create
         </Link>
         {
            isLoggedIn && user ? (
            <>
               <div className="text-white p-4">{user.email}</div>
               <LogoutLink className="bg-white hover:bg-gray-300 hover:cursor-pointer flex-1 flex items-center justify-center h-full">Logout</LogoutLink>
            </>
            ) : (
            <>
               <LoginLink className="bg-white hover:bg-gray-300 hover:cursor-pointer flex-1 flex items-center justify-center h-full">Login</LoginLink>
               <RegisterLink className="bg-white hover:bg-gray-300 hover:cursor-pointer flex-1 flex items-center justify-center h-full">Register</RegisterLink>
            </>
            )
         }
         
      </div>
   )
}

/*  
links don't work correctly, need to be fixed
*/