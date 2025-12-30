import Image from "next/image";
import Link from "next/link";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/brand/logo.png" alt="InvestWise Tracker" width={30} height={30} className="rounded-lg" />
            <span className="font-semibold text-brand">InvestWise Tracker</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white hover:opacity-95">
              Entrar
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-muted flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} InvestWise Tracker</div>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-brand">Termos</Link>
            <Link href="/privacy" className="hover:text-brand">Privacidade</Link>
            <Link href="/support" className="hover:text-brand">Suporte</Link>
            <Link href="/pro" className="hover:text-brand">Plano Pro</Link>
            <Link href="/roadmap" className="hover:text-brand">Roadmap</Link>
            <Link href="/install" className="hover:text-brand">Instalar</Link>
            <Link href="/changelog" className="hover:text-brand">Changelog</Link>
            <Link href="/status" className="hover:text-brand">Status</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
