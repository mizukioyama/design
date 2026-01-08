document.addEventListener("DOMContentLoaded", () => {

  function smoothScroll(targetEl, duration = 600) {
    if (!targetEl || targetEl === "#") return;

    const target = document.querySelector(targetEl);
    if (!target) return;

    const startY = window.pageYOffset;
    const targetY = target.getBoundingClientRect().top + startY;
    const distance = targetY - startY;
    let startTime = null;

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    function animate(time) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const y = ease(elapsed, startY, distance, duration);
      window.scrollTo(0, y);

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  document.querySelectorAll('a[href^="#"]:not([href="#"])')
    .forEach(anchor => {
      anchor.addEventListener("click", e => {
        e.preventDefault();
        smoothScroll(anchor.getAttribute("href"));
      });
    });

});
