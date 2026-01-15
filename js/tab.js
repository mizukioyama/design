export function initTab() {
  const tabs = document.querySelectorAll(".tabs-container .tab");
  const slider = document.querySelector(".tab-slider");

  if (!tabs.length || !slider) {
    console.warn("tab elements not found");
    return;
  }

  function moveSlider(target) {
    const rect = target.getBoundingClientRect();
    const parentRect = target.parentElement.getBoundingClientRect();

    slider.style.width = rect.width + "px";
    slider.style.left = rect.left - parentRect.left + "px";
  }

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

  tabs.forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault();

      tabs.forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");

      moveSlider(tab);
      smoothScroll(tab.getAttribute("href"));
    });
  });

  // 初期化
  tabs[0].classList.add("is-active");
  moveSlider(tabs[0]);

  window.addEventListener("resize", () => {
    const active = document.querySelector(".tab.is-active");
    if (active) moveSlider(active);
  });
}
