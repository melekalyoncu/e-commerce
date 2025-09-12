// app/api/checkout/session/route.ts
export const runtime = 'nodejs';

import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// 1) Secret key’in varlığını güvence altına al
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

// 2) Stripe örneğini oluştur
const stripe = new Stripe(stripeSecretKey, {
});

interface Item {
  name: string;
  price: number;
  quantity: number;
}

export async function POST(request: Request) {
  let items: Item[];

  // 3) JSON gövdesini parse et ve validate et
  try {
    const body = (await request.json()) as unknown;
    if (typeof body !== 'object' || body === null) {
      throw new Error('Beklenen JSON obje değil');
    }
    const data = body as Record<string, unknown>;
    const rawItems = data['items'];
    if (!Array.isArray(rawItems)) {
      throw new Error('`items` dizisi bekleniyor');
    }

    items = rawItems.map((raw, idx) => {
      if (typeof raw !== 'object' || raw === null) {
        throw new Error(`items[${idx}] obje olmalı`);
      }
      const entry = raw as Record<string, unknown>;

      const name = entry['name'];
      const price = entry['price'];
      const quantity = entry['quantity'];

      if (typeof name !== 'string') {
        throw new Error(`items[${idx}].name string olmalı`);
      }
      if (typeof price !== 'number') {
        throw new Error(`items[${idx}].price number olmalı`);
      }
      if (typeof quantity !== 'number') {
        throw new Error(`items[${idx}].quantity number olmalı`);
      }

      return { name, price, quantity };
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Geçersiz istek: ${msg}` },
      { status: 400 }
    );
  }

  // 4) Başarılı ve iptal URL’lerini hazırla
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const success_url = `${origin}/checkout/success`;
  const cancel_url = `${origin}/checkout/cancel`;

  // 5) Stripe Checkout oturumu oluştur
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
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
    });
    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error('Stripe error:', err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Ödeme başlatılamadı: ${message}` },
      { status: 500 }
    );
  }
}
