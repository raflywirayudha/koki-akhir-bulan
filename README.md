# 🍳 Koki Akhir Bulan

Asisten memasak berbasis AI — ubah sisa bahan dapur jadi resep lezat.
Tulis atau foto bahan yang ada, dapatkan resep instan.

## Fitur

- **Input Teks & Foto** — ketik bahan atau foto langsung
- **Resep Instan** — AI (Google Gemini 2.5 Flash) proses dalam detik
- **3 Tema Warna** — Warm (orange), Garden (hijau), Retro (rose)
- **Desain Neobrutalism** — border tebal, shadow keras, bold

## Tech Stack

| Frontend | Backend | AI |
|---|---|---|
| React 19 + Vite | Express.js | Google Gemini 2.5 Flash |
| Tailwind CSS 4 | @google/genai | |
| React Router 7 | multer | |

## Screenshots

| Landing | Chat | Mobile |
|---|---|---|
| ![Landing](screenshots/1.%20Screenshot.png) | ![Chat](screenshots/2.%20Screenshot.png) | ![Mobile](screenshots/10.Screenshot%20Mobile.png) |

## Cara Menjalankan

### Backend
```bash
cd backend
cp .env.example .env   # isi GEMINI_API_KEY
npm install
npm run dev            # port 3000
```

### Frontend
```bash
cd frontend
npm install
npm run dev            # port 5173
```

Buka `http://localhost:5173` di browser.

## Struktur Folder

```
chatbot/
├── backend/         # Express API
│   ├── index.js     # route & Gemini integration
│   └── prompt.js    # system prompt untuk AI
├── frontend/        # React app
│   └── src/
│       ├── components/    # UI components
│       ├── routes/        # halaman (Landing, Chat)
│       └── hooks/         # useTheme
└── screenshots/     # preview
```

## Lisensi

MIT
