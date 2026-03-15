const axios = require("axios");
const fs = require("fs");

const TOKEN = "8427143698:AAF0R8LCYvvVVwTJrUG4NWVnAJ-lQMeXdFc";
const CHAT_ID = "1050200289";

const PRODUCT_URL = "https://porima3d.com/products/porima-eco-smart-pla-filament.js";

const COLORS = {
  "Beyaz": "White",
  "Sarı": "Yellow",
  "Kahverengi": "Brown",
  "Turkuaz": "Turquoise",
  "Mavi": "Blue",
  "Gri": "Grey",
  "Siyah": "Black"
};

let lastStock = {};

async function checkStock() {

  try {

    const response = await axios.get(PRODUCT_URL);
    const data = response.data;

    for (const [tr,en] of Object.entries(COLORS)) {

      const variant = data.variants.find(v =>
        v.title.toLowerCase().includes(en.toLowerCase())
      );

      if (!variant) continue;

      const inStock = variant.available;

      if (lastStock[tr] === false && inStock === true) {

        const message =
`🚨 PORIMA STOK GELDİ

🟢 ${tr} PLA stokta!`;

        await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`,{
          chat_id: CHAT_ID,
          text: message
        });

      }

      lastStock[tr] = inStock;

    }

  } catch (err) {

    console.log("HATA:",err.message);

  }

}

checkStock();      }

      const status = inStock ? "🟢 Stokta" : "🔴 Tükendi";

      message += `${status} - ${color}\n`;

    });

    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message
    });

    console.log("Mesaj gönderildi");

  } catch (error) {

    console.log("HATA:", error);

  }

}

checkStock();
