"use client";

import { useEffect, useMemo, useState } from "react";
import { OnboardingModal } from "@/components/OnboardingModal";

type Asset = {
  id: string;
  ticker: string;
  holding?: { quantity: number; avgPrice: number; lastPrice: number } | null;
};

type Provent = {
  id: string;
  payDate: string;
  valuePerShare: number;
  status: string;
  asset: { id: string; ticker: string };
};

function brl(n: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
}

export default function DashboardPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [provents, setProvents] = useState<Provent[]>([]);

  async function refresh() {
    const aRes = await fetch("/api/assets");
    setAssets(await aRes.json());

    const now = new Date();
    const to = new Date(now);
    to.setDate(to.getDate() + 30);

    const pRes = await fetch(
      `/api/provents?status=CONFIRMED&from=${now.toISOString().slice(0, 10)}&to=${to.toISOString().slice(0, 10)}`
    );
    setProvents(await pRes.json());
  }

  useEffect(() => {
    refresh();
  }, []);

  const totals = useMemo(() => {
    let cost = 0;
    let value = 0;

    for (const a of assets) {
      const h = a.holding ?? { quantity: 0, avgPrice: 0, lastPrice: 0 };
      cost += h.quantity * h.avgPrice;
      value += h.quantity * h.lastPrice;
    }

    const pnl = value - cost;
    const pnlPct = cost > 0 ? pnl / cost : 0;

    return { cost, value, pnl, pnlPct };
  }, [assets]);

  const proventsTotal = useMemo(() => {
    const qtyByAsset = new Map<string, number>();
    for (const a of assets) qtyByAsset.set(a.id, a.holding?.quantity ?? 0);

    return provents.reduce((acc, p) => {
      const qty = qtyByAsset.get(p.asset.id) ?? 0;
      return acc + qty * p.valuePerShare;
    }, 0);
  }, [assets, provents]);

  const topPositions = useMemo(() => {
    const list = assets
      .map((a) => {
        const h = a.holding ?? { quantity: 0, avgPrice: 0, lastPrice: 0 };
        const value = h.quantity * h.lastPrice;
        return { ticker: a.ticker, value };
      })
      .filter((x) => x.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return list;
  }, [assets]);

  return (
  <>
    {/* Onboarding */}
    <OnboardingModal hasAssets={assets.length > 0} />

    <main className="mx-auto max-w-6xl p-4">
      ...
    </main>
  </>
); 
}