const doc = document.documentElement;
const themeButton = document.querySelector('#theme-toggle');
const themeLabel = document.querySelector('#theme-label');
const menuButton = document.querySelector('#menu-toggle');
const nav = document.querySelector('#main-nav');
const toast = document.querySelector('#toast');
const applyTheme = (theme) => {
  const value = theme === 'light' ? 'light' : 'dark';
  doc.dataset.theme = value;
  doc.classList.toggle('dark', value === 'dark');
  themeLabel.textContent = value === 'dark' ? 'Dark' : 'Light';
  themeButton.setAttribute('aria-pressed', String(value === 'dark'));
  themeButton.setAttribute('aria-label', `Switch to ${value === 'dark' ? 'light' : 'dark'} theme`);
};
try { applyTheme(localStorage.getItem('fpe-theme') || 'dark'); }
catch { applyTheme('dark'); }
themeButton.addEventListener('click', () => {
  const next = doc.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('fpe-theme', next); } catch { /* storage may be disabled */ }
});
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('nav-open', !expanded);
});
nav.addEventListener('click', (e) => {
  if (e.target.closest('a')) { nav.classList.remove('nav-open'); menuButton.setAttribute('aria-expanded', 'false'); }
});
let toastTimer;
const announce = (message) => {
  toast.hidden = false;
  toast.textContent = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2400);
};
document.querySelectorAll('[data-copy-target]').forEach((button) => {
  button.addEventListener('click', async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;
    const content = target.textContent;
    try {
      await navigator.clipboard.writeText(content);
      announce('Command copied to clipboard');
    } catch { announce('Clipboard unavailable. Select the command to copy it.'); }
  });
});
document.querySelector('#demo-action').addEventListener('click', () => {
  document.querySelector('#demo-feedback').textContent = 'Action confirmed. This control is interactive.';
});

// The hero's control specimen is usable, not an ornamental screenshot.
document.querySelector('#preview-action').addEventListener('click', () => {
  document.querySelector('#preview-response').textContent = 'Project action confirmed.';
});
