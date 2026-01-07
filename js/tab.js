(() => {
  // DOMが読み込まれてから実行（CSP安全）
  document.addEventListener('DOMContentLoaded', () => {

    function smoothScroll(targetEl, duration = 600) {
      if (!targetEl || targetEl === '#') return;

      const target = document.querySelector(targetEl);
      if (!target) return;

      const startPosition = window.pageYOffset;
      const targetPosition =
        target.getBoundingClientRect().top + startPosition;
      const distance = targetPosition - startPosition;
      let startTime = null;

      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    }

    // タブリンクは除外（UI競合防止）
    document.querySelectorAll(
      'a[href^="#"]:not([href="#"]):not(.tab)'
    ).forEach(anchor => {
      anchor.addEventListener('click', e => {
        const targetId = anchor.getAttribute('href');
        if (!document.querySelector(targetId)) return;

        e.preventDefault();
        smoothScroll(targetId);
      });
    });

  });
})();
