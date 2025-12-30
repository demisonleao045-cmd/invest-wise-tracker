export default function ChangelogPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Changelog</h1>
      <p className="mt-4 text-gray-600 max-w-3xl">
        Atualizações e melhorias do InvestWise Tracker. (Você pode editar esta página sempre que lançar novidades.)
      </p>

      <div className="mt-8 space-y-6 max-w-3xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="text-sm text-muted">2025-12-27</div>
          <div className="mt-2 font-semibold">Lançamento do MVP</div>
          <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Dashboard com patrimônio e “a receber (30 dias)”.</li>
            <li>Cadastro de ativos com preço médio e preço atual manual.</li>
            <li>Transações (compra/venda) com atualização automática da posição.</li>
            <li>Proventos com cálculo do total baseado na quantidade atual.</li>
            <li>Exportação e modo demonstração.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
