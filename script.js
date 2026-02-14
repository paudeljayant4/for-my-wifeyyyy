const compliments = [
  'You make ordinary moments feel magical.',
  'Your smile is my favorite sight in the world.',
  'You are the kindest heart I have ever known.',
  'Everything feels better when I am with you.',
  'You are my forever person, and my best decision.'
];

const dateIdeas = [
  'Sunset walk + ice cream date 🍦',
  'Movie night with your favorite snacks 🍿',
  'Late-night drive with our playlist 🚗',
  'Coffee date and bookstore stroll ☕',
  'Cook dinner together and dance in the kitchen 💃'
];

const complimentEl = document.getElementById('compliment');
const nextBtn = document.getElementById('nextCompliment');
const kissesLayer = document.querySelector('.kisses');
const quizButtons = document.querySelectorAll('.quiz-btn');
const loveMeter = document.getElementById('loveMeter');
const meterText = document.getElementById('meterText');
const dateIdeaBtn = document.getElementById('dateIdeaBtn');
const dateIdeaEl = document.getElementById('dateIdea');

let complimentIndex = 0;
let loveScore = 0;
let kissInterval = null;

nextBtn.addEventListener('click', () => {
  complimentEl.textContent = compliments[complimentIndex];
  complimentIndex = (complimentIndex + 1) % compliments.length;
  pulseKisses(10);
});

dateIdeaBtn.addEventListener('click', () => {
  const randomIdea = dateIdeas[Math.floor(Math.random() * dateIdeas.length)];
  dateIdeaEl.textContent = randomIdea;
  pulseKisses(12);
});

quizButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const points = Number(button.dataset.points);
    loveScore = Math.min(100, loveScore + points);
    loveMeter.style.width = `${loveScore}%`;
    meterText.textContent = `Love Meter: ${loveScore}%`;

    if (loveScore >= 100) {
      meterText.textContent = 'Love Meter: 100% — You + Me = Forever 💍';
      pulseKisses(22);
    } else {
      pulseKisses(10);
    }
  });
});

document.addEventListener('click', (event) => {
  if (event.target.tagName.toLowerCase() === 'button') {
    return;
  }

  burstAt(event.clientX, event.clientY);
});

function pulseKisses(amount = 10) {
  for (let i = 0; i < amount; i += 1) {
    spawnKiss({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 24,
      duration: 4 + Math.random() * 3,
      size: 0.9 + Math.random() * 1.1
    });
  }
}

function burstAt(x, y) {
  for (let i = 0; i < 9; i += 1) {
    spawnKiss({
      x: x + (Math.random() - 0.5) * 85,
      y: y + (Math.random() - 0.5) * 45,
      duration: 2 + Math.random() * 2,
      size: 0.8 + Math.random() * 0.9
    });
  }
}

function spawnKiss({ x, y, duration, size }) {
  const kiss = document.createElement('span');
  kiss.className = 'kiss';
  kiss.textContent = Math.random() > 0.5 ? '💋' : '😘';
  kiss.style.left = `${(x / window.innerWidth) * 100}%`;
  kiss.style.top = `${y}px`;
  kiss.style.animationDuration = `${duration}s`;
  kiss.style.fontSize = `${size}rem`;
  kissesLayer.appendChild(kiss);

  setTimeout(() => {
    kiss.remove();
  }, (duration + 0.5) * 1000);
}

// Initialize continuous kiss animation after a short delay
window.addEventListener('load', () => {
  kissInterval = setInterval(() => {
    spawnKiss({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 24,
      duration: 6 + Math.random() * 3,
      size: 0.75 + Math.random() * 1
    });
  }, 950);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (kissInterval) clearInterval(kissInterval);
});