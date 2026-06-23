const QUOTE_EMAIL = "info@zsautomotive.ca";

const categories = [
  {
    id: "tires",
    label: "Tires",
    kicker: "Tire service",
    cardPrice: "Starting at $70",
    description: "Seasonal tire swap, tire rotation, tires sale, balancing, plug/patch repair, valve stems, TPMS and Reseal.",
    services: [
      { id: "on-rim", name: "On Rim Swap / Tire Rotation", price: 70, detail: "From $70/set" },
      { id: "off-rim", name: "Off Rim", price: 100, detail: "Starting at $100" },
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
    cardPrice: "Brake Service start at $375",
    description: "Front and rear brake jobs, with vehicle-specific pricing and optional warranty coverage.",
    services: [
      { id: "front-brakes", name: "Front Brake Service", price: 425, detail: "From $425, vehicle fitment may vary" },
      { id: "rear-brakes", name: "Rear Brake Service", price: 375, detail: "From $375, vehicle fitment may vary" }
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
  }
];

const googleReviews = [
  {
    name: "Yuri Menko",
    meta: "Local Guide • 59 reviews • 567 photos",
    date: "2 months ago",
    avatar: "Y",
    color: "red",
    text: "Great experience at this shop. The staff were friendly, honest, and explained everything clearly. I had problem with EPP brake. The work was done on time and the price was fair. My car runs great now. I'll definitely come back and would recommend this place to others.",
    preview: "Friendly, honest staff who explained everything clearly. The work was done on time and the price was fair."
  },
  {
    name: "Sushil Gaur",
    meta: "Local Guide • 41 reviews • 73 photos",
    date: "2 months ago",
    avatar: "S",
    color: "green",
    text: "Highly recommend ZS Automotive. Even though I live in Oakville, I went to Etobicoke after both the Volvo dealership and Mr. Lube failed to diagnose my low tire pressure warning. ZS Automotive found a hairline leak caused by part of a screw lodged in the tire wall area. Their focus was solving the problem, not just the ticket value.",
    preview: "They found a tire issue others missed and focused on solving the problem, not just the ticket value."
  },
  {
    name: "Marsela Gega",
    meta: "6 reviews",
    date: "4 months ago",
    avatar: "M",
    color: "pink",
    text: "I came in for a second opinion after being advised elsewhere that my car needed several repairs. The mechanic inspected the vehicle carefully and explained everything was safe and functioning properly, without pushing unnecessary services.",
    preview: "A careful second opinion with clear explanations and no unnecessary services pushed."
  },
  {
    name: "Ali Naseer",
    meta: "Local Guide • 58 reviews • 30 photos",
    date: "6 months ago",
    avatar: "A",
    color: "blue",
    text: "Great experience at ZS Automotive. Took my car in for basic servicing and was very happy with the time taken, price, and post service drive home. Will recommend.",
    preview: "Basic service done with good timing, fair pricing, and a positive post-service drive home."
  },
  {
    name: "Patrick Kwok",
    meta: "Local Guide • 127 reviews • 28 photos",
    date: "3 months ago",
    avatar: "P",
    color: "dark",
    text: "These guys are incredible. They are now my go-to for my Jaguar. They do everything by the book at very reasonable prices. It's hard to find honest mechanics these days and I'm happy to finally found one.",
    preview: "By-the-book work, reasonable prices, and honest service for a Jaguar owner."
  },
  {
    name: "TK",
    meta: "Local Guide • 37 reviews • 1 photo",
    date: "4 months ago",
    avatar: "TK",
    color: "slate",
    text: "Zubain and team are awesome. I was referred by a friend who gets all of his car's work done at the shop. They fixed an issue with my CRV at a good rate.",
    preview: "Referred by a friend and had a CRV issue fixed at a good rate."
  },
  {
    name: "Jove Cana",
    meta: "Local Guide • 91 reviews • 196 photos",
    date: "a month ago",
    avatar: "J",
    color: "teal",
    text: "Great experience. Friendly people. Very upfront about service and pricing. Were able to accommodate a tire change on short notice. Fast turnaround. Highly recommended!",
    preview: "Friendly, upfront about service and pricing, with a fast tire change on short notice."
  },
  {
    name: "Jessica Wong",
    meta: "12 reviews • 1 photo",
    date: "7 months ago",
    avatar: "J",
    color: "purple",
    text: "Amazing service and so quick! They replaced my brake pads and rotor within a few hours. Great customer service, would come back again.",
    preview: "Brake pads and rotor replaced within a few hours, with great customer service."
  },
  {
    name: "tizi",
    meta: "15 reviews • 1 photo",
    date: "a month ago",
    avatar: "t",
    color: "rose",
    text: "Super nice guys working here did their job well and fast. Got my tire fixed up quick after it was making an awful grinding sound on the highway.",
    preview: "A tire issue was fixed quickly after it started making a grinding sound on the highway."
  }
];

let activeCategoryId = "tires";
let quoteItems = JSON.parse(localStorage.getItem("zsAutoQuoteItems") || "[]");
let activeReviewIndex = 0;

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
const rimSizeOptions = $("#rimSizeOptions");
const rimSizeSelect = $("#rimSizeSelect");
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

function getServicePrice(service) {
  if (service.id === "off-rim") {
    return Number(rimSizeSelect.value) || service.price;
  }

  return service.price;
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
    <option value="${service.id}">${service.name} — ${formatter.format(getServicePrice(service))}</option>
  `).join("");

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

  rimSizeOptions.classList.toggle("hidden", category.id !== "tires" || service.id !== "off-rim");
  oilOptions.classList.toggle("hidden", category.id !== "oil" || !service.extraLitre);
  warrantyOptions.classList.toggle("hidden", category.id !== "brakes" || service.id === "warranty");
}

function updateServiceOptionPrices() {
  const selectedValue = serviceSelect.value;
  const activeCategory = getActiveCategory();

  activeCategory.services.forEach((service) => {
    const option = serviceSelect.querySelector(`option[value="${service.id}"]`);
    if (option) {
      option.textContent = `${service.name} — ${formatter.format(getServicePrice(service))}`;
    }
  });

  serviceSelect.value = selectedValue;
}

function calculateCurrentItem() {
  const category = getActiveCategory();
  const service = getSelectedService();
  const extraLitres = Math.max(0, Number($('#extraLitres').value) || 0);
  const premiumFilter = Number($('#premiumFilter').value) || 0;
  const warranty = $('#warrantyCheckbox').checked ? 100 : 0;

  let basePrice = getServicePrice(service);
  const details = [service.id === "off-rim" ? `Starting at ${formatter.format(basePrice)}` : service.detail];

  if (service.id === "off-rim") {
    details.push(`${rimSizeSelect.selectedOptions[0].textContent} rim size`);
  }

  if (category.id === "oil" && service.extraLitre) {
    basePrice += extraLitres * service.extraLitre;
    if (extraLitres > 0) details.push(`${extraLitres} extra litre(s)`);
    if (premiumFilter > 0) details.push("Premium filter included");
  }

  if (category.id === "brakes" && warranty) {
    details.push("1-year extended warranty included");
  }

  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    category: category.label,
    service: service.name,
    price: basePrice + premiumFilter + warranty,
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
          <small>${item.category}</small>
          <small>${item.details}</small>
        </div>
        <button class="remove-item" type="button" aria-label="Remove ${item.service}" data-remove="${item.id}">×</button>
      </div>
      <strong>${formatter.format(item.price)}</strong>
    </article>
  `).join("");

  selectedServicesPreview.innerHTML = `
    <ul>
      ${quoteItems.map((item) => `<li>${item.service} — ${formatter.format(item.price)}</li>`).join("")}
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
    ? payload.quoteItems.map((item) => `- ${item.service}: ${formatter.format(item.price)} (${item.details})`).join("\n")
    : customer.serviceNeeded || "No service selected";

  return [
    "New ZS Automotive quote request",
    "",
    `Name: ${customer.firstName || ""} ${customer.lastName || ""}`,
    `Phone: ${customer.phone || ""}`,
    `Email: ${customer.email || ""}`,
    `Plate number: ${customer.plateNumber || ""}`,
    `Preferred date: ${customer.preferredDate || ""}`,
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
  const heroPlate = $('#heroPlate').value.trim();
  const heroService = $('#heroService').value;
  const heroPhone = $('#heroPhone').value.trim();

  if (heroService) {
    serviceNeededSelect.value = heroService;
  }

  if (heroPlate) {
    $('#plateNumber').value = heroPlate;
  }

  if (heroPhone) {
    $('#phone').value = heroPhone;
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

function getReviewByOffset(offset) {
  return googleReviews[(activeReviewIndex + offset + googleReviews.length) % googleReviews.length];
}

function renderReviewHeader(review) {
  return `
    <div class="review-card__top">
      <span class="review-avatar review-avatar-${review.color}">${review.avatar}</span>
      <div><strong>${review.name}</strong><span>${review.meta}</span></div>
    </div>
  `;
}

function renderReviewStars(review) {
  return `<div class="review-stars" aria-label="5 out of 5 stars">★★★★★ <span>${review.date}</span></div>`;
}

function renderReviewCarousel() {
  const carousel = $('.review-carousel');
  const spotlight = $('#reviewSpotlight');
  const previewStack = $('#reviewPreviewStack');
  const dots = $('#reviewDots');

  if (!spotlight || !previewStack || !dots) return;

  const activeReview = getReviewByOffset(0);

  spotlight.innerHTML = `
    ${renderReviewHeader(activeReview)}
    ${renderReviewStars(activeReview)}
    <p>${activeReview.text}</p>
  `;

  previewStack.innerHTML = [1, 2, 3].map((offset) => {
    const review = getReviewByOffset(offset);
    return `
      <article class="review-preview-card">
        ${renderReviewHeader(review)}
        ${renderReviewStars(review)}
        <p>${review.preview}</p>
      </article>
    `;
  }).join("");

  dots.innerHTML = googleReviews.map((review, index) => `
    <button class="review-dot ${index === activeReviewIndex ? "active" : ""}" type="button" aria-label="Show ${review.name} review" data-review-index="${index}"></button>
  `).join("");

  $$('[data-review-index]').forEach((button) => {
    button.addEventListener('click', () => {
      activeReviewIndex = Number(button.dataset.reviewIndex) || 0;
      renderReviewCarousel();
    });
  });

  if (carousel) {
    carousel.classList.remove("animate-review");
    void carousel.offsetWidth;
    carousel.classList.add("animate-review");
  }
}

function setupReviewCarousel() {
  const previous = $('#previousReview');
  const next = $('#nextReview');

  if (!previous || !next) return;

  previous.addEventListener('click', () => {
    activeReviewIndex = (activeReviewIndex - 1 + googleReviews.length) % googleReviews.length;
    renderReviewCarousel();
  });

  next.addEventListener('click', () => {
    activeReviewIndex = (activeReviewIndex + 1) % googleReviews.length;
    renderReviewCarousel();
  });

  renderReviewCarousel();
}

serviceSelect.addEventListener('change', syncConditionalOptions);
rimSizeSelect.addEventListener('change', updateServiceOptionPrices);
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
setupReviewCarousel();
