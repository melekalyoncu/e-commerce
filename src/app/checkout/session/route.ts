export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import Stripe from 'stripe';
import { NextResponse } from 'next/server';

type Item = { name: string; price: number; quantity: number };
type Body = { items?: unknown };

function parseItems(body: Body): Item[] {
  const list = body.items;
  if (!Array.isArray(list)) throw new Error('`items` dizisi bekleniyor');

  return list.map((v, i) => {
    if (typeof v !== 'object' || v === null) {
      throw new Error(`items[${i}] obje olmalı`);
    }
    const rec = v as Record<string, unknown>;
    const name = rec.name;
    const price = rec.price;
    const quantity = rec.quantity;

    if (typeof name !== 'string') throw new Error(`items[${i}].name string olmalı`);
    if (typeof price !== 'number') throw new Error(`items[${i}].price number olmalı`);
    if (typeof quantity !== 'number') throw new Error(`items[${i}].quantity number olmalı`);

    return { name, price, quantity };
  });
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: 'Server misconfig: STRIPE_SECRET_KEY yok' },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secret);

  let items: Item[];
  try {
    const raw: unknown = await request.json();
    if (typeof raw !== 'object' || raw === null) {
      return NextResponse.json({ error: 'Beklenen JSON obje değil' }, { status: 400 });
    }
    items = parseItems(raw as Body);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `Geçersiz istek: ${msg}` }, { status: 400 });
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
  const success_url = `${origin}/checkout/success`;
  const cancel_url = `${origin}/checkout/cancel`;

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

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('Stripe error:', e);
    return NextResponse.json({ error: `Ödeme başlatılamadı: ${msg}` }, { status: 500 });
  }
}
