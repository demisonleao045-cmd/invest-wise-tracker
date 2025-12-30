"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/assets", label: "Ativos" },
  { href: "/transactions", label: "Transações" },
  { href: "/provents", label: "Proventos" },
  { href: "/compare", label: "Comparador" },
  { href: "/settings", label: "Ajustes" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/brand/logo.png"
              alt="InvestWise Tracker"
              width={28}
              height={28}
              className="rounded-lg"
              priority
            />
            <div className="leading-tight">
              <div className="font-semibold text-brand">InvestWise Tracker</div>
              <div className="text-[11px] text-muted">Controle • Renda • Clareza</div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <a
              href="/api/export"
              className="hidden sm:inline-flex rounded-xl px-3 py-2 text-sm ring-1 ring-gray-200 hover:ring-gray-300 bg-white"
              title="Exportar dados"
            >
              Exportar
            </a>
            <Link
              href="/settings"
              className="inline-flex rounded-xl bg-brand px-3 py-2 text-sm font-medium text-white hover:opacity-95"
            >
              Modo demo
            </Link>
          </div>
        </div>
      </header>


      <div className="bg-brand text-white">
        <div className="mx-auto max-w-6xl px-4 py-2 text-xs sm:text-sm flex items-center justify-between gap-2">
          <div className="opacity-95">
            MVP gratuito em teste • Plano Pro com Mercado Pago entra depois
          </div>
          <a href="/pro" className="underline underline-offset-2 opacity-95 hover:opacity-100">
            Ver Pro
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="flex">
          <aside className="hidden lg:block w-60 p-4">
            <nav className="space-y-1">
              {nav.map((n) => {
                const active = pathname?.startsWith(n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={`block rounded-xl px-3 py-2 text-sm ring-1 transition ${
                      active
                        ? "bg-brand text-white ring-brand"
                        : "bg-white ring-gray-200 hover:ring-gray-300"
                    }`}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 rounded-2xl bg-white p-3 text-xs text-muted ring-1 ring-gray-200">
              MVP gratuito. Monetização (Mercado Pago) entra depois.
            </div>
          </aside>

          <main className="flex-1 pb-20 lg:pb-6">{children}</main>
        </div>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t">
        <div className="grid grid-cols-6">
          {nav.map((n) => {
            const active = pathname?.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`px-2 py-3 text-center text-[11px] ${
                  active ? "font-semibold text-brand" : "text-muted"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
