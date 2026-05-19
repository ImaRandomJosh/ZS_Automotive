const QUOTE_EMAIL = "quotes@zsauto.ca";

const categories = [
  {
    id: "tires",
    label: "Tires",
    kicker: "Tire service",
    cardPrice: "Changeovers from $70/set",
    description: "Seasonal tire changeovers, balancing, plug/patch repair, valve stems, TPMS, and reseal work.",
    services: [
      { id: "on-rim", name: "Tire Changeover - On Rim", price: 70, detail: "From $70/set" },
      { id: "off-rim-14-18", name: 'Off Rim 14"-18"', price: 100, detail: "From $100/set" },
      { id: "off-rim-19-21", name: 'Off Rim 19"-21"', price: 120, detail: "From $120/set" },
      { id: "off-rim-22-24", name: 'Off Rim 22"-24"', price: 150, detail: "From $150/set" },
      { id: "balancing", name: "Tire Balancing", price: 40, detail: "Starting price" },
      { id: "plug", name: "Tire Plug", price: 40, detail: "Flat repair starting price" },
      { id: "inside-patch", name: "Tire Inside Patch", price: 60, detail: "Internal repair starting price" },
      { id: "valve-stem", name: "Tire Valve Stem", price: 60, detail: "Starting price" },
      { id: "tpms", name: "TPMS Service", price: 100, detail: "Sensor service starting price" },
      { id: "reseal", name: "Tire Reseal", price: 50, detail: "Starting price" }
    ]
  },
  {
    id: "oil",
    label: "Oil Changes",
    kicker: "Oil service",
    cardPrice: "Oil changes from $80",
    description: "Economy, Castrol mid grade, Castrol Euro grade, LiquiMoly, oil filters, and extra litre pricing.",
    services: [
      { id: "economy-oil", name: "Economy Oil Change", price: 80, extraLitre: 20, detail: "Extra litre: $20" },
      { id: "castrol-mid", name: "Castrol Mid Grade Oil Change", price: 100, extraLitre: 25, detail: "Extra litre: $25" },
      { id: "castrol-euro", name: "Castrol Euro Grade Oil Change", price: 120, extraLitre: 30, detail: "Extra litre: $30" },
      { id: "liquimoly", name: "Premium LiquiMoly Oil Change", price: 140, extraLitre: 35, detail: "Extra litre: $35" },
      { id: "premium-filter", name: "Premium Oil Filter", price: 30, detail: "Add-on starting price" },
      { id: "oil-labour", name: "Oil Change Labour", price: 45, detail: "Labour only" },
      { id: "oil-filter", name: "Oil Filter", price: 15, detail: "Starting price" }
    ]
  },
  {
    id: "brakes",
    label: "Brakes",
    kicker: "Brake service",
    cardPrice: "Front brake service from $425",
    description: "Front and rear brake jobs, with vehicle-specific pricing and optional warranty coverage.",
    services: [
      { id: "front-brakes", name: "Front Brake Service", price: 425, detail: "From $425, vehicle fitment may vary" },
      { id: "rear-brakes", name: "Rear Brake Service", price: 375, detail: "From $375, vehicle fitment may vary" },
      { id: "warranty", name: "1-Year Extended Warranty", price: 100, detail: "Add-on warranty" }
    ]
  },
  {
    id: "inspection",
    label: "Inspection & Safety",
    kicker: "Safety",
    cardPrice: "Inspection from $65",
    description: "General inspections and safety inspection services. Final pricing depends on inspection findings.",
    services: [
      { id: "inspection", name: "Inspection", price: 65, detail: "Minimum starting price" },
      { id: "safety", name: "Safety Inspection", price: 199, detail: "Starting price" }
    ]
  },
  {
    id: "lighting",
    label: "Lighting",
    kicker: "Bulbs",
    cardPrice: "Bulbs from $20",
    description: "Halogen bulb replacement and LED bulb set service. Fitment may vary by vehicle.",
    services: [
      { id: "halogen", name: "Halogen Bulb", price: 20, detail: "Starting price" },
      { id: "led", name: "LED Bulbs Set", price: 80, detail: "Starting price" }
    ]
  }
];

let activeCategoryId = "tires";
let quoteItems = JSON.parse(localStorage.getItem("zsAutoQuoteItems") || "[]");

const formatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0
});

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const serviceGrid = $("#serviceGrid");
const categoryTabs = $("#categoryTabs");
const serviceSelect = $("#serviceSelect");
const serviceNeededSelect = $("#serviceNeeded");
const quantityInput = $("#quantityInput");
const tireOptions = $("#tireOptions");
const oilOptions = $("#oilOptions");
const warrantyOptions = $("#warrantyOptions");
const quoteItemsEl = $("#quoteItems");
const quoteTotalEl = $("#quoteTotal");
const selectedServicesPreview = $("#selectedServicesPreview");
const selectedServicesCount = $("#selectedServicesCount");
const toast = $("#toast");

function getActiveCategory() {
  return categories.find((category) => category.id === activeCategoryId) || categories[0];
}

function getSelectedService() {
  const activeCategory = getActiveCategory();
  return activeCategory.services.find((service) => service.id === serviceSelect.value) || activeCategory.services[0];
}

function renderServiceCards() {
  serviceGrid.innerHTML = categories.map((category) => `
    <article class="service-card">
      <div>
        <span class="service-kicker">${category.kicker}</span>
        <h3>${category.label}</h3>
        <p>${category.description}</p>
        <span class="service-price-line">${category.cardPrice}</span>
      </div>
      <a href="#pricing" data-service-card="${category.id}">View starting prices</a>
    </article>
  `).join("");

  $$('[data-service-card]').forEach((link) => {
    link.addEventListener('click', () => setActiveCategory(link.dataset.serviceCard));
  });
}

function renderTabs() {
  categoryTabs.innerHTML = categories.map((category) => `
    <button class="category-tab ${category.id === activeCategoryId ? "active" : ""}" type="button" data-category="${category.id}">
      ${category.label}
    </button>
  `).join("");

  $$('[data-category]').forEach((button) => {
    button.addEventListener('click', () => setActiveCategory(button.dataset.category));
  });
}

function renderServiceOptions() {
  const activeCategory = getActiveCategory();
  serviceSelect.innerHTML = activeCategory.services.map((service) => `
    <option value="${service.id}">${service.name} — ${formatter.format(service.price)}</option>
  `).join("");

  quantityInput.value = 1;
  $('#extraLitres').value = 0;
  $('#premiumFilter').value = 0;
  $('#warrantyCheckbox').checked = false;
  syncConditionalOptions();
}

function setActiveCategory(categoryId) {
  activeCategoryId = categoryId;
  renderTabs();
  renderServiceOptions();
}

function syncConditionalOptions() {
  const category = getActiveCategory();
  const service = getSelectedService();
  const isTireChangeover = category.id === "tires" && (service.id.startsWith("off-rim") || service.id === "on-rim");

  tireOptions.classList.toggle("hidden", !isTireChangeover);
  oilOptions.classList.toggle("hidden", category.id !== "oil" || !service.extraLitre);
  warrantyOptions.classList.toggle("hidden", category.id !== "brakes" || service.id === "warranty");
}

function calculateCurrentItem() {
  const category = getActiveCategory();
  const service = getSelectedService();
  const quantity = Math.max(1, Number(quantityInput.value) || 1);
  const extraLitres = Math.max(0, Number($('#extraLitres').value) || 0);
  const premiumFilter = Number($('#premiumFilter').value) || 0;
  const warranty = $('#warrantyCheckbox').checked ? 100 : 0;

  let basePrice = service.price;
  const details = [service.detail];

  if (category.id === "oil" && service.extraLitre) {
    basePrice += extraLitres * service.extraLitre;
    if (extraLitres > 0) details.push(`${extraLitres} extra litre(s)`);
    if (premiumFilter > 0) details.push("Premium filter included");
  }

  if (category.id === "tires" && (service.id.startsWith("off-rim") || service.id === "on-rim")) {
    details.push(`${$('#tireMountType').selectedOptions[0].textContent}, ${$('#rimSizeSelect').selectedOptions[0].textContent}`);
  }

  if (category.id === "brakes" && warranty) {
    details.push("1-year extended warranty included");
  }

  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    category: category.label,
    service: service.name,
    quantity,
    price: basePrice * quantity + premiumFilter + warranty,
    details: details.filter(Boolean).join(" • ")
  };
}

function addCurrentItemToQuote() {
  const item = calculateCurrentItem();
  quoteItems.push(item);
  saveQuoteItems();
  renderQuote();
  showToast(`${item.service} added to quote.`);
}

function removeQuoteItem(id) {
  quoteItems = quoteItems.filter((item) => item.id !== id);
  saveQuoteItems();
  renderQuote();
}

function clearQuote() {
  quoteItems = [];
  saveQuoteItems();
  renderQuote();
  showToast("Estimate list cleared.");
}

function saveQuoteItems() {
  localStorage.setItem("zsAutoQuoteItems", JSON.stringify(quoteItems));
}

function renderQuote() {
  const total = quoteItems.reduce((sum, item) => sum + item.price, 0);
  quoteTotalEl.textContent = formatter.format(total);
  selectedServicesCount.textContent = `${quoteItems.length} item${quoteItems.length === 1 ? "" : "s"}`;

  if (!quoteItems.length) {
    quoteItemsEl.innerHTML = '<p class="empty-state">Add a service to see the estimate here.</p>';
    selectedServicesPreview.textContent = "No services added yet.";
    return;
  }

  quoteItemsEl.innerHTML = quoteItems.map((item) => `
    <article class="quote-item">
      <div class="quote-item-top">
        <div>
          <strong>${item.service}</strong>
          <small>${item.category} • Qty ${item.quantity}</small>
          <small>${item.details}</small>
        </div>
        <button class="remove-item" type="button" aria-label="Remove ${item.service}" data-remove="${item.id}">×</button>
      </div>
      <strong>${formatter.format(item.price)}</strong>
    </article>
  `).join("");

  selectedServicesPreview.innerHTML = `
    <ul>
      ${quoteItems.map((item) => `<li>${item.service} × ${item.quantity} — ${formatter.format(item.price)}</li>`).join("")}
    </ul>
  `;

  $$('[data-remove]').forEach((button) => {
    button.addEventListener('click', () => removeQuoteItem(button.dataset.remove));
  });
}

function buildQuotePayload() {
  const form = $('#quoteForm');
  const formData = new FormData(form);
  const customer = Object.fromEntries(formData.entries());
  const total = quoteItems.reduce((sum, item) => sum + item.price, 0);

  return {
    submittedAt: new Date().toISOString(),
    customer,
    quoteItems,
    estimatedTotalCAD: total
  };
}

function buildEmailBody(payload) {
  const customer = payload.customer;
  const services = payload.quoteItems.length
    ? payload.quoteItems.map((item) => `- ${item.service} x ${item.quantity}: ${formatter.format(item.price)} (${item.details})`).join("\n")
    : customer.serviceNeeded || "No service selected";

  return [
    "New ZS Automotive quote request",
    "",
    `Name: ${customer.firstName || ""} ${customer.lastName || ""}`,
    `Phone: ${customer.phone || ""}`,
    `Email: ${customer.email || ""}`,
    `Postal code: ${customer.postalCode || ""}`,
    `Vehicle: ${customer.vehicleYear || ""} ${customer.vehicleMake || ""} ${customer.vehicleModel || ""}`,
    `Preferred date: ${customer.preferredDate || ""}`,
    `Best contact method: ${customer.contactMethod || ""}`,
    "",
    "Services:",
    services,
    "",
    `Estimated total: ${formatter.format(payload.estimatedTotalCAD)}`,
    "",
    `Notes: ${customer.notes || ""}`
  ].join("\n");
}

function submitQuoteRequest(event) {
  event.preventDefault();
  const payload = buildQuotePayload();
  const subject = encodeURIComponent(`ZS Automotive quote request - ${payload.customer.firstName || "Customer"}`);
  const body = encodeURIComponent(buildEmailBody(payload));
  window.location.href = `mailto:${QUOTE_EMAIL}?subject=${subject}&body=${body}`;
  showToast("Quote request ready to send.");
}

function populateServiceSelects() {
  const options = '<option value="">Pick a service</option>' + categories.flatMap((category) => (
    category.services.map((service) => `<option value="${category.label}: ${service.name}">${category.label}: ${service.name}</option>`)
  )).join("");

  $('#heroService').innerHTML = options;
  serviceNeededSelect.innerHTML = options;
}

function syncHeroQuoteToForm() {
  const heroVehicle = $('#heroVehicle').value.trim();
  const heroService = $('#heroService').value;
  const heroPostal = $('#heroPostal').value.trim();

  if (heroVehicle) {
    const parts = heroVehicle.split(/\s+/);
    if (/^\d{4}$/.test(parts[0])) {
      $('#vehicleYear').value = parts.shift();
    }
    if (parts.length) {
      $('#vehicleMake').value = parts.shift() || "";
      $('#vehicleModel').value = parts.join(" ");
    }
  }

  if (heroService) {
    serviceNeededSelect.value = heroService;
  }

  if (heroPostal) {
    $('#postalCode').value = heroPostal;
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function setupMobileMenu() {
  const button = $('.mobile-menu-button');
  const navLinks = $('#navLinks');

  button.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });

  $$('#navLinks a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    });
  });
}

serviceSelect.addEventListener('change', syncConditionalOptions);
$('#addToQuoteButton').addEventListener('click', addCurrentItemToQuote);
$('#clearQuoteButton').addEventListener('click', clearQuote);
$('#quoteForm').addEventListener('submit', submitQuoteRequest);
$('#heroQuoteButton').addEventListener('click', syncHeroQuoteToForm);
$('#year').textContent = new Date().getFullYear();

renderServiceCards();
renderTabs();
renderServiceOptions();
renderQuote();
populateServiceSelects();
setupMobileMenu();
