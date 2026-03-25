const axios = require("axios");

// Telegram
const TOKEN = process.env.8427143698:AAF0R8LCYvvVVwTJrUG4NWVnAJ-lQMeXdFc;
const CHAT_ID = process.env.1050200289;

async function checkStock() {
    try {

        const url = "https://porima3d.com/products/porima-eco-smart-pla-filament.js?t=" + Date.now();

        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        // BAZEN string geliyor → garanti parse
        const data = typeof response.data === "string"
            ? JSON.parse(response.data)
            : response.data;

        if (!data.variants) {
            throw new Error("Variants bulunamadı!");
        }

        let stokta = [];

        console.log("---- DEBUG ----");

        for (let v of data.variants) {

            console.log(v.title + " => " + v.available);

            if (v.available === true) {
                stokta.push(v.title);
            }

        }

        let mesaj = "";

        if (stokta.length > 0) {

            mesaj =
                "🧵 PORIMA STOK VAR\n\n" +
                stokta.map(x => "🟢 " + x).join("\n");

        } else {

            mesaj = "🔴 Stok yok";

        }

        await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: mesaj
        });

        console.log("Mesaj gönderildi");

    } catch (err) {

        console.error("HATA DETAY:", err);

    }
}

checkStock();
