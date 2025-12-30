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
    {/* Onboarding */}
      <OnboardingModal hasAssets={assets.length > 0} />

    <main className="mx-auto max-w-6xl p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-600">Visão geral da carteira (MVP).</p>
      </header>

      <section className="mt-4 grid gap-2 sm:grid-cols-3">
        <a href="/assets" className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200 hover:ring-gray-300">
          <div className="font-semibold">Ações rápidas</div>
          <div className="mt-1 text-sm text-muted">Adicionar ativos</div>
        </a>
        <a href="/transactions" className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200 hover:ring-gray-300">
          <div className="font-semibold">Transações</div>
          <div className="mt-1 text-sm text-muted">Registrar compra/venda</div>
        </a>
        <a href="/provents" className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200 hover:ring-gray-300">
          <div className="font-semibold">Proventos</div>
          <div className="mt-1 text-sm text-muted">Cadastrar dividendos</div>
        </a>
      </section>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Patrimônio atual" value={brl(totals.value)} />
        <Card title="Custo (base)" value={brl(totals.cost)} />
        <Card
          title="Retorno"
          value={brl(totals.pnl)}
          valueClass={totals.pnl >= 0 ? "text-emerald-700" : "text-red-700"}
          subtitle={totals.cost > 0 ? `${(totals.pnlPct * 100).toFixed(2)}%` : "—"}
        />
        <Card title="A receber (30 dias)" value={brl(proventsTotal)} />
      </div>

      <div className="h-4" />

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
          <h2 className="text-lg font-semibold">Top posições</h2>
          <p className="text-sm text-gray-600">Maiores valores por ativo (preço atual manual).</p>

          <div className="mt-3 space-y-2">
            {topPositions.length === 0 ? (
              <div className="text-sm text-gray-500">Sem posições com valor ainda.</div>
            ) : (
              topPositions.map((p) => (
                <div key={p.ticker} className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2">
                  <div className="font-medium">{p.ticker}</div>
                  <div className="tabular-nums">{brl(p.value)}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
          <h2 className="text-lg font-semibold">Próximos proventos</h2>
          <p className="text-sm text-gray-600">Confirmados nos próximos 30 dias.</p>

          <div className="mt-3 space-y-2">
            {provents.length === 0 ? (
              <div className="text-sm text-gray-500">Nada confirmado para os próximos 30 dias.</div>
            ) : (
              provents.slice(0, 8).map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2">
                  <div>
                    <div className="font-medium">{p.asset.ticker}</div>
                    <div className="text-xs text-gray-600">
                      Pagamento: {new Date(p.payDate).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                  <div className="tabular-nums">{brl(p.valuePerShare)}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Card({
  title,
  value,
  subtitle,
  valueClass = "",
}: {
  title: string;
  value: string;
  subtitle?: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
      <div className="text-sm text-gray-600">{title}</div>
      <div className={`mt-1 text-2xl font-semibold ${valueClass}`}>{value}</div>
      {subtitle ? <div className="mt-1 text-xs text-gray-500">{subtitle}</div> : null}
    </div>
  );
}
