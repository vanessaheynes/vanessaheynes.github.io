let trims = [];

function start() {
  const n = parseInt(document.getElementById("num_trims").value);
  const container = document.getElementById("inputs");
  container.innerHTML = "";
  trims = [];

  for (let i = 0; i < n; i++) {
    container.innerHTML += `
    <h3>Trim ${i+1}</h3>

    Name: <input id="name${i}"><br>
    Image URL: <input id="img${i}"><br>
    Color: <input id="color${i}"><br>
    Price: <input id="price${i}"><br>

    Bullet 1: <input id="b1_${i}"><br>
    Bullet 2: <input id="b2_${i}"><br>
    Bullet 3: <input id="b3_${i}"><br>
    Bullet 4: <input id="b4_${i}"><br><br>
    `;
  }
}

function buildSlide(slideNumber, price, bullets, image_url, color, trim_name) {

  return `<!-- Slide ${slideNumber} -->
<div class="custom-slide">
    <img src="${image_url}" alt="${color} [VehicleMakeModel] ${trim_name} trim"
     style="max-width:300px; margin:auto; display:block;">

    <h3>[VehicleMakeModel] ${trim_name}</h3>

    <p><strong>Starting Price</strong> at $${price}* | MPG <strong>34/27</strong> <i>hwy/city</i></p>

    <ul>
        <li>${bullets[0]}</li>
        <li>${bullets[1]}</li>
        <li>${bullets[2]}</li>
        <li>${bullets[3]}</li>
    </ul>

<center>
<a href="[InventoryUrl]" target="new"
title="View [VehicleMake] Inventory at [DealerName]"
class="dtl-testdrive-cta ncs-button main-cta test-button">
View Inventory
</a>
</center>

</div>`;
}

function buildSubParagraph(price, bullets) {

  return `<center>Starting MSRP* <strong>${price}</strong> |
MPG** <strong>23/31</strong> <i>city/hwy</i></center>
<br>
<ul align="left">
<li>${bullets[0]}</li>
<li>${bullets[1]}</li>
<li>${bullets[2]}</li>
<li>${bullets[3]}</li>
</ul>
<br>

<center>
<a href="[InventoryUrl]" target="new"
title="View [VehicleMake] Inventory at [DealerName]"
class="dtl-testdrive-cta ncs-button main-cta test-button">
View Inventory
</a>
</center>`;
}

function buildCarousel(slides) {

  let html = `<!-- Carousel HTML Starts -->
<div class="custom-slider-container">
<div class="custom-slider-wrapper">\n`;

  slides.forEach(s => {
    html += s + "\n\n";
  });

  html += `<!-- Dot Indicators -->
<div class="custom-dots">
<span class="custom-dot active"></span>\n`;

  for (let i = 1; i < slides.length; i++) {
    html += `<span class="custom-dot"></span>\n`;
  }

  html += `</div>
</div>
</div>`;

  return html;
}

function generate() {

  const n = parseInt(document.getElementById("num_trims").value);

  let slides = [];
  let paragraphs = [];

  for (let i = 0; i < n; i++) {

    let name = document.getElementById(`name${i}`).value;
    let img = document.getElementById(`img${i}`).value;
    let color = document.getElementById(`color${i}`).value;
    let price = document.getElementById(`price${i}`).value;

    let bullets = [
      document.getElementById(`b1_${i}`).value,
      document.getElementById(`b2_${i}`).value,
      document.getElementById(`b3_${i}`).value,
      document.getElementById(`b4_${i}`).value
    ];

    slides.push(buildSlide(i+1, price, bullets, img, color, name));
    paragraphs.push(buildSubParagraph(price, bullets));
  }

  let output = buildCarousel(slides);

  output += "\n\n<!-- INDIVIDUAL SUB PARAGRAPHS PER TRIM -->\n\n";

  paragraphs.forEach(p => {
    output += p + "\n\n";
  });

  document.getElementById("output").textContent = output;
}