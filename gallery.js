const carousel = document.getElementById("carousel");
const images = carousel.querySelectorAll("img");
const total = images.length;

let angle = 0;
let velocity = 0;

// Assign each image a base angle
images.forEach((img, i) => {
  const rotate = (360 / total) * i;
  img.dataset.angle = rotate;
  img.style.transform = `rotateY(${rotate}deg) translateZ(500px)`;
});

// Scroll / drag logic
document.addEventListener("wheel", (e) => {
  e.preventDefault();
  velocity += e.deltaY * 0.02;
}, { passive: false });

let isDragging = false;
let startX = 0;

function onDragStart(x) {
  isDragging = true;
  startX = x;
}

function onDragMove(x) {
  if (!isDragging) return;
  const delta = x - startX;
  angle += delta * 0.2;
  startX = x;
  updateCarousel();
}

function onDragEnd() {
  isDragging = false;
}

carousel.addEventListener("mousedown", e => onDragStart(e.clientX));
carousel.addEventListener("mousemove", e => onDragMove(e.clientX));
carousel.addEventListener("mouseup", onDragEnd);
carousel.addEventListener("mouseleave", onDragEnd);
carousel.addEventListener("touchstart", e => onDragStart(e.touches[0].clientX));
carousel.addEventListener("touchmove", e => onDragMove(e.touches[0].clientX));
carousel.addEventListener("touchend", onDragEnd);

// Arrow key navigation
document.addEventListener("keydown", (e) => {
  const step = 360 / total;

  if (e.key === "ArrowRight") {
    angle -= step;
    velocity = 0;
    updateCarousel();
  } else if (e.key === "ArrowLeft") {
    angle += step;
    velocity = 0;
    updateCarousel();
  }
});

// Animation loop
function animate() {
  angle += velocity;
  velocity *= 0.9;
  updateCarousel();
  requestAnimationFrame(animate);
}

function updateCarousel() {
  carousel.style.transform = `rotateY(${angle}deg)`;

  let maxDiff = -1;
  let backImage = null;

  images.forEach(img => {
    const baseAngle = parseFloat(img.dataset.angle);
    let currentAngle = (baseAngle + angle) % 360;
    if (currentAngle < 0) currentAngle += 360;

    // Find the image farthest from the front (closest to 180°)
    let diff = Math.abs(currentAngle - 180);
    if (diff > 180) diff = 360 - diff;

    if (diff > maxDiff) {
      maxDiff = diff;
      backImage = img;
    }
  });

  images.forEach(img => {
    if (img === backImage) {
      img.classList.remove("transparent-front");
    } else {
      img.classList.add("transparent-front");
    }
  });
}

animate();
