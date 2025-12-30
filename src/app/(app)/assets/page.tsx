"use client";

import { useEffect, useMemo, useState } from "react";

type Asset = {
  id: string;
  ticker: string;
  name?: string | null;
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

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  const [ticker, setTicker] = useState("");
  const [type, setType] = useState("STOCK");
  const [name, setName] = useState("");

  const [q, setQ] = useState("");

  async function refresh() {
    setLoading(true);
    const res = await fetch("/api/assets");
    const data = await res.json();
    setAssets(data);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    const qq = q.trim().toUpperCase();
    if (!qq) return assets;
    return assets.filter((a) => a.ticker.includes(qq) || (a.name ?? "").toUpperCase().includes(qq));
  }, [assets, q]);

  async function addAsset() {
    const res = await fetch("/api/assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticker, type, name }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error ?? "Erro ao criar ativo.");
      return;
    }
    setTicker("");
    setName("");
    await refresh();
  }

  async function updatePrice(assetId: string, lastPrice: number) {
    const res = await fetch(`/api/assets/${assetId}/price`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lastPrice }),
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error ?? "Erro ao atualizar preço.");
      return;
    }
    await refresh();
  }

  return (
    <main className="mx-auto max-w-6xl p-4">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Meus Ativos</h1>
          <p className="text-sm text-gray-600">Carteira em R$ — preço atual manual no MVP.</p>
        </div>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar ticker ou nome…"
          className="w-full sm:w-72 rounded-xl border bg-white px-3 py-2 text-sm"
        />
      </div>

      <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          <input
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="Ticker (ex: ITUB4)"
            className="rounded-xl border px-3 py-2 text-sm"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome (opcional)"
            className="rounded-xl border px-3 py-2 text-sm"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-xl border px-3 py-2 text-sm"
          >
            <option value="STOCK">Ação</option>
            <option value="FII">FII</option>
            <option value="ETF">ETF</option>
            <option value="BDR">BDR</option>
            <option value="CRYPTO">Cripto</option>
          </select>

          <button
            onClick={addAsset}
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Adicionar ativo
          </button>
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
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-gray-500" colSpan={7}>
                    Carregando…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-gray-500" colSpan={7}>
                    Nenhum ativo ainda.
                  </td>
                </tr>
              ) : (
                filtered.map((a) => {
                  const h = a.holding ?? { quantity: 0, avgPrice: 0, lastPrice: 0 };
                  const cost = h.quantity * h.avgPrice;
                  const value = h.quantity * h.lastPrice;
                  const pnl = value - cost;

                  return (
                    <tr key={a.id} className="border-t">
                      <td className="px-4 py-3">
                        <div className="font-medium">{a.ticker}</div>
                        <div className="text-xs text-gray-500">{a.name ?? a.type}</div>
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">{h.quantity.toFixed(4)}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{brl(h.avgPrice)}</td>
                      <td className="px-4 py-3 text-right">
                        <PriceEditor value={h.lastPrice} onSave={(v) => updatePrice(a.id, v)} />
                      </td>
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

function PriceEditor({ value, onSave }: { value: number; onSave: (v: number) => void }) {
  const [editing, setEditing] = useState(false);
  const [v, setV] = useState(String(value ?? 0));

  if (!editing) {
    return (
      <button
        onClick={() => {
          setV(String(value ?? 0));
          setEditing(true);
        }}
        className="rounded-lg px-2 py-1 text-right tabular-nums hover:bg-gray-50"
        title="Clique para editar"
      >
        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value ?? 0)}
      </button>
    );
  }

  return (
    <div className="flex justify-end gap-2">
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        className="w-24 rounded-lg border px-2 py-1 text-right tabular-nums"
        inputMode="decimal"
      />
      <button
        onClick={() => {
          const num = Number(v.replace(",", "."));
          if (!Number.isFinite(num) || num < 0) return alert("Preço inválido.");
          onSave(num);
          setEditing(false);
        }}
        className="rounded-lg bg-gray-900 px-2 py-1 text-white"
      >
        OK
      </button>
      <button onClick={() => setEditing(false)} className="rounded-lg px-2 py-1 hover:bg-gray-50">
        X
      </button>
    </div>
  );
}
