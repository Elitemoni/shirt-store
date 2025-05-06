"use server"

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Stripe from "stripe"
import { redirect } from 'next/navigation'
import { checkAuthentication } from '@/lib/server-utils'

export async function getShirts() {
   const shirts = await prisma.shirt.findMany({
      where: {
         uploaded: true,
      },
      orderBy: {
         id: 'desc',
      },
   })

   return shirts
}

export async function getCartItems() {
   const { isAuthenticated, getUser } = getKindeServerSession()
   const isLoggedIn = await isAuthenticated()
   const user = await getUser()

   if (!user) {
      redirect('/login')
   }

   const cartItems = await prisma.cart.findMany({
      where: {
         account_id: user.id,
      },
      include: {
         shirt: true,
      },
   })

   return cartItems
}

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
   const existingCartItem = await prisma.cart.findFirst({
      where: {
         item_id: shirt.id
      },
   })
   // Update the quantity of the existing item in the cart
   if (existingCartItem) {
      await prisma.cart.update({
         where: {
            item_id: shirt.id,
         }, 
         data: {
            quantity: existingCartItem.quantity + 1,
         }
      })
   // Add the item to the cart
   } else {
      await prisma.cart.create({
         data: {
            account_id: user.id,
            item_id: shirt.id,
            quantity: 1,
            price: shirt.price,
         },
      })
   }

   revalidatePath('/store/cart')
}

export async function subtractFromCart(itemId: number) {
   const { isAuthenticated, getUser } = getKindeServerSession()
   const isLoggedIn = await isAuthenticated()
   const user = await getUser()

   if (!user) {
      redirect('/login')
   }

   const cartItem = await prisma.cart.findUnique({
      where: { id: itemId }
   })

   if (!cartItem) {
      throw new Error('Cart item not found')
   }

   // Check the quantity of the item in the cart
   if (cartItem.quantity > 1) {
      await prisma.cart.update({
         where: { id: itemId },
         data: { quantity: cartItem.quantity - 1 },
      })
   } else {
      await prisma.cart.delete({
         where: { id: itemId }
      })
   }

   revalidatePath('/store/cart')
}