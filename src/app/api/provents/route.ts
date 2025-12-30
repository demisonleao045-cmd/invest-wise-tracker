import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");

  const where: any = {};
  if (status) where.status = status;

  if (from || to) {
    where.payDate = {};
    if (from) where.payDate.gte = new Date(from);
    if (to) where.payDate.lte = new Date(to);
  }

  const items = await prisma.provent.findMany({
    where,
    orderBy: { payDate: "asc" },
    include: { asset: true },
  });

  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const body = await req.json();

  const assetId = String(body.assetId ?? "");
  const type = String(body.type ?? "DIVIDEND").toUpperCase();
  const status = String(body.status ?? "ESTIMATED").toUpperCase();

  const exDate = body.exDate ? new Date(body.exDate) : null;
  const payDate = body.payDate ? new Date(body.payDate) : null;
  const valuePerShare = Number(body.valuePerShare);

  if (!assetId) return NextResponse.json({ error: "assetId é obrigatório." }, { status: 400 });
  if (!payDate || Number.isNaN(payDate.getTime()))
    return NextResponse.json({ error: "Data de pagamento inválida." }, { status: 400 });
  if (!Number.isFinite(valuePerShare) || valuePerShare < 0)
    return NextResponse.json({ error: "Valor por cota inválido." }, { status: 400 });

  const item = await prisma.provent.create({
    data: {
      assetId,
      type,
      status,
      exDate: exDate ?? undefined,
      payDate,
      valuePerShare,
    },
    include: { asset: true },
  });

  return NextResponse.json(item);
}
