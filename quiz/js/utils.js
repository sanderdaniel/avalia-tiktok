/**
 * utils.js — Funções utilitárias gerais
 */

// Formata número como moeda (2 casas decimais)
function formatCurrency(value) {
  return parseFloat(value).toFixed(2);
}

// Número aleatório entre min e max
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Embaralha array (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Atualiza a barra de progresso
function updateProgressBar(currentQuestion, totalQuestions) {
  const progressBar = document.getElementById('progress-bar');
  const pct = (currentQuestion / totalQuestions) * 100;
  progressBar.style.width = `${pct}%`;
}

// Adiciona classe de animação e remove ao terminar
function animateElement(element, animationClass) {
  if (!element) return;
  element.classList.add(animationClass);
  element.addEventListener('animationend', function () {
    element.classList.remove(animationClass);
  }, { once: true });
}
