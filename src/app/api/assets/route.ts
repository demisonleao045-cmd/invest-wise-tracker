import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const assets = await prisma.asset.findMany({
    orderBy: { ticker: "asc" },
    include: { holding: true },
  });
  return NextResponse.json(assets);
}

export async function POST(req: Request) {
  const body = await req.json();
  const ticker = String(body.ticker ?? "").trim().toUpperCase();
  const type = String(body.type ?? "STOCK").trim().toUpperCase();
  const name = body.name ? String(body.name).trim() : null;

  if (!ticker) {
    return NextResponse.json({ error: "Ticker é obrigatório." }, { status: 400 });
  }

  const asset = await prisma.asset.create({
    data: {
      ticker,
      type,
      name: name ?? undefined,
      holding: { create: { quantity: 0, avgPrice: 0, lastPrice: 0 } },
    },
    include: { holding: true },
  });

  return NextResponse.json(asset);
}
