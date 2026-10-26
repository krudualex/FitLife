(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }));
  }

  const search = document.getElementById('workoutSearch');
  const type = document.getElementById('workoutType');
  const level = document.getElementById('workoutLevel');
  const cards = [...document.querySelectorAll('.workout')];
  const empty = document.getElementById('workoutEmpty');
  function filterWorkouts() {
    if (!cards.length) return;
    let shown = 0;
    cards.forEach(card => {
      const q = (search?.value || '').trim().toLocaleLowerCase('uk');
      const matches = (!q || (card.dataset.search + ' ' + card.textContent).toLocaleLowerCase('uk').includes(q))
        && (!type || type.value === 'all' || card.dataset.type === type.value)
        && (!level || level.value === 'all' || card.dataset.level === level.value);
      card.hidden = !matches;
      if (matches) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }
  [search, type, level].filter(Boolean).forEach(el => el.addEventListener(el === search ? 'input' : 'change', filterWorkouts));
  filterWorkouts();

  // Subtle reveal animation for elements as they enter view.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    document.querySelectorAll('.card, .form-card, .dark-band').forEach(el => observer.observe(el));
  }
})();
