import "./globals.css";

export const metadata = {
  icons: { icon: "/favicon.ico" },
  title: "InvestWise Tracker | Controle seus investimentos",
  description:
    "Controle sua carteira de investimentos e dividendos de forma simples. Feito para investidores brasileiros.",
  manifest: "/manifest.json",
  themeColor: "#111827",
  openGraph: {
    images: ["/og.png"],
    title: "InvestWise Tracker",
    description: "Controle investimentos e dividendos sem planilhas.",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "InvestWise Tracker",
    description: "Controle investimentos e dividendos sem planilhas.",
    images: ["/og.png"]
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-bg text-gray-900">{children}</body>
    </html>
  );
}
