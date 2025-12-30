import Link from "next/link";

export default function UpgradePage() {
  return (
    <main className="mx-auto max-w-6xl p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Plano Pro</h1>
        <p className="text-sm text-muted">
          O MVP está gratuito. O Pro vai liberar automações e recursos avançados quando você decidir monetizar (Mercado Pago).
        </p>
      </header>

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
          <h2 className="text-lg font-semibold">O que entra no Pro</h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li>✔ Backup na nuvem + multi-dispositivo</li>
            <li>✔ Alertas de dividendos e calendário</li>
            <li>✔ Importação automática de preços (opcional)</li>
            <li>✔ Relatórios avançados (renda mensal, yield, evolução)</li>
            <li>✔ Suporte prioritário</li>
          </ul>
          <div className="mt-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
            <div className="font-medium">Status</div>
            <div className="mt-1 text-gray-600">Em breve. Primeiro vamos consolidar o MVP com seus testes.</div>
          </div>
        </div>

        <div className="rounded-2xl bg-gray-900 p-4 shadow-sm text-white">
          <h2 className="text-lg font-semibold">Preço sugerido</h2>
          <div className="mt-2 text-3xl font-bold">R$ 19,90/mês</div>
          <div className="mt-1 text-sm text-white/80">ou R$ 199/ano</div>

          <div className="mt-4 text-sm text-white/85">
            Pagamento via <b>Mercado Pago</b> (Brasil). Integração será ativada depois.
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <Link href="/pro" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-900 text-center hover:bg-gray-100">
              Ver detalhes no site
            </Link>
            <Link href="/roadmap" className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white text-center hover:bg-white/15">
              Ver roadmap
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
