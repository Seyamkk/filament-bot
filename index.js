const axios = require("axios");

// Telegram
const TOKEN = process.env.8427143698:AAF0R8LCYvvVVwTJrUG4NWVnAJ-lQMeXdFc;
const CHAT_ID = process.env.1050200289;

async function checkStock() {
    try {

        // Cache kırmak için random ekliyoruz
        const url = "https://porima3d.com/products/porima-eco-smart-pla-filament.js?t=" + Date.now();

        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Cache-Control": "no-cache"
            }
        });

        const data = response.data;

        let stokta = [];

        console.log("---- TÜM VERİ ----");

        data.variants.forEach(v => {

            console.log(v.option1, "=>", v.available);

            if (v.available) {
                stokta.push(v.option1);
            }

        });

        if (stokta.length > 0) {

            const mesaj =
                "🧵 PORIMA STOK\n\n" +
                stokta.map(r => "🟢 " + r).join("\n");

            await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
                chat_id: CHAT_ID,
                text: mesaj
            });

            console.log("Gönderildi");

        } else {

            await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
                chat_id: CHAT_ID,
                text: "🔴 Stok yok"
            });

            console.log("Stok yok");

        }

    } catch (err) {

        console.log("HATA:", err.message);

    }
}

checkStock();
      const status = inStock ? "🟢 Stokta" : "🔴 Tükendi";

      message += `${status} - ${tr}\n`;

    }

    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`,{
      chat_id: CHAT_ID,
      text: message
    });

    console.log("Mesaj gönderildi");

  } catch (err) {

    console.log("HATA:", err.message);

  }
}

checkStock();
