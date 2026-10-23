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

  // Reveal long reading and learning lists in small batches.
  var mobileContentQuery = window.matchMedia('(max-width: 768px)');
  function contentPageSize() {
    return mobileContentQuery.matches ? 2 : 4;
  }
  var contentLists = [];
  document.querySelectorAll('.learn-grid, .resource-list').forEach(function(grid, index) {
    var items = Array.from(grid.querySelectorAll('.learn-card, .learn-resource'));
    var batches = 1;
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'learn-more';
    button.hidden = true;
    if (!grid.id) grid.id = 'learn-list-' + index;
    button.setAttribute('aria-controls', grid.id);
    button.innerHTML = 'Show more <span class="learn-more-chevron" aria-hidden="true"></span>';
    var lessButton = document.createElement('button');
    lessButton.type = 'button';
    lessButton.className = 'learn-more learn-less';
    lessButton.hidden = true;
    lessButton.setAttribute('aria-controls', grid.id);
    lessButton.innerHTML = 'Show less <span class="learn-more-chevron" aria-hidden="true"></span>';
    var controls = document.createElement('div');
    controls.className = 'learn-controls';
    controls.appendChild(button);
    controls.appendChild(lessButton);
    grid.insertAdjacentElement('afterend', controls);

    function render() {
      var limit = batches * contentPageSize();
      var matching = items.filter(function(card) {
        return !card.classList.contains('is-hidden');
      });
      items.forEach(function(card) {
        card.classList.remove('is-collapsed');
      });
      matching.forEach(function(card, i) {
        card.classList.toggle('is-collapsed', i >= limit);
      });
      button.hidden = matching.length <= limit;
      lessButton.hidden = batches === 1 || matching.length <= contentPageSize();
      controls.hidden = button.hidden && lessButton.hidden;
      button.setAttribute('aria-expanded', String(!lessButton.hidden));
      lessButton.setAttribute('aria-expanded', String(!lessButton.hidden));
    }

    button.addEventListener('click', function() {
      var matching = items.filter(function(card) {
        return !card.classList.contains('is-hidden');
      });
      var firstNew = matching[batches * contentPageSize()];
      batches += 1;
      render();
      if (firstNew) {
        firstNew.setAttribute('tabindex', '-1');
        firstNew.focus({ preventScroll: true });
      }
    });
    lessButton.addEventListener('click', function() {
      batches = 1;
      render();
      button.focus();
    });
    contentLists.push({
      render: render,
      reset: function() {
        batches = 1;
        render();
      }
    });
    render();
  });

  mobileContentQuery.addEventListener('change', function() {
    contentLists.forEach(function(list) { list.render(); });
  });

  // ---- How to Learn: topic filters ----
  var filterBar = document.querySelector('.learn-filters');
  if (filterBar) {
    var scope = document.getElementById(filterBar.getAttribute('data-scope'));
    var cards = scope.querySelectorAll('.learn-card[data-tags], .learn-resource[data-tags]');
    var grids = scope.querySelectorAll('.learn-grid, .resource-list');
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
        var visible = grid.querySelectorAll('.learn-card:not(.is-hidden), .learn-resource:not(.is-hidden)').length;
        var empty = grid.querySelector('.learn-empty');
        if (!visible && !empty) {
          empty = document.createElement(grid.tagName === 'UL' ? 'li' : 'p');
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
      contentLists.forEach(function(list) { list.reset(); });
    });
  }
});
