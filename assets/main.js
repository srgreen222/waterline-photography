// Lightbox: click a photograph to see it large; arrow keys move between works.
(function () {
  var box = document.querySelector('.lightbox');
  if (!box || typeof box.showModal !== 'function') return;
  var img = box.querySelector('img');
  var caption = box.querySelector('.lightbox-caption');
  var pieces = Array.prototype.slice.call(document.querySelectorAll('.piece-image'));
  var current = 0;

  function show(i) {
    current = (i + pieces.length) % pieces.length;
    var btn = pieces[current];
    img.src = btn.dataset.full;
    img.alt = btn.querySelector('img').alt;
    caption.textContent = btn.closest('.piece').querySelector('h3').textContent;
  }

  pieces.forEach(function (btn, i) {
    btn.addEventListener('click', function () { show(i); box.showModal(); });
  });
  box.querySelector('.lightbox-close').addEventListener('click', function () { box.close(); });
  box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.open) return;
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'ArrowLeft') show(current - 1);
  });
})();

// Copy buttons for the email address (mail links don't open for every viewer).
(function () {
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () { var t = btn.textContent; btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = t; }, 1600); };
      try {
        navigator.clipboard.writeText(text).then(done, function () {});
      } catch (e) {}
    });
  });
})();
