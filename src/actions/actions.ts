"use server"

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { checkAuthentication } from '@/lib/server-utils'
import Stripe from 'stripe'

//import FormData from 'form-data';
import fetch from 'node-fetch';
import { Buffer } from 'buffer';

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

/*
TODO:
I have to push the product onto stripe and get it's price_id
*/
/*
{ 
   name: string, 
   design_url: string, 
   price: number, 
   style_type: string, 
   shirt_type: string,
}
*/
export async function uploadShirt(formData: FormData, priceId: string) {
   console.log(">> Inside uploadShirt: \n", formData, "\n", priceId)
   const { isAuthenticated, getUser } = getKindeServerSession()
   const isLoggedIn = await isAuthenticated()
   const user = await getUser()
   
   if (!user) {
      redirect('/login')
   }

   const userId = user.id

   // Check if the user is authenticated
   if (!isLoggedIn) {
      throw new Error('User not authenticated')
   }

   const data = {
      name: formData.get('name') as string,
      design_url: formData.get("design_url") as string,
      price: parseInt(formData.get("price") as string),
      style_type: formData.get("style_type") as string,
      shirt_type: formData.get("shirt_type") as string,
      price_id: priceId,
   }
   
   console.log("form data:\n", formData)

   const shirt = await prisma.shirt.create({
      data: {
         account_id: userId,
         uploaded: true,
         name: data.name,
         design_url: data.design_url,
         style_type: data.style_type,
         shirt_type: data.shirt_type,
         price: data.price,
         price_id: data.price_id,
      }
   })
   
   return shirt
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
