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

### Beranda
| Tema Warm | Tema Garden | Tema Retro |
|---|---|---|
| ![](screenshots/1.%20Screenshot.png) | ![](screenshots/2.%20Screenshot.png) | ![](screenshots/3.%20Screenshot.png) |

### Chat
| | |
|---|---|
| ![](screenshots/4.%20Screenshot.png) | ![](screenshots/5.%20Screenshot.png) |
| ![](screenshots/6.%20Screenshot.png) | ![](screenshots/7.%20Screenshot.png) |

### Mobile
![](screenshots/9.Screenshot%20Mobile.png)

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
