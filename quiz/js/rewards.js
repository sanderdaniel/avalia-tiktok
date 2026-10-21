/**
 * rewards.js — Distribuição e exibição das recompensas
 */

const TOTAL_REWARD  = 559.51;
const NUM_QUESTIONS = 11;

// Som de dinheiro (opcional — coloque um arquivo cash.mp3 em /media/)
const moneySound = new Audio('media/cash.mp3');
moneySound.volume = 0.6;

// Gera distribuição aleatória que soma exatamente TOTAL_REWARD
function generateRewards() {
  const rewards = [];
  let remainingTotal     = TOTAL_REWARD;
  let remainingQuestions = NUM_QUESTIONS;

  for (let i = 0; i < NUM_QUESTIONS; i++) {
    if (i === NUM_QUESTIONS - 1) {
      rewards.push(Math.round(remainingTotal * 100) / 100);
    } else {
      const max    = (remainingTotal / remainingQuestions) * 1.5;
      const min    = (remainingTotal / remainingQuestions) * 0.5;
      const reward = Math.round(getRandomNumber(min, max) * 100) / 100;
      rewards.push(reward);
      remainingTotal     -= reward;
      remainingQuestions--;
    }
  }

  const shuffled = shuffleArray(rewards.slice(0, -1));
  shuffled.push(rewards[rewards.length - 1]);
  return shuffled;
}

// Referências ao DOM
const rewardModal       = document.getElementById('reward-modal');
const rewardValue       = document.getElementById('reward-value');
const continueRewardBtn = document.getElementById('continue-reward-btn');
const currentBalance    = document.getElementById('current-balance');
const finalModal        = document.getElementById('final-modal');
const totalRewardEl     = document.getElementById('total-reward');
const restartBtn        = document.getElementById('restart-btn');

// Estado
let rewards     = generateRewards();
let totalEarned = 0;

// Anima contagem de número
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = formatCurrency(progress * (end - start) + start);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Exibe modal de recompensa
function showReward(questionIndex) {
  const reward = rewards[questionIndex];
  totalEarned += reward;

  animateValue(currentBalance, totalEarned - reward, totalEarned, 1000);

  rewardValue.textContent = '0.00';
  rewardModal.classList.add('active');

  setTimeout(() => {
    startConfetti();
    moneySound.play().catch(() => {}); // ignora erro se autoplay bloqueado
    animateValue(rewardValue, 0, reward, 1000);
  }, 100);

  const rewardAmountEl = document.querySelector('#reward-modal .reward-amount');
  if (rewardAmountEl) animateElement(rewardAmountEl, 'bounce');
}

// Esconde modal de recompensa
function hideReward() {
  rewardModal.classList.remove('active');
  stopConfetti();
}

// Exibe modal final
function showFinalReward() {
  totalRewardEl.textContent = '0.00';
  finalModal.classList.add('active');

  setTimeout(() => {
    startConfetti();
    moneySound.play().catch(() => {});
    animateValue(totalRewardEl, 0, TOTAL_REWARD, 2000);
  }, 100);

  const finalAmountEl = document.querySelector('#final-modal .reward-amount');
  if (finalAmountEl) animateElement(finalAmountEl, 'bounce');
}

// Esconde modal final
function hideFinalReward() {
  finalModal.classList.remove('active');
  stopConfetti();
}

// Event listeners
continueRewardBtn.addEventListener('click', () => {
  hideReward();
  nextQuestion();
});

restartBtn.addEventListener('click', () => {
  hideFinalReward();
  showPage('withdraw');
});
