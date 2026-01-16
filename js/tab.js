export function initTab() {
  const container = document.querySelector(".tabs-container");
  if (!container) return;

  const tabs = container.querySelectorAll(".tab");
  const slider = container.querySelector(".tab-slider");
  if (!tabs.length || !slider) return;

  // -----------------------
  // slider move
  // -----------------------
  function moveSlider(target) {
    const rect = target.getBoundingClientRect();
    const parent = container.getBoundingClientRect();

    slider.style.width = rect.width + "px";
    slider.style.left = rect.left - parent.left + "px";
  }

  // -----------------------
  // smooth scroll
  // -----------------------
  function smoothScroll(targetEl) {
    const target = document.querySelector(targetEl);
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop,
      behavior: "smooth"
    });
  }

  // -----------------------
  // click
  // -----------------------
  tabs.forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault();

      tabs.forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");

      moveSlider(tab);
      smoothScroll(tab.getAttribute("href"));
    });
  });

  // -----------------------
  // init（アニメ後に実行）
  // -----------------------
  setTimeout(() => {
    tabs[0].classList.add("is-active");
    moveSlider(tabs[0]);
  }, 700);

  // -----------------------
  // resize対応
  // -----------------------
  window.addEventListener("resize", () => {
    const active = container.querySelector(".tab.is-active");
    if (active) moveSlider(active);
  });
}
