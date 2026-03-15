const axios = require("axios");

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

async function checkStock() {
  try {

    const response = await axios.get(PRODUCT_URL);
    const data = response.data;

    let message = "🔔 PORIMA PLA STOK\n\n";

    for (const [tr,en] of Object.entries(COLORS)) {

      const variant = data.variants.find(v =>
        v.title.toLowerCase().includes(en.toLowerCase())
      );

      let inStock = false;

      if (variant && variant.available) {
        inStock = true;
      }

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
