export default function InstallPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Instalar no celular</h1>
      <p className="mt-4 text-gray-600 max-w-3xl">
        O InvestWise Tracker funciona como aplicativo (PWA). Você pode instalar e usar pela tela inicial.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 max-w-4xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="text-lg font-semibold">Android (Chrome)</h2>
          <ol className="mt-3 list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li>Abra o site no Chrome.</li>
            <li>Toque nos três pontos (menu).</li>
            <li>Selecione “Adicionar à tela inicial” ou “Instalar app”.</li>
          </ol>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="text-lg font-semibold">iPhone (Safari)</h2>
          <ol className="mt-3 list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li>Abra o site no Safari.</li>
            <li>Toque em “Compartilhar”.</li>
            <li>Selecione “Adicionar à Tela de Início”.</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
