export const runtime = 'nodejs'

import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!,
  { apiVersion: '2025-06-30.basil' }  // kütüphanenizin StripeConfig tipinin izin verdiği versiyon
)

export async function POST(request: Request) {
  const { items } = await request.json() as {
    items: { name: string; price: number; quantity: number }[]
  }

  // Başarılı ve iptal redirect URL’leri
  const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const success_url = `${origin}/checkout/success`
  const cancel_url  = `${origin}/checkout/cancel`

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'try',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url,
    cancel_url,
  })

  return NextResponse.json({ url: session.url })
}
