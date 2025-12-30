import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const lastPrice = Number(body.lastPrice);

  if (!Number.isFinite(lastPrice) || lastPrice < 0) {
    return NextResponse.json({ error: "Preço inválido." }, { status: 400 });
  }

  const holding = await prisma.holding.update({
    where: { assetId: params.id },
    data: { lastPrice },
    include: { asset: true },
  });

  return NextResponse.json(holding);
}
