const axios = require("axios");

const TOKEN = "8427143698:AAF0R8LCYvvVVwTJrUG4NWVnAJ-lQMeXdFc";
const CHAT_ID = "1050200289";

async function run() {
    try {
        const url = "https://porima3d.com/products/porima-eco-smart-pla-filament.js?t=" + Date.now();

        const res = await axios.get(url);
        const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;

        let stok = [];

        data.variants.forEach(v => {
            if (v.available) {
                stok.push(v.title);
            }
        });

        const mesaj = stok.length > 0
            ? "🟢 STOK VAR\n\n" + stok.join("\n")
            : "🔴 Stok yok";

        await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: mesaj
        });

        console.log("OK");

    } catch (e) {
        console.log("HATA:", e.message);
    }
}

run();            console.log(data);
            return;
        }

        let stokta = [];

        console.log("---- VARYANTLAR ----");

        data.variants.forEach(v => {
            console.log(v.title, "=>", v.available);

            if (v.available === true) {
                stokta.push(v.title);
            }
        });

        let mesaj = stokta.length > 0
            ? "🧵 STOK VAR\n\n" + stokta.join("\n")
            : "🔴 Stok yok";

        console.log("Gönderilecek mesaj:");
        console.log(mesaj);

        if (!TOKEN || !CHAT_ID) {
            console.log("TOKEN veya CHAT_ID eksik!");
            return;
        }

        await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: mesaj
        });

        console.log("Telegram gönderildi");

    } catch (err) {

        console.log("GENEL HATA:");
        console.log(err.message);
