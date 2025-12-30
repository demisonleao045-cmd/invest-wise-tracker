"use client";

import { useEffect, useState } from "react";

type Asset = { id: string; ticker: string };
type Tx = {
  id: string;
  date: string;
  kind: "BUY" | "SELL";
  quantity: number;
  price: number;
  asset: Asset;
};

function brl(n: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
}

export default function TransactionsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [txs, setTxs] = useState<Tx[]>([]);
  const [assetId, setAssetId] = useState("");
  const [kind, setKind] = useState<"BUY" | "SELL">("BUY");
  const [quantity, setQuantity] = useState("1");
  const [price, setPrice] = useState("10");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  async function refresh() {
    const [aRes, tRes] = await Promise.all([fetch("/api/assets"), fetch("/api/transactions")]);
    setAssets((await aRes.json()).map((x: any) => ({ id: x.id, ticker: x.ticker })));
    setTxs(await tRes.json());
  }

  useEffect(() => {
    refresh();
  }, []);

  async function addTx() {
    if (!assetId) return alert("Escolha um ativo.");

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assetId,
        kind,
        quantity: Number(quantity.replace(",", ".")),
        price: Number(price.replace(",", ".")),
        date: new Date(date).toISOString(),
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error ?? "Erro ao salvar transação.");
      return;
    }

    await refresh();
  }

  return (
    <main className="mx-auto max-w-6xl p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Transações</h1>
        <p className="text-sm text-gray-600">Compras/vendas atualizam sua carteira automaticamente.</p>
      </header>

      <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
          <select value={assetId} onChange={(e) => setAssetId(e.target.value)} className="rounded-xl border px-3 py-2 text-sm">
            <option value="">Selecione o ativo</option>
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.ticker}
              </option>
            ))}
          </select>

          <select value={kind} onChange={(e) => setKind(e.target.value as any)} className="rounded-xl border px-3 py-2 text-sm">
            <option value="BUY">Compra</option>
            <option value="SELL">Venda</option>
          </select>

          <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantidade" className="rounded-xl border px-3 py-2 text-sm" inputMode="decimal" />
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Preço" className="rounded-xl border px-3 py-2 text-sm" inputMode="decimal" />
          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="rounded-xl border px-3 py-2 text-sm" />

          <button onClick={addTx} className="sm:col-span-5 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
            Salvar transação
          </button>
        </div>
      </section>

      <div className="h-4" />

      <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Data</th>
                <th className="px-4 py-3 text-left">Ativo</th>
                <th className="px-4 py-3 text-left">Tipo</th>
                <th className="px-4 py-3 text-right">Qtd</th>
                <th className="px-4 py-3 text-right">Preço</th>
                <th className="px-4 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {txs.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-gray-500" colSpan={6}>
                    Sem transações ainda.
                  </td>
                </tr>
              ) : (
                txs.map((t) => {
                  const total = t.quantity * t.price;
                  return (
                    <tr key={t.id} className="border-t">
                      <td className="px-4 py-3">{new Date(t.date).toLocaleDateString("pt-BR")}</td>
                      <td className="px-4 py-3 font-medium">{t.asset.ticker}</td>
                      <td className="px-4 py-3">{t.kind === "BUY" ? "Compra" : "Venda"}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{t.quantity}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{brl(t.price)}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{brl(total)}</td>
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
