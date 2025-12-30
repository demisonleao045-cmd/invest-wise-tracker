export default function SupportPage() {
  const email = "suporte@investwisetracker.com";
  const subject = encodeURIComponent("Suporte - InvestWise Tracker");
  const body = encodeURIComponent(
    "Descreva o problema e, se possível, inclua:\n- O que você estava fazendo\n- O que esperava acontecer\n- O que aconteceu\n- Print/erro do terminal (se houver)\n"
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Suporte</h1>
      <p className="mt-4 text-gray-600 max-w-3xl">
        Se você encontrou um bug ou precisa de ajuda, entre em contato. (Você pode trocar este e-mail depois.)
      </p>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 max-w-3xl">
        <h2 className="text-lg font-semibold">Contato</h2>
        <p className="mt-2 text-sm text-gray-700">
          E-mail: <b>{email}</b>
        </p>

        <a
          className="mt-4 inline-block rounded-xl bg-brand px-5 py-3 text-sm font-medium text-white hover:opacity-95"
          href={`mailto:${email}?subject=${subject}&body=${body}`}
        >
          Enviar e-mail para o suporte
        </a>

        <div className="mt-6 text-sm text-gray-600">
          Dica: se for erro técnico, copie a última mensagem do terminal e cole no e-mail.
        </div>
      </div>
    </main>
  );
}
