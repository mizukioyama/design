export function initTab() {
  const container = document.querySelector(".tabs-container");
  if (!container) return;

  const tabs = container.querySelectorAll(".tab");
  const slider = container.querySelector(".tab-slider");
  if (!tabs.length || !slider) return;

  function moveSlider(target) {
    const rect = target.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();
    slider.style.width = rect.width + "px";
    slider.style.left = rect.left - parentRect.left + "px";
  }

  function smoothScroll(targetEl) {
    const target = document.querySelector(targetEl);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth" });
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

  /* 🔴 アニメーション完了後に初期位置を計算 */
  container.addEventListener("animationend", () => {
    tabs[0].classList.add("is-active");
    moveSlider(tabs[0]);
  }, { once: true });
}
