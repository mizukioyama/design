export function initTab() {
  const container = document.querySelector(".tabs-container");
  if (!container) return;

  const tabs = container.querySelectorAll(".tab");
  const slider = container.querySelector(".tab-slider");
  if (!tabs.length || !slider) return;

  function moveSlider(target) {
    const rect = target.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();
    slider.style.width = `${rect.width}px`;
    slider.style.left = `${rect.left - parentRect.left}px`;
  }

  function smoothScrollTo(targetSelector, duration = 1000) {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const startY =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const targetY =
      target.getBoundingClientRect().top + startY;

    const distance = targetY - startY;
    let startTime = null;

    function easeInOut(t) {
      return t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function animate(time) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = easeInOut(progress);

      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault();

      tabs.forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      moveSlider(tab);

      smoothScrollTo(tab.getAttribute("href"), 1200);
    });
  });

  requestAnimationFrame(() => {
    tabs[0].classList.add("is-active");
    moveSlider(tabs[0]);
  });
}
