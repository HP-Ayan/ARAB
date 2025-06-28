// Floating hearts animation
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerText = '💖';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${3 + Math.random() * 3}s`;
  document.querySelector('.hearts-container').appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

setInterval(createHeart, 300);

// Inject heart animation styles
const heartStyle = document.createElement('style');
heartStyle.innerHTML = `
.heart {
  position: absolute;
  bottom: -20px;
  font-size: 1.2rem;
  color: pink;
  animation: floatUp ease-in forwards;
  z-index: 0;
}
@keyframes floatUp {
  0%   { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-120vh) scale(0.5); opacity: 0; }
}`;
document.head.appendChild(heartStyle);

// Romantic theme background color sets
const themes = [
  ['#ffdee9', '#b5fffc'],
  ['#fbc2eb', '#a6c1ee'],
  ['#fddb92', '#d1fdff'],
  ['#fad0c4', '#ffd1ff'],
  ['#ff9a9e', '#fecfef'],
  ['#e0c3fc', '#8ec5fc'],
  ['#ffecd2', '#fcb69f']
];

let currentTheme = 0;

// Set background gradient using CSS variables
function applyTheme(index) {
  const [color1, color2] = themes[index];
  document.documentElement.style.setProperty('--color1', color1);
  document.documentElement.style.setProperty('--color2', color2);
}

// Handle click on "Change Colors"
function changeTheme() {
  currentTheme = (currentTheme + 1) % themes.length;
  applyTheme(currentTheme);
}

// Start first theme on load
applyTheme(currentTheme);
document.getElementById('changeColors').addEventListener('click', changeTheme);

// Navigate to gallery
function enterGallery() {
  window.location.href = "gallery.html";
}
