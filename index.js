const axios = require("axios");

// Telegram
const TOKEN = process.env.8427143698:AAF0R8LCYvvVVwTJrUG4NWVnAJ-lQMeXdFc;
const CHAT_ID = process.env.1050200289;

async function checkStock() {
    try {

        const url = "https://porima3d.com/products/porima-eco-smart-pla-filament.js?t=" + Date.now();

        console.log("İstek atılıyor...");

        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        console.log("Status:", response.status);
        console.log("Data tipi:", typeof response.data);

        let data;

        try {
            data = typeof response.data === "string"
                ? JSON.parse(response.data)
                : response.data;
        } catch (e) {
            console.log("JSON parse hatası");
            console.log(response.data);
            return;
        }

        if (!data.variants) {
            console.log("Variants YOK!");
            console.log(data);
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
