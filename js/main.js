// ── THEME TOGGLE ──
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const btn = document.getElementById('theme-btn');
  if (btn) {
    btn.textContent = document.body.classList.contains('light-mode') ? '◐ Deep Dark' : '◑ Slate';
  }
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
}

// Apply saved theme immediately before page renders
(function () {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  // Update button text to match current theme
  const btn = document.getElementById('theme-btn');
  if (btn) {
    btn.textContent = document.body.classList.contains('light-mode') ? '◐ Deep Dark' : '◑ Slate';
  }

  // ── NAV ACTIVE STATE ──
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === path) link.classList.add('active');
  });

  // ── BRAIN MAP ──
  initBrainMap();

  // ── QUIZ ──
  initQuiz();
});

// ── BRAIN MAP TOOLTIP + CLICK ──
function initBrainMap() {
  const tooltip = document.getElementById('brain-tooltip');
  const wrapper = document.querySelector('.brain-map-wrapper');
  if (!tooltip || !wrapper) return;

  const regions = document.querySelectorAll('.brain-region');

  regions.forEach(region => {

    // Show tooltip on hover
    region.addEventListener('mouseenter', () => {
      tooltip.textContent = region.getAttribute('data-name') + '  →  click to explore';
      tooltip.classList.add('visible');
    });

    // Move tooltip with mouse
    region.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      let x = e.clientX - rect.left + 14;
      let y = e.clientY - rect.top - 40;
      if (x + 240 > rect.width) x = e.clientX - rect.left - 250;
      if (y < 0) y = e.clientY - rect.top + 20;
      tooltip.style.left = x + 'px';
      tooltip.style.top  = y + 'px';
    });

    // Hide tooltip
    region.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });

    // Navigate on click
    region.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const href = region.getAttribute('data-href');
      if (href) window.location.href = href;
    });
  });
}

// ── QUIZ ──
function initQuiz() {
  const options  = document.querySelectorAll('.quiz-option');
  const feedback = document.getElementById('quiz-feedback');
  if (!options.length || !feedback) return;

  let answered = false;

  options.forEach(opt => {
    opt.style.cursor = 'pointer';

    opt.addEventListener('click', (e) => {
      e.preventDefault();
      if (answered) return;
      answered = true;

      const isCorrect = opt.getAttribute('data-correct') === 'true';

      opt.classList.add(isCorrect ? 'correct' : 'wrong');

      if (!isCorrect) {
        options.forEach(o => {
          if (o.getAttribute('data-correct') === 'true') o.classList.add('correct');
        });
      }

      feedback.textContent = isCorrect
        ? '✓ Correct! Great work.'
        : '✗ Not quite — the correct answer is highlighted above.';
      feedback.style.color = isCorrect ? 'var(--success)' : 'var(--danger)';

      // Disable all options after answering
      options.forEach(o => {
        o.style.cursor = 'default';
        o.style.pointerEvents = 'none';
      });
    });
  });
}

// ── SCROLL PROGRESS BAR ──
window.addEventListener('scroll', () => {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  bar.style.width = scrolled + '%';
});
