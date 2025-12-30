import Link from "next/link";

export default function LandingPage() {
  return (
    <main>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Controle seus investimentos.
          <br />
          Viva de renda com clareza.
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Acompanhe ações, FIIs e dividendos em um só lugar. Simples, rápido e feito para investidores brasileiros.
        </p>

        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <Link
            href="/dashboard"
            className="rounded-xl bg-brand px-6 py-3 text-white font-medium hover:opacity-95"
          >
            Começar grátis agora
          </Link>
          <Link
            href="/pro"
            className="rounded-xl border border-gray-200 px-6 py-3 font-medium hover:bg-gray-50"
          >
            Ver plano Pro (em breve)
          </Link>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3 text-left">
          <Feature title="📊 Carteira clara" desc="Veja patrimônio, custo e retorno em segundos." />
          <Feature title="💰 Dividendos organizados" desc="Saiba quanto vai receber nos próximos 30 dias." />
          <Feature title="📱 Celular e PC" desc="Funciona bem em qualquer tela (PWA)." />
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center">Como funciona</h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <Step n="1" title="Cadastre ativos" desc="Ações, FIIs, ETFs, BDRs e cripto." />
            <Step n="2" title="Registre operações" desc="Compras, vendas e proventos." />
            <Step n="3" title="Acompanhe resultados" desc="Patrimônio e renda passiva com clareza." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold">Comece agora. É grátis.</h2>
          <p className="mt-3 text-gray-600">Leva menos de 2 minutos para organizar sua carteira.</p>
          <Link href="/dashboard" className="mt-6 inline-block rounded-xl bg-brand px-8 py-4 text-white font-medium hover:opacity-95">
            Criar minha carteira
          </Link>
          <p className="mt-4 text-xs text-muted">
            Futuro plano Pro terá pagamento via Mercado Pago (Brasil).
          </p>
        </div>
      </section>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <div className="font-semibold">{title}</div>
      <div className="mt-2 text-sm text-gray-600">{desc}</div>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <div className="text-2xl font-bold text-brand">{n}</div>
      <div className="mt-2 font-semibold">{title}</div>
      <div className="mt-1 text-sm text-gray-600">{desc}</div>
    </div>
  );
}
