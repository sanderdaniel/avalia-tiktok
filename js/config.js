/**
 * ============================================================
 *  CONFIG.JS — Centralize aqui todos os links e domínios
 * ============================================================
 *
 *  1. EXIT_URL      → domínio para o qual o usuário é redirecionado
 *                     ao tentar sair (botão voltar / popstate)
 *
 *  2. OFFER_URL     → link do botão "DESBLOQUEAR AGORA" na página
 *                     de vídeo e na página de cadastro
 *
 *  3. UPSELL_URL    → link da oferta de upsell
 *                     Configure esta URL como "página de obrigado"
 *                     na sua plataforma de pagamento (Hotmart, Kirvano, etc.)
 *                     O cliente será redirecionado automaticamente após pagar.
 *
 *  Substitua os valores abaixo pelos seus próprios links.
 */

const CONFIG = {
  // ⚠️ Troque pelo seu domínio de saída (exit intent)
  EXIT_URL: 'https://ambienteeonline.org.ua/c/87861a1c97',

  // ⚠️ Troque pelo link da sua oferta principal (botão DESBLOQUEAR)
  OFFER_URL: 'https://ambienteeonline.org.ua/c/87861a1c97',

  // ⚠️ Link da upsell — configure como "página de obrigado" na sua plataforma de pagamento
  UPSELL_URL: 'https://ambienteeonline.org.ua/c/c478f99d5c',
};
