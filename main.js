document.addEventListener('DOMContentLoaded', function() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.sidebar nav a');
  var hamburger = document.querySelector('.hamburger');
  var sidebar = document.querySelector('.sidebar');
  var overlay = document.querySelector('.sidebar-overlay');

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(function(section) {
    observer.observe(section);
  });

  function closeSidebar() {
    hamburger.classList.remove('open');
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  }

  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      closeSidebar();
    });
  });

  document.querySelector('.sidebar-name').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    closeSidebar();
  });

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('open');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  });

  overlay.addEventListener('click', closeSidebar);

  // ---- How to Learn: topic filters ----
  var filterBar = document.querySelector('.learn-filters');
  if (filterBar) {
    var scope = document.getElementById(filterBar.getAttribute('data-scope'));
    var cards = scope.querySelectorAll('.learn-card[data-tags]');
    var grids = scope.querySelectorAll('.learn-grid');
    var labels = {};

    var acronyms = { llm: 'LLM', ai: 'AI', nlp: 'NLP', cv: 'CV', rl: 'RL' };

    function slugToLabel(slug) {
      return slug.split('-').map(function(w) {
        return acronyms[w] || (w.charAt(0).toUpperCase() + w.slice(1));
      }).join(' ');
    }

    // Build one pill per tag actually used by a card, in first-seen order.
    cards.forEach(function(card) {
      card.getAttribute('data-tags').split(/\s+/).forEach(function(tag) {
        if (tag && !labels[tag]) {
          labels[tag] = slugToLabel(tag);
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'learn-pill';
          btn.setAttribute('data-filter', tag);
          btn.textContent = labels[tag];
          filterBar.appendChild(btn);
        }
      });
    });

    function applyFilter(tag) {
      cards.forEach(function(card) {
        var tags = card.getAttribute('data-tags').split(/\s+/);
        var show = tag === 'all' || tags.indexOf(tag) !== -1;
        card.classList.toggle('is-hidden', !show);
      });
      grids.forEach(function(grid) {
        var visible = grid.querySelectorAll('.learn-card:not(.is-hidden)').length;
        var empty = grid.querySelector('.learn-empty');
        if (!visible && !empty) {
          empty = document.createElement('p');
          empty.className = 'learn-empty';
          empty.textContent = 'Nothing here for this topic yet.';
          grid.appendChild(empty);
        } else if (visible && empty) {
          empty.remove();
        }
      });
    }

    filterBar.addEventListener('click', function(e) {
      var pill = e.target.closest('.learn-pill');
      if (!pill) return;
      filterBar.querySelectorAll('.learn-pill').forEach(function(p) {
        p.classList.toggle('active', p === pill);
      });
      applyFilter(pill.getAttribute('data-filter'));
    });
  }
});
