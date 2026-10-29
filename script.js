document.documentElement.classList.add('js');

const root = document.documentElement;
const nav = document.getElementById('nav');
const themeBtn = document.getElementById('theme-btn');

/* Theme toggle (dark by default, remembers the choice) */
function syncThemeLabel() {
    const dark = root.dataset.theme === 'dark';
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    document.querySelector('meta[name="theme-color"]').content = dark ? '#1e2a36' : '#f3eadf';
}
themeBtn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    syncThemeLabel();
});
syncThemeLabel();

/* Nav background after scrolling */
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Reveal sections on scroll */
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* Highlight the current section in the nav */
const links = [...document.querySelectorAll('.nav nav a')];
const spyObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });
links.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if (s) spyObs.observe(s); });

document.getElementById('year').textContent = new Date().getFullYear();
