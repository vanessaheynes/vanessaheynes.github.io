// =========================
// VARIATIONS (GLOBAL)
// =========================
const variations = {
  v1: {
    newMainURL: (make, cityURL, state) =>
  `/${make}-lease-prices-finance-offers-${cityURL}-${state}-dtw`,

    newMainHeader: (make, city, state) =>
    `${make} Lease Prices & Finance Offers in ${city}, ${state}`,

    newMainMeta: (make, city, state) =>
      `${make} Lease Prices & Finance Offers - ${city} ${state}`,
    
    usedURL: (body, cityURL, state) =>
      `/used-${body}-specials-prices-${cityURL}-${state}-dtw`,

    usedHeader: (body, city, state) =>
      `Used ${body} Offers in ${city}, ${state}`,

    usedMeta: (body, city, state) =>
      `Used ${body} Offers - ${city} ${state}`,

    newURL: (make, model, cityURL, state) =>
      `/${make}-${model}-lease-prices-finance-offers-${cityURL}-${state}-dtw`,

    newHeader: (make, model, city, state) =>
      `${make} ${model} Lease Prices & Finance Offers in ${city}, ${state}`,

    newMeta: (make, model, city, state) =>
      `${make} ${model} Lease Prices & Finance Offers - ${city} ${state}`
  },

  v2: {
    newMainURL: (make, cityURL, state) =>
  `/${make}-lease-finance-prices-${cityURL}-${state}-dtw`,

    newMainHeader: (make, city, state) =>
    `${make} Lease & Finance Prices in ${city}, ${state}`,

    newMainMeta: (make, city, state) =>
      `${make} Lease & Finance Prices - ${city} ${state}`,

    usedURL: (body, cityURL, state) =>
      `/used-${body}-specials-prices-${cityURL}-${state}-dtw`,

    usedHeader: (body, city, state) =>
      `Used ${body} Offers in ${city}, ${state}`,

    usedMeta: (body, city, state) =>
      `Used ${body} Offers - ${city} ${state}`,

    newURL: (make, model, cityURL, state) =>
      `/${make}-${model}-lease-finance-prices-${cityURL}-${state}-dtw`,

    newHeader: (make, model, city, state) =>
      `${make} ${model} Lease & Finance Prices in ${city}, ${state}`,

    newMeta: (make, model, city, state) =>
      `${make} ${model} Lease & Finance Prices - ${city} ${state}`
  },

  v3: {
    newMainURL: (make, cityURL, state) =>
  `/${make}-prices-finance-offers-${cityURL}-${state}-dtw`,

    newMainHeader: (make, city, state) =>
    `${make} Prices & Finance Offers in ${city}, ${state}`,

    newMainMeta: (make, city, state) =>
      `${make} Prices & Finance Offers - ${city} ${state}`,

    usedURL: (body, cityURL, state) =>
      `/used-${body}-specials-prices-${cityURL}-${state}-dtw`,

    usedHeader: (body, city, state) =>
      `Used ${body} Offers in ${city}, ${state}`,

    usedMeta: (body, city, state) =>
      `Used ${body} Offers - ${city} ${state}`,

    newURL: (make, model, cityURL, state) =>
      `/${make}-${model}-prices-finance-offers-${cityURL}-${state}`,

    newHeader: (make, model, city, state) =>
      `${make} ${model} Prices & Finance Offers in ${city}, ${state}`,

    newMeta: (make, model, city, state) =>
      `${make} ${model} Prices & Finance Offers - ${city}, ${state}`
  },

  v4: {
    newMainURL: (make, cityURL, state) =>
  `/${make}-specials-prices-offers-${cityURL}-${state}-dtw`,

    newMainHeader: (make, city, state) =>
    `${make} Special Offers & Prices in ${city}, ${state}`,

    newMainMeta: (make, city, state) =>
      `${make} Special Offers & Prices - ${city} ${state}`,

    usedURL: (body, cityURL, state) =>
      `/used-${body}-specials-prices-${cityURL}-${state}-dtw`,

    usedHeader: (body, city, state) =>
      `Used ${body} Offers in ${city}, ${state}`,

    usedMeta: (body, city, state) =>
      `Used ${body} Offers - ${city} ${state}`,

    newURL: (make, model, cityURL, state) =>
      `/${make}-${model}-specials-prices-offers-${cityURL}-${state}`,

    newHeader: (make, model, city, state) =>
      `${make} ${model} Special Offers & Prices in ${city}, ${state}`,

    newMeta: (make, model, city, state) =>
      `${make} ${model} Special Offers & Prices - ${city}, ${state}`
  }
};

// =========================
// HELPERS
// =========================
function containsMultipleWords(str) {
  return str.trim().split(/\s+/).length > 1;
}

function formatURLPart(str) {
  return containsMultipleWords(str)
    ? str.trim().replace(/\s+/g, "-")
    : str.trim();
}

function renderTable(rows) {
  const container = document.getElementById("tablePreview");

  let html = '<table class="sheet-table">';

  rows.forEach((row, i) => {
    const isHeader = i === 0;
    const isSection =
      row[0] &&
      row[1] === "" &&
      row[2] === "" &&
      row[3] === "";

    html += "<tr>";

    row.forEach(cell => {
      if (isHeader) {
        html += `<th class="sheet-header">${cell}</th>`;
      } else if (isSection) {
        html += `<td class="sheet-section" colspan="7">${cell}</td>`;
      } else {
        html += `<td>${cell || ""}</td>`;
      }
    });

    html += "</tr>";
  });

  html += "</table>";

  container.innerHTML = html;
}

let csvContent = "";

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": new Blob([text], { type: "text/plain" })
      })
    ]);
  } catch (err) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}

// =========================
// MAIN GENERATOR
// =========================
function generate() {
  const variationKey = document.getElementById("variation").value;
  const v = variations[variationKey];

  const make = document.getElementById("make").value.trim();
  const models = document.getElementById("models").value.split(",");
  const city = document.getElementById("city").value.trim();
  const state = document.getElementById("state").value.trim();

  let bodystyles = document
    .getElementById("bodystyles")
    .value.split(",")
    .map(b => b.trim())
    .filter(b => b.length > 0);

  if (!bodystyles.some(b => b.toLowerCase() === "car")) {
    bodystyles.unshift("Car");
  }

  const cityURL = formatURLPart(city);

  // =========================
  // CSV SETUP
  // =========================
  let rows = [];
  const addBlankRow = () => {
  rows.push(["", "", "", "", "", "", ""]);
};

  // HEADER ROW
  rows.push([
    "Navigation Titles",
    "URL Formats",
    "URL Length",
    "Headers",
    "H1 Length",
    "Meta Titles",
    "Meta Lengths"
  ]);

  // Helper
  const addRow = (nav, url, header, meta) => {
    rows.push([
      nav,
      url,
      url.length,
      header,
      header.length,
      meta,
      meta.length
    ]);
  };

  // =========================
  // NEW LEADERBOARD
  // =========================
  rows.push(["New Leaderboard", "", "", "", "", "", ""]);

  // Main NEW
  const newMainURL = v.newMainURL(make, cityURL, state).toLowerCase();
  const newMainHeader = v.newMainHeader(make, cityURL, state);
  const newMainMeta = v.newMainMeta(make, cityURL, state);

  addRow(`New ${make} Offers`, newMainURL, newMainHeader, newMainMeta);

  // Models
  models.forEach(model => {
    const cleanModel = formatURLPart(model);
    const url = v.newURL(make, cleanModel, cityURL, state).toLowerCase();
    const header = v.newHeader(make, model.trim(), city, state);
    const meta = v.newMeta(make, model.trim(), city, state);

    addRow(`New ${make} ${model.trim()} Offers`, url, header, meta);
  });

  // =========================
  // USED LEADERBOARD
  // =========================
  addBlankRow();
  rows.push(["Used Leaderboard", "", "", "", "", "", ""]);


  // Bodystyles (excluding car for nav)
  bodystyles.forEach(body => {
    const url = v.usedURL(body, cityURL, state).toLowerCase();
    const header = v.usedHeader(body, city, state);
    const meta = v.usedMeta(body, city, state);

    const nav =
      body.toLowerCase() === "car"
        ? "Used Offers"
        : `Used ${body} Offers`;

    addRow(nav, url, header, meta);
  });

  // =========================
  // CPO LEADERBOARD
  // =========================
  addBlankRow();
  rows.push(["Certified Pre-Owned Leaderboard", "", "", "", "", "", ""]);

  const cpoURL =
    `/${make}-certified-pre-owned-prices-${cityURL}-${state}-dtw`.toLowerCase();

  const cpoHeader = `${make} Certified Pre-Owned Prices in ${city}, ${state}`;
  const cpoMeta = `${make} Certified Pre-Owned Prices - ${city}, ${state}`;

  addRow(`${make} CPO Offers`, cpoURL, cpoHeader, cpoMeta);

  // =========================
  // SERVICE LEADERBOARD
  // =========================
  addBlankRow();
  rows.push(["Service Leaderboard", "", "", "", "", "", ""]);

  const serviceURL =
    `/${make}-service-specials-${cityURL}-${state}-dtw`.toLowerCase();

  const serviceHeader = `${make} Service Specials in ${city}, ${state}`;
  const serviceMeta = `${make} Service Specials - ${city}, ${state}`;

  addRow("Service Offers", serviceURL, serviceHeader, serviceMeta);

  renderTable(rows);

  // =========================
  // CONVERT TO CSV
  // =========================
   csvContent = rows
  .map(row => row.join("\t"))
  .join("\n");

  
  // OUTPUT
  document.getElementById("output").textContent = csvContent;

  



copyToClipboard(csvContent);
}

