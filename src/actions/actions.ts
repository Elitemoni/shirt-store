"use server"

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Stripe from "stripe"
import { redirect } from 'next/navigation'
import { checkAuthentication } from '@/lib/server-utils'

export async function addToCart(itemId: number) {
   const { isAuthenticated, getUser } = getKindeServerSession()
   const isLoggedIn = await isAuthenticated()
   const user = await getUser()

   if (!user) {
      redirect('/login')
   }

   const shirt = await prisma.shirt.findUnique({
      where: { id: itemId },
   })

   if (!shirt) {
      throw new Error('Shirt not found')
   }

   // Check if the item is already in the cart
   const existingItem = await prisma.cart.findFirst({
      where: {
         account_id: user.id,
         item_id: itemId,
      },
   })

   //if ()

   const orderItem = await prisma.cart.create({
      data: {
         account_id: user.id,
         item_id: itemId,
         quantity: 1,
         price: shirt.price,
      },
   })

   revalidatePath('/store/cart')
}