/**
 * confetti.js — Animação de confetes para celebração
 */

const confettiContainer = document.getElementById('confetti-container');
const confettiColors = [
  '#ff0000', '#ff4500', '#ff6b00', '#ff9100', '#ffb700',
  '#ffe100', '#adff00', '#56ff00', '#00ff15', '#00ff91',
  '#00ffd5', '#00c3ff', '#0099ff', '#0051ff', '#0000ff',
  '#5100ff', '#9100ff', '#cb00ff', '#ff00f2', '#ff0099'
];

const confettiCount   = 150;
const gravity         = 0.8;
const terminalVelocity = 5;

class Confetti {
  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * -window.innerHeight;
    this.w = getRandomNumber(6, 12);
    this.h = getRandomNumber(6, 12);
    this.rotation = Math.random() * 360;
    this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    this.rotationSpeed = getRandomNumber(-10, 10);
    this.speedX = getRandomNumber(-3, 3);
    this.speedY = getRandomNumber(2, 6);
    this.resistance = getRandomNumber(0.93, 0.95);

    this.element = document.createElement('div');
    this.element.style.cssText = `
      position: absolute;
      background-color: ${this.color};
      width: ${this.w}px;
      height: ${this.h}px;
      opacity: 0.8;
    `;

    // Formas aleatórias
    if (Math.random() > 0.5) {
      this.element.style.borderRadius = '50%';
    } else if (Math.random() > 0.5) {
      this.element.style.width  = `${this.w * 2}px`;
      this.element.style.height = `${this.h / 2}px`;
    }

    confettiContainer.appendChild(this.element);
  }

  update() {
    this.speedY += gravity;
    if (this.speedY > terminalVelocity) this.speedY = terminalVelocity;
    this.speedX *= this.resistance;
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
    this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;

    if (this.y > window.innerHeight * 1.5) {
      this.element.remove();
      return false;
    }
    return true;
  }
}

let confettiArray = [];
let animationFrame;

function startConfetti() {
  stopConfetti();
  confettiArray = Array.from({ length: confettiCount }, () => new Confetti());
  animateConfetti();
}

function animateConfetti() {
  confettiArray = confettiArray.filter(c => c.update());
  if (confettiArray.length > 0) {
    animationFrame = requestAnimationFrame(animateConfetti);
  }
}

function stopConfetti() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
  while (confettiContainer.firstChild) {
    confettiContainer.removeChild(confettiContainer.firstChild);
  }
  confettiArray = [];
}
