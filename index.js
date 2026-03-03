const axios = require("axios");

const TOKEN = "AAEjaw3Gl3qmDEARIiX79CluHyieeTWO7xw";
const CHAT_ID = "8720086137";

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

let lastStatus = {};

async function checkStock() {
  try {
    const response = await axios.get(PRODUCT_URL);
    const data = response.data;

    let message = "🔔 PORIMA PLA STOK\n\n";
    let changed = false;

    COLORS.forEach(color => {
      const variant = data.variants.find(v =>
        v.option1 === color && v.option2 === "1.75mm"
      );

      if (variant) {
        const inStock = variant.available;
        const status = inStock ? "🟢 Stokta" : "🔴 Tükendi";

        message += `${status} - ${color}\n`;

        if (lastStatus[color] !== inStock) {
          changed = true;
          lastStatus[color] = inStock;
        }
      }
    });

    if (changed) {
      await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message
      });
    }

  } catch (err) {
    console.log("Hata:", err.message);
  }
}

checkStock();
