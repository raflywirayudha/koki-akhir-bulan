import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import express from "express";
import multer from "multer";
import cors from "cors";
import { SYSTEM_PROMPT } from "./prompt.js";

const model = process.env.MODEL;
const key = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: key,
});

const app = express();
const upload = multer();

const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Koki Akhir Bulan AI Server is running!");
});

app.post("/generate-text", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt, "<<prompt");

    const response = await ai.interactions.create({
      model: model,
      input: prompt,
    });

    res.status(200).json({
      output: response.output_text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating text");
  }
});

app.post("/generate-from-document", upload.single("file"), async (req, res) => {
  try {
    const { prompt } = req.body;
    const fileBase64 = req.file.buffer.toString("base64");

    const response = await ai.models.generateContent({
      model: model,
      contents: [
        {
          text: prompt,
          type: "text",
        },
        {
          inlineData: {
            data: fileBase64,
            mimeType: req.file.mimetype,
          },
        },
      ],
    });

    res.status(200).json({
      output: response.text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating text");
  }
});

app.post("/api/generate-recipe", upload.single("image"), async (req, res) => {
  try {
    const { ingredients, preferences, history } = req.body;

    let historyMessages = [];
    try {
      if (history) {
        const parsed = JSON.parse(history);
        if (Array.isArray(parsed)) {
          historyMessages = parsed;
        }
      }
    } catch {}

    let prompt;
    if (historyMessages.length === 0) {
      prompt = `Saya punya bahan-bahan ini: ${ingredients}. Buatkan resep masakan lezat dari bahan tersebut.`;
    } else {
      prompt = ingredients;
    }
    if (preferences) {
      prompt += ` Preferensi: ${preferences}.`;
    }

    const contents = [
      ...historyMessages.map((msg) => ({
        role: msg.role === "model" ? "model" : "user",
        parts: [{ text: msg.text }],
      })),
      {
        role: "user",
        parts: [
          { text: prompt },
          ...(req.file
            ? [
                {
                  inlineData: {
                    data: req.file.buffer.toString("base64"),
                    mimeType: req.file.mimetype,
                  },
                },
              ]
            : []),
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model: model,
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    res.status(200).json({ recipe: response.text });
  } catch (error) {
    console.error(error);

    const statusMap = {
      400: { status: 400, message: "Isi permintaan salah format." },
      FAILED_PRECONDITION: { status: 400, message: "Paket gratis Gemini API tidak tersedia di negara Anda. Aktifkan penagihan di Google AI Studio." },
      PERMISSION_DENIED: { status: 403, message: "Kunci API tidak memiliki izin yang diperlukan." },
      NOT_FOUND: { status: 404, message: "Resource tidak ditemukan." },
      RESOURCE_EXHAUSTED: { status: 429, message: "Batas pemakaian API terlampaui. Tunggu beberapa saat." },
      CANCELLED: { status: 499, message: "Operasi dibatalkan." },
      INTERNAL: { status: 500, message: "Terjadi error tak terduga di server Google." },
      UNAVAILABLE: { status: 503, message: "Layanan mungkin mengalami kelebihan beban atau gangguan sementara." },
      DEADLINE_EXCEEDED: { status: 504, message: "Waktu pemrosesan habis. Coba dengan bahan lebih sedikit." },
    };

    const match = error?.message?.match(/(\d{3})\s+\w+/);
    const errCode = match?.[1] || error?.code || 500;
    const errInfo = statusMap[errCode] || { status: 500, message: "Gagal menghasilkan resep." };

    res.status(errInfo.status).json({ error: errInfo.message, code: errCode });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
