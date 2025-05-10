import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import stripe from '@/lib/stripe'
import { getCartItems } from '@/actions/actions'

export async function POST() {
	try {
		const headersList = await headers()
		const origin = headersList.get('origin')
		const cartItems = await getCartItems()

		if (!cartItems) {
			return NextResponse.json(
				{ error: 'No items in cart' },
				{ status: 400 }
			)
		}

		// Create a Checkout Session with the cart items
		const line_items = cartItems.map((item) => {
			return {
				price: item.shirt.price_id,
				quantity: item.quantity,
			}
		})
		
		// Create Checkout Sessions from body params.
		const session = await stripe.checkout.sessions.create({
			line_items: line_items,
			mode: 'payment',
			success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/?canceled=true`,
		});
		return NextResponse.redirect(session.url, 303)
	} catch (err) {
		return NextResponse.json(
			{ error: err.message },
			{ status: err.statusCode || 500 }
		)
	}
}