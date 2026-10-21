/**
 * quiz.js — Perguntas e lógica do quiz
 */

const quizQuestions = [
  {
    id: 1,
    question: "Como você avalia sua experiência geral no TikTok?",
    options: [
      { emoji: "😍", text: "Excelente" },
      { emoji: "😊", text: "Boa" },
      { emoji: "😐", text: "Regular" },
      { emoji: "😒", text: "Ruim" }
    ]
  },
  {
    id: 2,
    question: "Qual é o seu formato de vídeo favorito no TikTok?",
    options: [
      { emoji: "🎥", text: "Vídeo curto" },
      { emoji: "📹", text: "Vídeo médio" },
      { emoji: "⏳", text: "Vídeo longo" },
      { emoji: "📺", text: "Live" }
    ]
  },
  {
    id: 3,
    question: "Como você descobre novos vídeos no TikTok?",
    options: [
      { emoji: "🎯", text: "Feed \"Para você\"" },
      { emoji: "👤", text: "Seguindo criadores" },
      { emoji: "🔍", text: "Através de hashtags" },
      { emoji: "📜", text: "Feed \"Seguindo\"" },
      { emoji: "💡", text: "Recomendações" }
    ]
  },
  {
    id: 4,
    question: "Quantas horas por dia você passa no TikTok?",
    options: [
      { emoji: "⏳", text: "Menos de 1 hora" },
      { emoji: "⏳", text: "1 a 2 horas" },
      { emoji: "⏳", text: "2 a 4 horas" },
      { emoji: "⏳", text: "4 a 6 horas" },
      { emoji: "⏳", text: "Mais de 6 horas" }
    ]
  },
  {
    id: 5,
    question: "O que te faz seguir um criador no TikTok?",
    options: [
      { emoji: "🎉", text: "Conteúdo divertido" },
      { emoji: "📚", text: "Conteúdo educativo" },
      { emoji: "🤝", text: "Conexão pessoal" },
      { emoji: "🔥", text: "Participação em desafios" },
      { emoji: "📅", text: "Frequência de postagens" }
    ]
  },
  {
    id: 6,
    question: "Qual desses temas de conteúdo você mais gosta de assistir no TikTok?",
    options: [
      { emoji: "😂", text: "Comédia" },
      { emoji: "💃", text: "Dança" },
      { emoji: "ℹ️", text: "Tutoriais e dicas" },
      { emoji: "📹", text: "Vlogs diários" },
      { emoji: "💄", text: "Moda e beleza" }
    ]
  },
  {
    id: 7,
    question: "Qual horário do dia você mais usa o TikTok?",
    options: [
      { emoji: "🌅", text: "Manhã" },
      { emoji: "🌞", text: "Tarde" },
      { emoji: "🌜", text: "Noite" },
      { emoji: "🌙", text: "Madrugada" }
    ]
  },
  {
    id: 8,
    question: "Qual seção do TikTok você mais acessa?",
    options: [
      { emoji: "🎯", text: "Para Você" },
      { emoji: "👥", text: "Seguindo" },
      { emoji: "📺", text: "TikTok Live" },
      { emoji: "🔍", text: "Descobrir" },
      { emoji: "➕", text: "Outro" }
    ]
  },
  {
    id: 9,
    question: "Com que frequência você comenta em vídeos do TikTok?",
    options: [
      { emoji: "🔄", text: "Sempre" },
      { emoji: "📆", text: "Frequentemente" },
      { emoji: "⏳", text: "Às vezes" },
      { emoji: "🌧️", text: "Raramente" },
      { emoji: "🚫", text: "Nunca" }
    ]
  },
  {
    id: 10,
    question: "Que tipo de interação você mais faz nos vídeos do TikTok?",
    options: [
      { emoji: "👍", text: "Curtir" },
      { emoji: "💬", text: "Comentar" },
      { emoji: "🔄", text: "Compartilhar" },
      { emoji: "📌", text: "Salvar" },
      { emoji: "🚫", text: "Nenhuma" }
    ]
  },
  {
    id: 11,
    question: "Qual é a sua faixa etária?",
    options: [
      { emoji: "🧑‍🎓", text: "13-17 anos" },
      { emoji: "🎉", text: "18-24 anos" },
      { emoji: "👩‍💼", text: "25-34 anos" },
      { emoji: "👵", text: "35 anos ou mais" }
    ]
  }
];

// Estado do quiz
let currentQuestionIndex = 0;
let selectedOption = null;
const quizContainer = document.getElementById('quiz-container');

// Renderiza uma pergunta
function renderQuestion(questionIndex) {
  const question = quizQuestions[questionIndex];

  updateProgressBar(questionIndex, quizQuestions.length);

  quizContainer.innerHTML = `
    <div class="quiz-title">${question.question}</div>
    <div class="quiz-subtitle">Selecione uma opção para continuar:</div>
    <div class="options-container">
      ${question.options.map((opt, i) => `
        <div class="option" data-index="${i}">
          <div class="option-content">
            <div class="option-emoji">${opt.emoji}</div>
            <div class="option-text">${opt.text}</div>
          </div>
          <div class="custom-checkbox"></div>
        </div>
      `).join('')}
    </div>
    <button id="continue-btn" class="continue-btn" disabled>Continuar</button>
    <div class="bonus-text">Concorra a um bônus adicional</div>
    <div class="divider"></div>
  `;

  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    option.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      document.getElementById('continue-btn').disabled = false;
      selectedOption = parseInt(option.dataset.index);
    });
  });

  document.getElementById('continue-btn').addEventListener('click', () => {
    if (selectedOption !== null) {
      showReward(currentQuestionIndex);
    }
  });

  animateElement(quizContainer, 'fade-in');
}

// Avança para a próxima pergunta
function nextQuestion() {
  currentQuestionIndex++;
  selectedOption = null;

  if (currentQuestionIndex < quizQuestions.length) {
    renderQuestion(currentQuestionIndex);
  } else {
    showFinalReward();
  }
}

// Reinicia o quiz
function resetQuiz() {
  currentQuestionIndex = 0;
  selectedOption = null;
  totalEarned = 0;
  rewards = generateRewards();
  currentBalance.textContent = '0';
  renderQuestion(currentQuestionIndex);
}
