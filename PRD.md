# 📄 PRD: Koki Akhir Bulan — Resep Berbasis Sisa Bahan

## 1. Ringkasan Eksekutif
**Koki Akhir Bulan** adalah web chatbot interaktif berbasis Artificial Intelligence (AI) yang dirancang untuk membantu pengguna mengolah sisa bahan makanan yang ada di kulkas/dapur menjadi resep masakan yang lezat, praktis, dan ekonomis. Web ini menggunakan **Google AI Model API (Gemini 2.5 Flash)** untuk memproses input teks serta foto bahan secara cepat dan akurat.

---

## 2. Tujuan & Sasaran
- **Mengurangi Food Waste:** Membantu pengguna memaksimalkan penggunaan bahan makanan sebelum membusuk.
- **Efisiensi Finansial:** Membantu anak kos, mahasiswa, atau ibu rumah tangga menghemat pengeluaran belanja bahan makanan di akhir bulan.
- **Inspirasi Instan:** Memberikan ide masakan yang tidak terduga namun lezat dari kombinasi bahan seadanya.
- **Kemudahan Penggunaan:** Menyediakan antarmuka yang modern, responsif, dan ramah pengguna (user-friendly).

---

## 3. Target Pengguna
- **Anak Kost / Mahasiswa:** Memiliki anggaran dan persediaan bahan makanan terbatas di akhir bulan.
- **Ibu Rumah Tangga:** Mencari ide variasi menu harian menggunakan sisa stok di kulkas.
- **Pecinta Kuliner Praktis:** Siapa saja yang ingin memasak secara instan tanpa harus pergi berbelanja bahan baru terlebih dahulu.

---

## 4. Spesifikasi Teknologi (Tech Stack)

| Lapisan (Layer) | Teknologi | Keterangan |
|---|---|---|
| **Frontend Framework** | React.js (Vite) | Single Page Application (SPA), performa cepat, hot module replacement. |
| **Styling** | Tailwind CSS | Utility-first CSS, responsif, modern, dan mudah dikustomisasi. |
| **Backend Framework** | Node.js (Express) | Menyediakan REST API yang aman, menangani komunikasi ke Gemini API secara aman. |
| **AI Model** | Google Gemini 2.5 Flash | Dipilih karena kecepatannya tinggi (low-latency), biaya efisien, dan mendukung multimodal input (teks & gambar). |
| **Routing** | React Router | Navigasi halaman yang mulus tanpa reload halaman penuh. |
| **Markdown Parser** | React Markdown | Merender resep berformat markdown yang dihasilkan oleh Gemini API ke elemen HTML yang rapi. |

---

## 5. Struktur Proyek (Project Directory Structure)
```
chatbot/
├── frontend/                         # Aplikasi React + Vite + Tailwind CSS
│   ├── public/
│   ├── src/
│   │   ├── main.jsx                  # Entry point utama dengan React Router
│   │   ├── App.jsx                   # Layout utama (Navbar + Content Container)
│   │   ├── index.css                 # File Tailwind directives
│   │   ├── routes/
│   │   │   ├── Landing.jsx           # Landing Page (Hero, Fitur, CTA)
│   │   │   ├── Chat.jsx              # Aplikasi Chatbot Utama
│   │   │   └── About.jsx             # Halaman Tentang & Visi Misi
│   │   └── components/
│   │       ├── ChatBox.jsx           # Kontainer daftar pesan chat
│   │       ├── MessageBubble.jsx     # Bubble pesan user (teks) & bot (markdown HTML)
│   │       ├── InputForm.jsx         # Input form (Teks, Upload Foto, & Preview Gambar)
│   │       └── Navbar.jsx            # Navigasi atas yang responsif
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── server/                           # Express Backend
    ├── index.js                      # Entry point Express, API Routing, Gemini Integration
    ├── prompt.js                     # Penyimpanan SYSTEM_PROMPT (System Instruction)
    ├── .env                          # API Key (GEMINI_API_KEY) & MODEL (gemini-2.5-flash)
    └── package.json
```

---

## 6. Spesifikasi Fitur & Fungsionalitas

### A. Fitur Utama (P0 - Must Have)
1. **Input Teks Sisa Bahan:** User dapat mengetikkan daftar bahan makanan (contoh: "telur, nasi, kecap, cabai") di kolom chat.
2. **Upload Foto Bahan (Multimodal):** User dapat mengambil foto atau mengunggah gambar sisa bahan dapur mereka. AI akan mendeteksi bahan apa saja yang ada pada foto tersebut.
3. **Sistem Chatbot Interaktif:** User bisa bertanya kembali atau merevisi resep (contoh: "ganti bawang bombay dengan bawang merah biasa").
4. **Resep Terstruktur:** AI mengembalikan resep dengan format terstandar yang mudah dibaca (Nama Resep, Waktu Masak, Porsi, Bahan, Langkah-langkah, Tips).
5. **System Instruction Terintegrasi:** Menjamin Gemini AI bertindak murni sebagai "Koki Akhir Bulan" dengan gaya bahasa ramah, mendukung, dan hanya menggunakan bahan-bahan sisa milik user.

### B. Fitur Tambahan (P1 - Should Have)
1. **Landing Page Interaktif:** Berisi ilustrasi menarik, daftar keunggulan aplikasi, dan tombol Call-To-Action (CTA) "Mulai Memasak" yang mengarahkan ke halaman chat.
2. **Halaman About:** Menjelaskan visi Koki Akhir Bulan dalam menekan pemborosan makanan (food waste) dan memberikan biodata singkat pembuat sistem.
3. **Image Preview:** Menampilkan thumbnail gambar yang diunggah oleh user sebelum dikirim ke server.
4. **Skeleton Loading:** Animasi loading pulse ala ChatGPT sewaktu menunggu respons AI untuk memberikan pengalaman pengguna yang mulus.

---

## 7. Integrasi Gemini 2.5 Flash & System Instruction

Untuk memastikan output AI konsisten, aman, dan relevan dengan konsep "Koki Akhir Bulan", kita akan mengimplementasikan **System Instruction** di server Node.js:

```js
// server/prompt.js
export const SYSTEM_PROMPT = `Anda adalah "Koki Akhir Bulan", asisten memasak AI yang ramah, kreatif, dan ahli dalam menghemat pengeluaran kuliner.
Tugas Anda adalah menciptakan resep makanan lezat dan praktis hanya menggunakan bahan-bahan sisa dapur yang diberikan oleh pengguna (baik berupa daftar teks atau hasil deteksi foto).

Aturan Utama:
1. Prioritaskan penggunaan bahan yang disediakan oleh pengguna secara maksimal.
2. Jangan menambahkan bahan-bahan yang mahal atau sulit ditemukan, kecuali jika sangat esensial dan beri label "[Opsional]" atau "[Bahan Tambahan]".
3. Selalu balas dalam Bahasa Indonesia dengan nada santai, hangat, dan menyemangati (layaknya koki profesional yang ramah).
4. Jika pengguna mengunggah foto, identifikasi bahan makanan utama dari foto tersebut dan sebutkan di awal chat sebelum memberikan resep.
5. Format output wajib menggunakan Markdown terstruktur seperti di bawah ini untuk memudahkan pembacaan di frontend:

## [Nama Resep Kreatif]

### 🛒 Bahan-bahan:
- [Bahan Utama 1] - [Takaran]
- [Bahan Utama 2] - [Takaran]
- [Bahan Tambahan/Bumbu dasar] - [Takaran] (misalnya: garam, gula, air hangat)

### 👩‍🍳 Langkah Pembuatan:
1. [Langkah 1]
2. [Langkah 2]
3. [Langkah 3]

### 💡 Tips Koki Akhir Bulan:
- [Tips trik memasak atau alternatif pengganti bahan]

6. Jika bahan yang dimasukkan sama sekali tidak bisa dibuat makanan apa pun yang aman dikonsumsi, sampaikan dengan sopan dan beri saran 1-2 bahan tambahan yang perlu dibeli agar bisa menjadi masakan layak makan.`;
```

---

## 8. Spesifikasi UI/UX (Desain & Tampilan)
- **Skema Warna:** Dominan Oranye Hangat (`#ea580c`), Kuning/Krem Lembut (`#fef3c7`), dan putih bersih. Melambangkan dapur, kehangatan, dan selera makan yang baik.
- **Responsivitas:** Wajib mobile-first. Mayoritas orang memasak sambil membawa smartphone di dapur.
- **Tipografi:** Menggunakan Sans-serif modern yang bersih dan mudah dibaca (Inter/Geist/Arial).

---

## 9. Alur Data (Data Flow)
1. **User Input:** User memasukkan teks bahan dan/atau mengunggah gambar melalui `frontend/src/routes/Chat.jsx`.
2. **File Conversion:** Jika ada gambar, frontend mengonversinya menjadi format Base64.
3. **Payload Sent:** Payload berisi `{ ingredients, imageBase64, preferences }` dikirim via `fetch` POST ke backend `/api/generate-recipe`.
4. **Backend Processing:** Backend Express menerima data, merakit parameter instansiasi `@google/genai` dengan model `gemini-2.5-flash`, menyisipkan `systemInstruction` (SYSTEM_PROMPT), dan mengirimkannya ke Google API.
5. **API Response:** Google API merespons dengan teks markdown resep.
6. **Frontend Render:** Frontend menerima teks markdown, menyimpannya di state pesan, dan merendernya via `<MessageBubble />` yang menggunakan `<ReactMarkdown />`.
