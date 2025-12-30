"use client";

import { useEffect, useMemo, useState } from "react";

type Asset = {
  id: string;
  ticker: string;
  type: string;
  holding?: {
    quantity: number;
    avgPrice: number;
    lastPrice: number;
  } | null;
};

function brl(n: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
}

export default function ComparePage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/assets");
      setAssets(await res.json());
    })();
  }, []);

  const selected = useMemo(() => assets.filter((a) => selectedIds.includes(a.id)), [assets, selectedIds]);

  function toggle(id: string) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <main className="mx-auto max-w-6xl p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Comparador</h1>
        <p className="text-sm text-gray-600">Comparação básica (MVP gratuito).</p>
      </header>

      <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
        <div className="text-sm font-medium mb-2">Selecione ativos</div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {assets.map((a) => {
            const active = selectedIds.includes(a.id);
            return (
              <button
                key={a.id}
                onClick={() => toggle(a.id)}
                className={`rounded-xl px-3 py-2 text-sm ring-1 transition text-left ${
                  active ? "bg-gray-900 text-white ring-gray-900" : "bg-white ring-gray-200 hover:ring-gray-300"
                }`}
              >
                <div className="font-semibold">{a.ticker}</div>
                <div className={`text-xs ${active ? "text-white/80" : "text-gray-600"}`}>{a.type}</div>
              </button>
            );
          })}
        </div>
      </section>

      <div className="h-4" />

      <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Ativo</th>
                <th className="px-4 py-3 text-right">Qtd</th>
                <th className="px-4 py-3 text-right">Preço médio</th>
                <th className="px-4 py-3 text-right">Preço atual</th>
                <th className="px-4 py-3 text-right">Custo</th>
                <th className="px-4 py-3 text-right">Valor atual</th>
                <th className="px-4 py-3 text-right">Retorno</th>
              </tr>
            </thead>
            <tbody>
              {selected.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-gray-500" colSpan={7}>
                    Selecione um ou mais ativos acima.
                  </td>
                </tr>
              ) : (
                selected.map((a) => {
                  const h = a.holding ?? { quantity: 0, avgPrice: 0, lastPrice: 0 };
                  const cost = h.quantity * h.avgPrice;
                  const value = h.quantity * h.lastPrice;
                  const pnl = value - cost;

                  return (
                    <tr key={a.id} className="border-t">
                      <td className="px-4 py-3 font-medium">{a.ticker}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{h.quantity.toFixed(4)}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{brl(h.avgPrice)}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{brl(h.lastPrice)}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{brl(cost)}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{brl(value)}</td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        <span className={pnl >= 0 ? "text-emerald-700" : "text-red-700"}>{brl(pnl)}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
