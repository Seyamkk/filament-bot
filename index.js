const axios = require("axios");

const TOKEN = "8427143698:AAF0R8LCYvvVVwTJrUG4NWVnAJ-lQMeXdFc";
const CHAT_ID = "1050200289";

const PRODUCT_URL = "https://porima3d.com/products/porima-eco-smart-pla-filament.js";

const COLORS = [
  "Beyaz",
  "Sarı",
  "Kahverengi",
  "Turkuaz",
  "Mavi",
  "Gri",
  "Siyah"
];

async function checkStock() {

  try {

    const response = await axios.get(PRODUCT_URL);
    const data = response.data;

    let message = "🔔 PORIMA PLA STOK\n\n";

    COLORS.forEach(color => {

      const variant = data.variants.find(v =>
  v.title.toLowerCase().includes(color.toLowerCase())
);

      let inStock = false;

      if (variant) {
        inStock = variant.available;
      }

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
