/* ===============================================================================
                     ANIMATED GRID BACKGROUND WITH WAVING EFFECT
   ================================================================================ */


const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

let width, height;
const squareSize = 80;
const grid = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initGrid();
}

window.addEventListener("resize", resizeCanvas);

function initGrid() {
  grid.length = 0;

  for (let x = 0; x < width; x += squareSize) {
    for (let y = 0; y < height; y += squareSize) {
      grid.push({ x, y });
    }
  }
}

let travelOffset = 0;

function drawGrid() {
  ctx.clearRect(0, 0, width, height);

  travelOffset += 1.5; // speed

  for (let i = 0; i < grid.length; i++) {
    const cell = grid[i];

    const wave = Math.sin((cell.y + travelOffset) * 0.02);
    const alpha = (wave + 1) / 2;

    const centerX = cell.x + squareSize / 2;
    const centerY = cell.y + squareSize / 2;

    const gradient = ctx.createRadialGradient(
      centerX, centerY, 5,
      centerX, centerY, squareSize
    );

    gradient.addColorStop(0, `rgba(0, 255, 204, ${alpha})`);
    gradient.addColorStop(1, `rgba(0, 255, 204, 0)`);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.2;

    ctx.strokeRect(
      cell.x + 0.5,
      cell.y + 0.5,
      squareSize - 1,
      squareSize - 1
    );
  }

  requestAnimationFrame(drawGrid);
}

// START
resizeCanvas();
drawGrid();


/* ===============================================================================
                         CUSTOM CURSOR WITH RING & DOT
   ================================================================================ */

const ring = document.querySelector(".cursor-ring");
const dot = document.querySelector(".cursor-dot");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  /* Ring smoothly follows mouse */
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;

  /* Dot is based on ring position — cannot escape */
  const offsetX = (mouseX - ringX) * 0.25;  // tiny internal drift
  const offsetY = (mouseY - ringY) * 0.25;

  ring.style.left = `${ringX}px`;
  ring.style.top = `${ringY}px`;

  dot.style.left = `${ringX + offsetX}px`;
  dot.style.top = `${ringY + offsetY}px`;

  requestAnimationFrame(animate);
}

animate();


/* ===============================================================================
                      BUTTON TOGGLE BETWEEN JEWEL & JELWIN SECTIONS
   ================================================================================ */


// Select ALL Jewel & Jelwin buttons
const jewelBtns = document.querySelectorAll(".jewel-btn");
const jelwinBtns = document.querySelectorAll(".jelwin-btn");

// Select sections
const jewelSection = document.getElementById("jewel-section");
const jelwinSection = document.getElementById("jelwin-section");
const parentsSection = document.querySelector(".parents-section");

// Default state
jewelSection.style.display = "none";
jelwinSection.style.display = "none";
parentsSection.style.display = "block";

// Jewel button click (for ALL jewel buttons)
jewelBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    jewelSection.style.display = "block";
    jelwinSection.style.display = "none";
    parentsSection.style.display = "none";
  });
});

// Jelwin button click (for ALL jelwin buttons)
jelwinBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    jewelSection.style.display = "none";
    jelwinSection.style.display = "block";
    parentsSection.style.display = "none";

  });
});


/* ===============================================================================
                      PROGRESS SYSTEM FOR ACCORDION VERSION
   ================================================================================ */

// Disable all checkboxes (parents cannot edit)
document.querySelectorAll(".accordion input[type='checkbox']")
  .forEach(cb => {
    cb.addEventListener("click", e => e.preventDefault());
  });

/* ---------- CREATE PROGRESS BAR FOR EACH SUBJECT ---------- */

function initializeProgress() {

  // Select both Jewel & Jelwin accordions
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach(accordion => {

    const items = accordion.querySelectorAll(".accordion-item");

    items.forEach(item => {

      const body = item.querySelector(".accordion-body");
      if (!body) return;

      // Create progress container
      const progressContainer = document.createElement("div");
      progressContainer.className = "subject-progress mb-3";

      progressContainer.innerHTML = `
        <div class="progress-text fw-semibold mb-1">Progress: 0%</div>
        <div class="progress">
          <div class="progress-bar" style="width:0%"></div>
        </div>
      `;

      // Insert at TOP of accordion body
      body.insertBefore(progressContainer, body.firstChild);
    });

  });

}

initializeProgress();


/* ==========================================================
   BACKEND PROGRESS SYSTEM (LIKE SECOND CODE)
   ========================================================== */
  
  updateAllProgress();
  

/* ==========================================================
   UPDATE PROGRESS BASED ON CHECKED BOXES
   ========================================================== */

   function updateAllProgress() {

    document.querySelectorAll(".accordion-item").forEach(item => {
  
      const checkboxes = item.querySelectorAll("input[type='checkbox']");
      const progressBar = item.querySelector(".progress-bar");
      const progressText = item.querySelector(".progress-text");
  
      if (!checkboxes.length || !progressBar) return;
  
      const total = checkboxes.length;
      const checked = item.querySelectorAll("input[type='checkbox']:checked").length;
  
      const percent = Math.round((checked / total) * 100);
  
      progressBar.style.width = percent + "%";
      progressText.textContent = `Progress: ${percent}%`;
  
    });
  
  }