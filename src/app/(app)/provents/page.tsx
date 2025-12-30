"use client";

import { useEffect, useMemo, useState } from "react";

type Asset = { id: string; ticker: string };
type Holding = { quantity: number };
type AssetWithHolding = Asset & { holding?: Holding | null };

type Provent = {
  id: string;
  type: string;
  status: string;
  exDate?: string | null;
  payDate: string;
  valuePerShare: number;
  asset: Asset;
};

function brl(n: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
}

function ptType(t: string) {
  switch (t) {
    case "DIVIDEND":
      return "Dividendo";
    case "JCP":
      return "JCP";
    case "RENT":
      return "Rendimento";
    case "BONUS":
      return "Bonificação";
    default:
      return t;
  }
}
function ptStatus(s: string) {
  switch (s) {
    case "ESTIMATED":
      return "Estimado";
    case "CONFIRMED":
      return "Confirmado";
    case "PAID":
      return "Pago";
    default:
      return s;
  }
}

export default function ProventsPage() {
  const [assets, setAssets] = useState<AssetWithHolding[]>([]);
  const [items, setItems] = useState<Provent[]>([]);

  const [assetId, setAssetId] = useState("");
  const [type, setType] = useState("DIVIDEND");
  const [status, setStatus] = useState("ESTIMATED");
  const [exDate, setExDate] = useState("");
  const [payDate, setPayDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [valuePerShare, setValuePerShare] = useState("0.10");

  const [tab, setTab] = useState<"RECEBER" | "HIST">("RECEBER");

  async function refresh() {
    const aRes = await fetch("/api/assets");
    const aData = await aRes.json();
    setAssets(aData);

    const now = new Date();
    const from = new Date(now);
    const to = new Date(now);
    to.setDate(to.getDate() + 30);

    const q =
      tab === "RECEBER"
        ? `?status=CONFIRMED&from=${from.toISOString().slice(0, 10)}&to=${to.toISOString().slice(0, 10)}`
        : "";

    const pRes = await fetch("/api/provents" + q);
    setItems(await pRes.json());
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const holdingByAssetId = useMemo(() => {
    const map = new Map<string, number>();
    for (const a of assets) map.set(a.id, a.holding?.quantity ?? 0);
    return map;
  }, [assets]);

  const rows = useMemo(() => {
    return items.map((p) => {
      const qty = holdingByAssetId.get(p.asset.id) ?? 0;
      const total = qty * p.valuePerShare;
      return { ...p, qty, total };
    });
  }, [items, holdingByAssetId]);

  const totalReceber = useMemo(() => rows.reduce((acc: number, r: any) => acc + r.total, 0), [rows]);

  async function addProvent() {
    if (!assetId) return alert("Selecione o ativo.");

    const res = await fetch("/api/provents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assetId,
        type,
        status,
        exDate: exDate ? new Date(exDate).toISOString() : null,
        payDate: new Date(payDate).toISOString(),
        valuePerShare: Number(valuePerShare.replace(",", ".")),
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error ?? "Erro ao salvar provento.");
      return;
    }

    await refresh();
  }

  return (
    <main className="mx-auto max-w-6xl p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Proventos</h1>
        <p className="text-sm text-gray-600">Cadastre dividendos/JCP/rendimentos e veja o total estimado.</p>
      </header>

      <div className="mb-3 flex gap-2">
        <button
          onClick={() => setTab("RECEBER")}
          className={`rounded-xl px-3 py-2 text-sm ring-1 ${
            tab === "RECEBER" ? "bg-gray-900 text-white ring-gray-900" : "bg-white ring-gray-200"
          }`}
        >
          A receber (30 dias)
        </button>
        <button
          onClick={() => setTab("HIST")}
          className={`rounded-xl px-3 py-2 text-sm ring-1 ${
            tab === "HIST" ? "bg-gray-900 text-white ring-gray-900" : "bg-white ring-gray-200"
          }`}
        >
          Histórico (todos)
        </button>
      </div>

      <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-6">
          <select
            value={assetId}
            onChange={(e) => setAssetId(e.target.value)}
            className="rounded-xl border px-3 py-2 text-sm sm:col-span-2"
          >
            <option value="">Selecione o ativo</option>
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.ticker}
              </option>
            ))}
          </select>

          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-xl border px-3 py-2 text-sm">
            <option value="DIVIDEND">Dividendo</option>
            <option value="JCP">JCP</option>
            <option value="RENT">Rendimento</option>
            <option value="BONUS">Bonificação</option>
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border px-3 py-2 text-sm">
            <option value="ESTIMATED">Estimado</option>
            <option value="CONFIRMED">Confirmado</option>
            <option value="PAID">Pago</option>
          </select>

          <input type="date" value={exDate} onChange={(e) => setExDate(e.target.value)} className="rounded-xl border px-3 py-2 text-sm" />
          <input type="date" value={payDate} onChange={(e) => setPayDate(e.target.value)} className="rounded-xl border px-3 py-2 text-sm" />

          <input
            value={valuePerShare}
            onChange={(e) => setValuePerShare(e.target.value)}
            placeholder="Valor por cota"
            className="rounded-xl border px-3 py-2 text-sm"
            inputMode="decimal"
          />

          <button
            onClick={addProvent}
            className="sm:col-span-6 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Salvar provento
          </button>
        </div>
      </section>

      <div className="h-4" />

      {tab === "RECEBER" && (
        <section className="mb-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
          <div className="text-sm text-gray-600">Total estimado a receber (30 dias)</div>
          <div className="text-2xl font-semibold">{brl(totalReceber)}</div>
          <div className="mt-1 text-xs text-gray-500">(Baseado na quantidade atual dos seus ativos.)</div>
        </section>
      )}

      <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Pagamento</th>
                <th className="px-4 py-3 text-left">Ativo</th>
                <th className="px-4 py-3 text-left">Tipo</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Valor/cota</th>
                <th className="px-4 py-3 text-right">Qtd</th>
                <th className="px-4 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-gray-500" colSpan={7}>
                    Sem proventos.
                  </td>
                </tr>
              ) : (
                rows.map((r: any) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-3">{new Date(r.payDate).toLocaleDateString("pt-BR")}</td>
                    <td className="px-4 py-3 font-medium">{r.asset.ticker}</td>
                    <td className="px-4 py-3">{ptType(r.type)}</td>
                    <td className="px-4 py-3">{ptStatus(r.status)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{brl(r.valuePerShare)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{Number(r.qty).toFixed(4)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{brl(r.total)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
