import Link from "next/link";

export default function RoadmapPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Roadmap</h1>
      <p className="mt-4 text-gray-600 max-w-3xl">
        O MVP já entrega controle de carteira e proventos. Aqui está o que vem a seguir (principalmente no Plano Pro).
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Column
          title="Agora (MVP)"
          items={[
            "Dashboard (patrimônio, custo, retorno)",
            "Ativos com preço médio e preço atual manual",
            "Transações (compra/venda)",
            "Proventos e “a receber (30 dias)”",
            "Exportação + modo demo",
          ]}
        />
        <Column
          title="Próximo (melhorias Free)"
          items={[
            "Importação/backup via arquivo (sem login)",
            "Melhorias de UX (atalhos, filtros e ordenação)",
            "Metas simples de aporte e renda",
            "Melhorias no comparador",
          ]}
        />
        <Column
          title="Plano Pro (em breve)"
          items={[
            "Backup na nuvem + multi-dispositivo",
            "Alertas de dividendos e calendário",
            "Importação automática de preços (opcional)",
            "Relatórios avançados (renda mensal, yield)",
            "Suporte prioritário",
            "Pagamento via Mercado Pago",
          ]}
          highlight
        />
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/pro" className="rounded-xl bg-brand px-5 py-3 text-sm font-medium text-white hover:opacity-95">
          Ver Plano Pro
        </Link>
        <Link href="/dashboard" className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium hover:bg-gray-50">
          Abrir o app
        </Link>
      </div>
    </main>
  );
}

function Column({
  title,
  items,
  highlight = false,
}: {
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-6 shadow-sm ring-1 ${highlight ? "bg-gray-900 text-white ring-gray-900" : "bg-white ring-gray-200"}`}>
      <h2 className={`text-lg font-semibold ${highlight ? "text-white" : ""}`}>{title}</h2>
      <ul className={`mt-4 space-y-2 text-sm ${highlight ? "text-white/85" : "text-gray-700"}`}>
        {items.map((x) => (
          <li key={x}>• {x}</li>
        ))}
      </ul>
    </div>
  );
}
