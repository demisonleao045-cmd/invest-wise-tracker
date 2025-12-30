import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function csvEscape(v: any) {
  const s = String(v ?? "");
  if (s.includes(",") || s.includes("\n") || s.includes('"')) {
    return `"${s.replaceAll('"', '""')}"`;
  }
  return s;
}

function toCSV(headers: string[], rows: any[][]) {
  const head = headers.map(csvEscape).join(",");
  const body = rows.map(r => r.map(csvEscape).join(",")).join("\n");
  return `${head}\n${body}\n`;
}

export async function GET() {
  const assets = await prisma.asset.findMany({ include: { holding: true } });
  const txs = await prisma.transaction.findMany({ include: { asset: true }, orderBy: { date: "asc" } });
  const prov = await prisma.provent.findMany({ include: { asset: true }, orderBy: { payDate: "asc" } });

  const assetsCSV = toCSV(
    ["ticker", "name", "type", "quantity", "avgPrice", "lastPrice"],
    assets.map(a => [a.ticker, a.name ?? "", a.type, a.holding?.quantity ?? 0, a.holding?.avgPrice ?? 0, a.holding?.lastPrice ?? 0])
  );

  const txCSV = toCSV(
    ["date", "ticker", "kind", "quantity", "price"],
    txs.map(t => [t.date.toISOString(), t.asset.ticker, t.kind, t.quantity, t.price])
  );

  const provCSV = toCSV(
    ["payDate", "exDate", "ticker", "type", "status", "valuePerShare"],
    prov.map(p => [p.payDate.toISOString(), p.exDate ? p.exDate.toISOString() : "", p.asset.ticker, p.type, p.status, p.valuePerShare])
  );

  const merged =
    `# assets.csv\n${assetsCSV}\n` +
    `# transactions.csv\n${txCSV}\n` +
    `# provents.csv\n${provCSV}\n`;

  return new NextResponse(merged, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="investwise_export.txt"`,
    },
  });
}
