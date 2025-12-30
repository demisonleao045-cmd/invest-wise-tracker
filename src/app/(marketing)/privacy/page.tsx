export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Política de Privacidade</h1>
      <p className="mt-4 text-gray-600 max-w-3xl">
        Sua privacidade é importante. Esta política explica como tratamos dados no InvestWise Tracker.
      </p>

      <div className="mt-8 space-y-6 max-w-3xl text-sm text-gray-700">
        <section>
          <h2 className="font-semibold">1. Dados armazenados</h2>
          <p className="mt-2">
            O app armazena dados inseridos pelo usuário para funcionamento do acompanhamento de carteira
            (ativos, transações e proventos).
          </p>
        </section>

        <section>
          <h2 className="font-semibold">2. Compartilhamento</h2>
          <p className="mt-2">
            Não vendemos dados. Não compartilhamos dados pessoais com terceiros para publicidade.
          </p>
        </section>

        <section>
          <h2 className="font-semibold">3. Segurança</h2>
          <p className="mt-2">
            Aplicamos boas práticas de segurança. Ainda assim, nenhum sistema é 100% imune a riscos.
          </p>
        </section>

        <section>
          <h2 className="font-semibold">4. Contato</h2>
          <p className="mt-2">
            Para solicitações relacionadas à privacidade, você poderá disponibilizar um canal de contato
            quando publicar o app.
          </p>
        </section>
      </div>
    </main>
  );
}
