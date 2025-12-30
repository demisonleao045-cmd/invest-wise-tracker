"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function OnboardingModal({ hasAssets }: { hasAssets: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("iw_onboarding_dismissed");
    if (!dismissed && !hasAssets) setOpen(true);
  }, [hasAssets]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="text-sm text-muted">Boas-vindas</div>
        <h2 className="mt-1 text-xl font-semibold">Vamos montar sua carteira em 2 minutos</h2>

        <ol className="mt-4 space-y-3 text-sm text-gray-700 list-decimal pl-5">
          <li>Adicione seus ativos (ações, FIIs, etc.).</li>
          <li>Registre compras/vendas para calcular preço médio.</li>
          <li>Cadastre proventos e veja o total a receber.</li>
        </ol>

        <div className="mt-5 flex flex-col sm:flex-row gap-2">
          <Link
            href="/assets"
            className="inline-flex justify-center rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white hover:opacity-95"
            onClick={() => {
              localStorage.setItem("iw_onboarding_dismissed", "1");
              setOpen(false);
            }}
          >
            Começar adicionando ativos
          </Link>

          <button
            className="inline-flex justify-center rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
            onClick={async () => {
              await fetch("/api/demo", { method: "POST" });
              localStorage.setItem("iw_onboarding_dismissed", "1");
              setOpen(false);
              window.location.href = "/dashboard";
            }}
          >
            Usar modo demonstração
          </button>

          <button
            className="inline-flex justify-center rounded-xl px-4 py-2 text-sm text-muted hover:bg-gray-50"
            onClick={() => {
              localStorage.setItem("iw_onboarding_dismissed", "1");
              setOpen(false);
            }}
          >
            Agora não
          </button>
        </div>
      </div>
    </div>
  );
}
