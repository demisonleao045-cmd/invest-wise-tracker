import { prisma } from "./prisma";

export async function recomputeHolding(assetId: string) {
  const txs = await prisma.transaction.findMany({
    where: { assetId },
    orderBy: { date: "asc" },
  });

  let qty = 0;
  let avg = 0;

  for (const tx of txs) {
    if (tx.kind === "BUY") {
      const newQty = qty + tx.quantity;
      if (newQty <= 0) continue;
      avg = (avg * qty + tx.price * tx.quantity) / newQty;
      qty = newQty;
    } else if (tx.kind === "SELL") {
      qty = Math.max(0, qty - tx.quantity);
    }
  }

  const holding = await prisma.holding.upsert({
    where: { assetId },
    create: { assetId, quantity: qty, avgPrice: avg, lastPrice: 0 },
    update: { quantity: qty, avgPrice: avg },
  });

  return holding;
}
