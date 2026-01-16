export function initTab() {
  const container = document.querySelector(".tabs-container");
  if (!container) return;

  const tabs = container.querySelectorAll(".tab");
  const slider = container.querySelector(".tab-slider");

  if (!tabs.length || !slider) return;

  /* -----------------------
     slider 移動
  ------------------------ */
  function moveSlider(target) {
    const rect = target.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();

    slider.style.width = `${rect.width}px`;
    slider.style.left = `${rect.left - parentRect.left}px`;
  }

  /* -----------------------
     スムーススクロール
     mobile対応・安全版
  ------------------------ */
  function smoothScroll(targetId) {
    if (!targetId) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    const y =
      target.getBoundingClientRect().top +
      window.pageYOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });
  }

  /* -----------------------
     click イベント
  ------------------------ */
  tabs.forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault();

      tabs.forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");

      moveSlider(tab);
      smoothScroll(tab.getAttribute("href"));
    });
  });

  /* -----------------------
     初期化
  ------------------------ */
  const firstTab = tabs[0];
  firstTab.classList.add("is-active");

  // mobile描画ズレ防止
  requestAnimationFrame(() => {
    moveSlider(firstTab);
  });

  /* -----------------------
     resize対応
  ------------------------ */
  window.addEventListener("resize", () => {
    const active = container.querySelector(".tab.is-active");
    if (active) moveSlider(active);
  });
}
