export default function TermsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Termos de Uso</h1>
      <p className="mt-4 text-gray-600 max-w-3xl">
        Estes termos regulam o uso do InvestWise Tracker. Ao utilizar o app, você concorda com as condições abaixo.
      </p>

      <div className="mt-8 space-y-6 max-w-3xl text-sm text-gray-700">
        <section>
          <h2 className="font-semibold">1. Natureza do serviço</h2>
          <p className="mt-2">
            O InvestWise Tracker é uma ferramenta de organização e acompanhamento de dados inseridos pelo usuário.
            Não é uma corretora, não executa ordens e não garante resultados.
          </p>
        </section>

        <section>
          <h2 className="font-semibold">2. Conteúdo e responsabilidades</h2>
          <p className="mt-2">
            O usuário é responsável pelos dados inseridos (quantidades, preços, datas e proventos). As informações
            exibidas são estimativas e podem conter divergências caso os dados estejam incorretos.
          </p>
        </section>

        <section>
          <h2 className="font-semibold">3. Não constitui recomendação</h2>
          <p className="mt-2">
            O app não fornece recomendação de investimento. Qualquer decisão é de responsabilidade do usuário.
          </p>
        </section>

        <section>
          <h2 className="font-semibold">4. Alterações</h2>
          <p className="mt-2">
            Podemos atualizar estes termos para melhorar o serviço. A continuidade de uso indica concordância.
          </p>
        </section>
      </div>
    </main>
  );
}
