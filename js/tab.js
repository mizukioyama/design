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

  tabs.forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      moveSlider(tab);

      const target = document.querySelector(tab.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // 初期化（DOM描画後）
  requestAnimationFrame(() => {
    tabs[0].classList.add("is-active");
    moveSlider(tabs[0]);
  });
}
