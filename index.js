const axios = require("axios");

// BURAYA CALLMEBOT LINKİNİ KOY
const WHATSAPP_API = "https://api.callmebot.com/whatsapp.php?phone=905385277587&text=This+is+a+test&apikey=7624574";

async function run() {
    try {
        const url = "https://porima3d.com/products/porima-eco-smart-pla-filament.js?t=" + Date.now();

        const res = await axios.get(url);
        const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;

        let stok = [];

        for (let v of data.variants) {
            if (v.available) {
                stok.push(v.title);
            }
        }

        let mesaj = stok.length > 0
            ? "🟢 STOK VAR\n\n" + stok.join("\n")
            : "🔴 Stok yok";

        await axios.get(`${WHATSAPP_API}&text=${encodeURIComponent(mesaj)}`);

        console.log("WhatsApp gönderildi");

    } catch (e) {
        console.log("HATA:", e.message);
    }
}

run();
