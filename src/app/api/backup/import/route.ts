import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Backup = {
  version: number;
  assets: Array<{
    ticker: string;
    name: string | null;
    type: string;
    holding: null | { quantity: number; avgPrice: number; lastPrice: number;
 };
  }>;
  transactions: Array<{
    ticker: string | null;
    kind: string;
    quantity: number;
    price: number;
    date: string | null;
  }>;
  provents: Array<{
    ticker: string | null;
    type: string;
    status: string;
    exDate: string | null;
    payDate: string | null;
    valuePerShare: number;
  }>;
};

export async function POST(req: Request) {
  const body = (await req.json()) as Backup;

  if (!body || body.version !== 1 || !Array.isArray(body.assets)) {
    return NextResponse.json({ error: "Backup inválido." }, { status: 400 });
  }

  // Wipe current data (single-user MVP)
  await prisma.provent.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.holding.deleteMany();
  await prisma.asset.deleteMany();

  // Recreate
  const idByTicker = new Map<string, string>();

  for (const a of body.assets) {
  const ticker = String(a.ticker ?? "").trim().toUpperCase();
  if (!ticker) continue;

  const asset = await prisma.asset.create({
    data: {
      ticker,
      name: a.name ?? ticker,
      type: String(a.type ?? "STOCK").toUpperCase(),
    },
  });

  if (a.holding) {
    await prisma.holding.create({
      data: {
        assetId: asset.id,
        quantity: Number(a.holding.quantity ?? 0),
        avgPrice: Number(a.holding.avgPrice ?? 0),
        lastPrice: Number(a.holding.lastPrice ?? 0),
      },
    });
  }
}


  for (const t of body.transactions ?? []) {
    const ticker = (t.ticker ?? "").toString().trim().toUpperCase();
    const assetId = idByTicker.get(ticker);
    if (!assetId) continue;

    await prisma.transaction.create({
      data: {
        assetId,
        kind: String(t.kind ?? "BUY").toUpperCase(),
        quantity: Number(t.quantity ?? 0),
        price: Number(t.price ?? 0),
        date: t.date ? new Date(t.date) : new Date(),
      },
    });
  }

  for (const p of body.provents ?? []) {
    const ticker = (p.ticker ?? "").toString().trim().toUpperCase();
    const assetId = idByTicker.get(ticker);
    if (!assetId) continue;

    await prisma.provent.create({
      data: {
        assetId,
        type: String(p.type ?? "DIVIDEND").toUpperCase(),
        status: String(p.status ?? "ESTIMATED").toUpperCase(),
        exDate: p.exDate ? new Date(p.exDate) : null,
        payDate: p.payDate ? new Date(p.payDate) : new Date(),
        valuePerShare: Number(p.valuePerShare ?? 0),
      },
    });
  }

  return NextResponse.json({ ok: true });
}
