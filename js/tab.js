export function initTab() {
  const container = document.querySelector(".tabs-container");
  if (!container) return;

  const tabs = Array.from(container.querySelectorAll(".tab"));
  const slider = container.querySelector(".tab-slider");
  if (!tabs.length || !slider) return;

  /* =========================
     Slider（fixed対応）
  ========================= */
  function moveSlider(target) {
    slider.style.width = target.offsetWidth + "px";
    slider.style.left = target.offsetLeft + "px";
  }

  /* =========================
     Smooth Scroll（速度制御）
  ========================= */
  function smoothScrollTo(targetId, duration = 1200) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const startY = window.pageYOffset;
    const targetY = target.offsetTop;
    const distance = targetY - startY;
    let startTime = null;

    function ease(t) {
      return t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function step(time) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * ease(progress));
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
      smoothScrollTo(tab.getAttribute("href"), 1500); // ← 速度ここ
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
