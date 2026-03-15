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

let lastStatus = {};

async function checkStock() {
  try {
    const response = await axios.get(PRODUCT_URL);
    const data = response.data;

    let message = "🔔 PORIMA PLA STOK\n\n";
    let changed = false;

    COLORS.forEach(color => {

      // Daha esnek arama
      const variant = data.variants.find(v =>
        v.title.includes(color) && v.title.includes("1.75")
      );

      let inStock = false;

      if (variant) {
        inStock = variant.available;
      }

      const status = inStock ? "🟢 Stokta" : "🔴 Tükendi";
      message += `${status} - ${color}\n`;

      if (lastStatus[color] !== inStock) {
        changed = true;
        lastStatus[color] = inStock;
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

checkStock();        message += `${status} - ${color}\n`;

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
