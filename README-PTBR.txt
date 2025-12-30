INVESTWISE TRACKER (MVP) — COMO RODAR NO WINDOWS

1) Instale Node.js LTS: https://nodejs.org
2) Extraia este ZIP em uma pasta (ex: Documentos\investwise-tracker)
3) Abra o Terminal dentro da pasta extraída

Comandos:
  npm install
  npx prisma migrate dev --name init
  npm run dev

Abra no navegador:
  http://localhost:3000

Dica: Em 'Ajustes' você pode clicar em 'Entrar em modo demonstração' para popular dados.


URLs úteis:
- / (Landing page)
- /dashboard (App)
- /pro (Plano Pro)
- /terms (Termos)
- /privacy (Privacidade)
- /support (Suporte)

- /changelog (Changelog)
- /status (Status)
- /roadmap (Roadmap)
- /upgrade (Plano Pro dentro do app)

- /install (Como instalar no celular - PWA)


Backup:
- Exportar: /api/backup/export
- Importar: /api/backup/import (POST)
