import Link from "next/link";

export default function ProPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Plano Pro (em breve)</h1>
      <p className="mt-3 text-gray-600 max-w-2xl">
        O InvestWise Tracker já funciona 100% no plano gratuito. O Plano Pro vai liberar automações e recursos avançados
        (sem complicar).
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="text-xl font-semibold">Gratuito</h2>
          <div className="mt-2 text-2xl font-bold">R$ 0</div>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li>✔ Carteira completa</li>
            <li>✔ Compras/vendas</li>
            <li>✔ Proventos e “A receber (30 dias)”</li>
            <li>✔ Comparador simples</li>
            <li>✔ Exportação</li>
          </ul>
          <Link href="/dashboard" className="mt-6 inline-block w-full rounded-xl bg-brand px-4 py-2 text-white text-center font-medium hover:opacity-95">
            Usar grátis
          </Link>
        </div>

        <div className="rounded-2xl bg-gray-900 p-6 text-white shadow-sm">
          <h2 className="text-xl font-semibold">Pro</h2>
          <div className="mt-2 text-2xl font-bold">R$ 19,90/mês</div>
          <p className="mt-2 text-sm text-white/80">Pagamento via Mercado Pago (Brasil).</p>

          <ul className="mt-4 space-y-2 text-sm">
            <li>✔ Backup na nuvem</li>
            <li>✔ Acesso em múltiplos dispositivos</li>
            <li>✔ Alertas (dividendos e metas)</li>
            <li>✔ Importação automática de preços (opcional)</li>
            <li>✔ Relatórios avançados</li>
          </ul>

          <div className="mt-6 rounded-xl bg-white/10 p-4 text-sm">
            <div className="font-semibold">Status:</div>
            <div className="text-white/80">Em preparação. Vamos ativar depois que você testar e ajustar o MVP.</div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Link href="/" className="text-sm text-brand hover:underline">← Voltar para a página inicial</Link>
      </div>
    </main>
  );
}
