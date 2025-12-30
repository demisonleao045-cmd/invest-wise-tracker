import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { recomputeHolding } from "@/lib/portfolio";

export async function GET() {
  const txs = await prisma.transaction.findMany({
    orderBy: { date: "desc" },
    include: { asset: true },
  });
  return NextResponse.json(txs);
}

export async function POST(req: Request) {
  const body = await req.json();

  const assetId = String(body.assetId ?? "");
  const kind = String(body.kind ?? "BUY").toUpperCase();
  const quantity = Number(body.quantity);
  const price = Number(body.price);
  const date = body.date ? new Date(body.date) : new Date();

  if (!assetId) return NextResponse.json({ error: "assetId é obrigatório." }, { status: 400 });
  if (kind !== "BUY" && kind !== "SELL") return NextResponse.json({ error: "kind inválido." }, { status: 400 });
  if (!Number.isFinite(quantity) || quantity <= 0) return NextResponse.json({ error: "Quantidade inválida." }, { status: 400 });
  if (!Number.isFinite(price) || price < 0) return NextResponse.json({ error: "Preço inválido." }, { status: 400 });

  const tx = await prisma.transaction.create({
    data: { assetId, kind, quantity, price, date },
  });

  const holding = await recomputeHolding(assetId);

  return NextResponse.json({ tx, holding });
}
