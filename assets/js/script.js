// ============ NAVEGAÇÃO ENTRE PÁGINAS COM TRANSIÇÃO EM ONDA ============
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('[data-page]');
const overlay = document.getElementById('wave-overlay');
const navLinksWrap = document.getElementById('navLinks');
const navToggle = document.getElementById('navToggle');

const WAVE_DURATION = 680; // precisa bater com o CSS (.68s)

function setActivePage(pageId) {
  pages.forEach(p => p.classList.toggle('is-active', p.id === `page-${pageId}`));
  navLinks.forEach(l => {
    if (l.classList.contains('nav-link')) {
      l.classList.toggle('is-active', l.dataset.page === pageId);
    }
  });
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

function goToPage(pageId, skipAnimation = false) {
  const current = document.querySelector('.page.is-active');
  if (current && current.id === `page-${pageId}` ) return;

  if (skipAnimation) {
    setActivePage(pageId);
    return;
  }

  overlay.classList.remove('is-revealing');
  overlay.classList.add('is-covering');

  window.setTimeout(() => {
    setActivePage(pageId);
    overlay.classList.remove('is-covering');
    overlay.classList.add('is-revealing');

    window.setTimeout(() => {
      overlay.classList.remove('is-revealing');
    }, WAVE_DURATION);
  }, WAVE_DURATION);
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = link.dataset.page;
    goToPage(pageId);
    history.pushState(null, '', `#${pageId}`);
    navLinksWrap.classList.remove('is-open');
  });
});

navToggle.addEventListener('click', () => {
  navLinksWrap.classList.toggle('is-open');
});

window.addEventListener('popstate', () => {
  const pageId = location.hash.replace('#', '') || 'inicio';
  goToPage(pageId, true);
});

// carregar página a partir do hash da URL (ou início por padrão)
const initialPage = location.hash.replace('#', '') || 'inicio';
setActivePage(initialPage);


// ============ TABS DA SEÇÃO RESUMO ============
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('is-active'));
    tabPanels.forEach(p => p.classList.remove('is-active'));
    btn.classList.add('is-active');
    document.getElementById(`tab-${btn.dataset.tab}`).classList.add('is-active');
  });
});


// ============ RIPPLE (ONDA) NO HOVER DOS CARDS ============
document.querySelectorAll('.card, .project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--rx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--ry', `${e.clientY - rect.top}px`);
  });
});


// ============ FORMULÁRIO DE CONTATO (mailto) ============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = contactForm.querySelectorAll('input');
    const textarea = contactForm.querySelector('textarea');
    const nome = inputs[0].value;
    const sobrenome = inputs[1].value;
    const email = inputs[2].value;
    const assunto = inputs[3].value || 'Contato via portfólio';
    const mensagem = textarea.value;

    const body = encodeURIComponent(
      `Nome: ${nome} ${sobrenome}\nE-mail para retorno: ${email}\n\n${mensagem}`
    );
    const subject = encodeURIComponent(assunto);

    window.location.href = `mailto:dihsakata@gmail.com?subject=${subject}&body=${body}`;
  });
}
