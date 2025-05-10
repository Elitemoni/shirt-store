// app/api/products/create/route.js (for Next.js 13/14 with app router)
import stripe from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req) {
   console.log('>> Inside POST /api/products/create')

   const { name, unit_amount, currency } = await req.json()
   let product, price

   try {
      // Step 1: Create the product on Stripe
      product = await stripe.products.create({
         name,
         //description,
      });
      console.log('>> Product created:', product)
   } catch (error) {
      console.error(">> stripe route error: ", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
   }

   try {
      // Step 2: Create a price for the product
      price = await stripe.prices.create({
         product: product.id,
         unit_amount: unit_amount, // amount in cents
         currency: currency || 'usd',
      });
      console.log('>> Price created:', price)
   } catch (error) {
      console.error(">> stripe route error: ", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
   }

   // Step 3: Save price.id (price_id) to your database

   return NextResponse.json({
      success: true,
      productId: product.id,
      priceId: price.id,
   });
}
