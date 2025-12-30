import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  await prisma.provent.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.holding.deleteMany();
  await prisma.asset.deleteMany();

  const itub = await prisma.asset.create({
    data: {
      ticker: "ITUB4",
      name: "Itaú Unibanco",
      type: "STOCK",
      holding: { create: { quantity: 100, avgPrice: 24, lastPrice: 30 } },
    },
  });

  const hglg = await prisma.asset.create({
    data: {
      ticker: "HGLG11",
      name: "CSHG Logística",
      type: "FII",
      holding: { create: { quantity: 50, avgPrice: 150, lastPrice: 165 } },
    },
  });

  await prisma.provent.createMany({
    data: [
      {
        assetId: itub.id,
        type: "DIVIDEND",
        status: "CONFIRMED",
        payDate: new Date(Date.now() + 10 * 86400000),
        valuePerShare: 0.45,
      },
      {
        assetId: hglg.id,
        type: "RENT",
        status: "CONFIRMED",
        payDate: new Date(Date.now() + 15 * 86400000),
        valuePerShare: 1.1,
      },
    ],
  });

  return NextResponse.json({ ok: true });
}
