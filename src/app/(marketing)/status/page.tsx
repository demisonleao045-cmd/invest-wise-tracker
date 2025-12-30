export default function StatusPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Status do Sistema</h1>
      <p className="mt-4 text-gray-600 max-w-3xl">
        Página simples para passar confiança no lançamento. Quando você publicar, pode atualizar com incidentes e
        manutenção programada.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 max-w-4xl">
        <Card title="Aplicação" status="Operando normalmente" />
        <Card title="Banco de dados" status="Operando normalmente" />
        <Card title="Exportação" status="Operando normalmente" />
        <Card title="PWA / Instalação" status="Operando normalmente" />
      </div>

      <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 max-w-4xl">
        <h2 className="text-lg font-semibold">Manutenções</h2>
        <p className="mt-2 text-sm text-gray-700">Nenhuma manutenção programada no momento.</p>
      </div>
    </main>
  );
}

function Card({ title, status }: { title: string; status: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <div className="text-sm text-muted">{title}</div>
      <div className="mt-2 font-semibold text-emerald-700">{status}</div>
    </div>
  );
}
