export function initTab() {
  const container = document.querySelector(".tabs-container");
  if (!container) return;

  const tabs = [...container.querySelectorAll(".tab")];
  const slider = container.querySelector(".tab-slider");
  if (!tabs.length || !slider) return;

  /* =========================
     Slider
  ========================= */
  function moveSlider(target) {
    const rect = target.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();
    slider.style.width = rect.width + "px";
    slider.style.left = rect.left - parentRect.left + "px";
  }

  /* =========================
     Smooth Scroll（速度制御可）
  ========================= */
  function smoothScrollTo(targetId, duration = 1200) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const startY = window.scrollY;
    const targetY = target.offsetTop;
    const distance = targetY - startY;
    let startTime = null;

    function easeInOut(t) {
      return t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function step(time) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = easeInOut(progress);
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /* =========================
     Events
  ========================= */
  tabs.forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault();

      tabs.forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      moveSlider(tab);

      // 🔽 ここで速度を自由に変えられる
      smoothScrollTo(tab.getAttribute("href"), 1500);
    });
  });

  /* =========================
     Init
  ========================= */
  requestAnimationFrame(() => {
    tabs[0].classList.add("is-active");
    moveSlider(tabs[0]);
  });
}
