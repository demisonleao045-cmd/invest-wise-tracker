"use client";

import { PwaInstall } from "@/components/PwaInstall";

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-6xl p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Ajustes</h1>
        <p className="text-sm text-gray-600">Configurações do app (MVP).</p>
      </header>

      <div className="mt-4">
        <PwaInstall />
      </div>

        <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold">Plano Pro (em breve)</div>
              <div className="mt-1 text-sm text-muted">
                Backup na nuvem, alertas, importação automática e relatórios avançados.
              </div>
            </div>
            <a href="/upgrade" className="rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white hover:opacity-95">
              Ver Pro
            </a>
          </div>
          <div className="mt-2 text-xs text-muted">Pagamento via Mercado Pago quando você ativar a monetização.</div>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
          <div className="font-semibold">Backup (arquivo)</div>
          <div className="mt-1 text-sm text-muted">
            Exporte seus dados em JSON e importe depois (útil sem login).
          </div>

          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            <a
              href="/api/backup/export"
              className="inline-flex justify-center rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white hover:opacity-95"
            >
              Baixar backup (.json)
            </a>

            <label className="inline-flex justify-center rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer">
              Importar backup
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const text = await file.text();
                  const data = JSON.parse(text);
                  const res = await fetch("/api/backup/import", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });
                  if (!res.ok) {
                    alert("Falha ao importar backup.");
                    return;
                  }
                  alert("Backup importado! Recarregando…");
                  window.location.href = "/dashboard";
                }}
              />
            </label>
          </div>

          <div className="mt-2 text-xs text-muted">
            Importar substitui os dados atuais (MVP de usuário único).
          </div>
        </div>


      <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
        <h2 className="text-lg font-semibold">Backup / Exportação</h2>
        <p className="mt-1 text-sm text-gray-600">Exporte seus dados (assets, transactions e provents).</p>

        <a
          href="/api/export"
          className="mt-3 inline-block rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Baixar exportação (TXT/CSV)
        </a>

        <button
          onClick={async () => {
            await fetch("/api/demo", { method: "POST" });
            location.href = "/dashboard";
          }}
          className="ml-2 mt-3 inline-block rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Entrar em modo demonstração
        </button>

        <div className="mt-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
          <div className="font-medium">Monetização (depois)</div>
          <div className="mt-1 text-gray-600">
            Estrutura preparada para planos e cobrança via <b>Mercado Pago</b> quando você quiser ativar.
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
          <div className="font-medium">Encontrou algum erro?</div>
          <div className="mt-1 text-gray-600">
            Abra a página de suporte para reportar bug.
          </div>
          <a href="/support" className="mt-3 inline-block text-brand underline underline-offset-2">
            Reportar bug / Suporte
          </a>
        </div>


        <div className="mt-6 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
          <div className="font-medium">Transparência</div>
          <div className="mt-1 text-gray-600">
            Veja as atualizações do app e o status do sistema.
          </div>
          <div className="mt-3 flex gap-4">
            <a href="/changelog" className="text-brand underline underline-offset-2">Changelog</a>
            <a href="/status" className="text-brand underline underline-offset-2">Status</a>
          </div>
        </div>

      </section>
    </main>
  );
}
