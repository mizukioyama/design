function smoothScroll(targetEl, duration = 600) {
  if (!targetEl || targetEl === '#') return;

  const target = document.querySelector(targetEl);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
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
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}

// アコーディオン内リンクは除外
document.querySelectorAll(
  'a[href^="#"]:not([href="#"]):not(.accordion-header a)'
).forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (!document.querySelector(targetId)) return;

    e.preventDefault();
    smoothScroll(targetId);
  });
});
