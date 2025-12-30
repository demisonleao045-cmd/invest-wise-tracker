import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const assets = await prisma.asset.findMany({ include: { holding: true } });
  const transactions = await prisma.transaction.findMany({});
  const provents = await prisma.provent.findMany({});

  // Portable export: use ticker rather than assetId
  const tickerById = new Map<string, string>();
  for (const a of assets) tickerById.set(a.id, a.ticker);

  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    assets: assets.map((a) => ({
      ticker: a.ticker,
      name: a.name,
      type: a.type,
      holding: a.holding
        ? {
            quantity: a.holding.quantity,
            avgPrice: a.holding.avgPrice,
            currentPrice: a.holding.currentPrice,
          }
        : null,
    })),
    transactions: transactions.map((t) => ({
      ticker: tickerById.get(t.assetId) ?? null,
      kind: t.kind,
      quantity: t.quantity,
      price: t.price,
      date: t.date?.toISOString?.() ?? null,
      createdAt: t.createdAt?.toISOString?.() ?? null,
    })),
    provents: provents.map((p) => ({
      ticker: tickerById.get(p.assetId) ?? null,
      type: p.type,
      status: p.status,
      exDate: p.exDate?.toISOString?.() ?? null,
      payDate: p.payDate?.toISOString?.() ?? null,
      valuePerShare: p.valuePerShare,
      createdAt: p.createdAt?.toISOString?.() ?? null,
    })),
  };

  return NextResponse.json(payload, {
    headers: {
      "Content-Disposition": "attachment; filename=investwise-backup.json",
      "Cache-Control": "no-store",
    },
  });
}
