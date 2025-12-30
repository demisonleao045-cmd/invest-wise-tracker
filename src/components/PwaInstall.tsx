"use client";

import { useEffect, useMemo, useState } from "react";

type BIPEvent = Event & {
  prompt?: () => Promise<void>;
  userChoice?: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function PwaInstall() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    const mq = window.matchMedia?.("(display-mode: standalone)");
    if (mq?.matches) setInstalled(true);

    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  const canInstall = useMemo(() => !!deferred && !installed, [deferred, installed]);

  if (!canInstall) return null;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold">Instalar no celular</div>
          <div className="mt-1 text-sm text-muted">
            Instale como app (PWA) para acesso rápido na tela inicial.
          </div>
        </div>
        <button
          className="rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white hover:opacity-95"
          onClick={async () => {
            try {
              await deferred?.prompt?.();
              await deferred?.userChoice;
              setDeferred(null);
            } catch {
              // ignore
            }
          }}
        >
          Instalar
        </button>
      </div>

      <div className="mt-3 text-xs text-muted">
        Se não aparecer o botão, use o menu do navegador → “Adicionar à tela inicial”.
      </div>
    </div>
  );
}
