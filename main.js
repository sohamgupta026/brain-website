// ─── NAV ACTIVE STATE ───
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === path) link.classList.add('active');
  });
});

// ─── THEME TOGGLE ───
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const btn = document.getElementById('theme-btn');
  if (btn) {
    btn.textContent = document.body.classList.contains('light-mode') ? '◐ Dark' : '◑ Light';
  }
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
}

// Load saved theme on every page
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    const btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = '◐ Dark';
  }
});

// ─── BRAIN MAP TOOLTIP ───
function initBrainMap() {
  const tooltip = document.getElementById('brain-tooltip');
  if (!tooltip) return;

  const regions = document.querySelectorAll('.brain-region');
  const wrapper = document.querySelector('.brain-map-wrapper');

  regions.forEach(region => {
    region.addEventListener('mouseenter', () => {
      const name = region.getAttribute('data-name');
      tooltip.textContent = name + '  →  click to explore';
      tooltip.classList.add('visible');
    });

    region.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      let x = e.clientX - rect.left + 12;
      let y = e.clientY - rect.top - 36;
      if (x + 220 > rect.width) x = e.clientX - rect.left - 230;
      tooltip.style.left = x + 'px';
      tooltip.style.top  = y + 'px';
    });

    region.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });

    region.addEventListener('click', () => {
      const href = region.getAttribute('data-href');
      if (href) window.location.href = href;
    });
  });
}

document.addEventListener('DOMContentLoaded', initBrainMap);

// ─── QUIZ ───
function initQuiz() {
  const options  = document.querySelectorAll('.quiz-option');
  const feedback = document.getElementById('quiz-feedback');
  if (!options.length || !feedback) return;

  let answered = false;

  options.forEach(opt => {
    opt.addEventListener('click', () => {
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
    });
  });
}

document.addEventListener('DOMContentLoaded', initQuiz);
