const demoWhatsApp = "917668185039"; // WhatsApp number without '+'

const groceryProducts = [
  { name: "Rice", shop: "FreshMart", price: "₹60/kg", image: "https://picsum.photos/seed/rice/200/150" },
  { name: "Milk", shop: "DailyDairy", price: "₹55/litre", image: "https://picsum.photos/seed/milk/200/150" },
  { name: "Bread", shop: "BakeHouse", price: "₹40", image: "https://picsum.photos/seed/bread/200/150" },
  { name: "Eggs", shop: "FarmFresh", price: "₹6 each", image: "https://picsum.photos/seed/eggs/200/150" }
];

const medicineProducts = [
  { name: "Paracetamol", shop: "HealthPlus", price: "₹25", image: "https://picsum.photos/seed/paracetamol/200/150" },
  { name: "Cough Syrup", shop: "MediCare", price: "₹80", image: "https://picsum.photos/seed/syrup/200/150" },
  { name: "Bandages", shop: "FirstAid Store", price: "₹50", image: "https://picsum.photos/seed/bandages/200/150" },
  { name: "ORS Pack", shop: "WellnessMart", price: "₹30", image: "https://picsum.photos/seed/ors/200/150" }
];

const selectedItems = [];

function displayProducts(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  products.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <input type="checkbox" id="${containerId}-${index}" />
      <label for="${containerId}-${index}">
        <img src="${item.image}" alt="${item.name}" class="product-image" />
        <h3>${item.name}</h3>
        <p><strong>Shop:</strong> ${item.shop}</p>
        <p><strong>Price:</strong> ${item.price}</p>
      </label>
    `;

    const checkbox = card.querySelector("input");
    checkbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        selectedItems.push(item);
      } else {
        const i = selectedItems.findIndex(
          selected => selected.name === item.name && selected.shop === item.shop
        );
        if (i > -1) selectedItems.splice(i, 1);
      }
    });

    container.appendChild(card);
  });
}

function showSummary() {
  const summaryContainer = document.getElementById("orderSummary");
  summaryContainer.style.display = "block";

  if (selectedItems.length === 0) {
    summaryContainer.innerHTML = "<p>No items selected.</p>";
    return;
  }

  let summaryHTML = "<h2>🧾 Order Summary</h2><ul>";
  let message = "Hi, I would like to order the following items:\n";

  selectedItems.forEach(item => {
    summaryHTML += `<li>${item.name} from ${item.shop} - ${item.price}</li>`;
    message += `• ${item.name} from ${item.shop} (${item.price})\n`;
  });

  summaryHTML += "</ul>";
  const whatsappLink = `https://wa.me/${demoWhatsApp}?text=${encodeURIComponent(message)}`;
  summaryHTML += `<a href="${whatsappLink}" target="_blank" class="whatsapp-btn">Send Order via WhatsApp</a>`;

  summaryContainer.innerHTML = summaryHTML;
}

// Initial rendering
displayProducts(groceryProducts, "groceryList");

displayProducts(medicineProducts, "medicineList");
