// ========================================
// CDS Mastery - Interactive behaviors
// ========================================

// Copy to clipboard
document.querySelectorAll('.code-copy').forEach(btn => {
  btn.addEventListener('click', async () => {
    const codeBlock = btn.closest('.code-block').querySelector('pre code');
    const text = codeBlock.innerText;
    try {
      await navigator.clipboard.writeText(text);
      const original = btn.innerText;
      btn.innerText = '✓ Copiato';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerText = original;
        btn.classList.remove('copied');
      }, 1800);
    } catch (e) {
      btn.innerText = 'Errore';
    }
  });
});

// TOC active state on scroll
const tocLinks = document.querySelectorAll('.toc a');
const headings = Array.from(document.querySelectorAll('.content h2, .content h3'));

if (tocLinks.length && headings.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-80px 0px -70% 0px' });
  
  headings.forEach(h => { if (h.id) observer.observe(h); });
}

// Smooth highlight on hash navigation
window.addEventListener('hashchange', () => {
  const target = document.querySelector(window.location.hash);
  if (target) {
    target.style.transition = 'background 0.3s ease';
    target.style.background = 'rgba(232, 168, 56, 0.2)';
    setTimeout(() => { target.style.background = ''; }, 1500);
  }
});

// Reading progress (visual feedback at top)
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 72px; left: 0; height: 2px;
  background: linear-gradient(90deg, var(--signal-red), var(--signal-amber));
  z-index: 99; transition: width 0.1s ease; width: 0%;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (window.scrollY / total) * 100;
  progressBar.style.width = pct + '%';
});
