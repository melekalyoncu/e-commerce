export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createUser } from "@/lib/mock-users";

type Body = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;     
  address?: string;   
  country?: string;   
  city?: string;      
  password?: string;
  confirm?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    const required = ["firstName","lastName","email","password","confirm"] as const;
    for (const k of required) {
      if (!body?.[k]) {
        return NextResponse.json({ error: `${k} gerekli` }, { status: 400 });
      }
    }
    if (body.password !== body.confirm) {
      return NextResponse.json({ error: "Şifreler eşleşmiyor" }, { status: 400 });
    }

    await createUser({
      firstName: body.firstName!,
      lastName: body.lastName!,
      email: body.email!,
      password: body.password!,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
