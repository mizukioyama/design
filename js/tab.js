document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     Smooth Scroll
  =============================== */
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

  /* ===============================
     Tab Control
  =============================== */
  const tabs = document.querySelectorAll(".tabs-container .tab");
  const slider = document.querySelector(".tab-slider");

  if (!tabs.length || !slider) return;

  function moveSlider(target) {
    const rect = target.getBoundingClientRect();
    const parentRect = target.parentElement.getBoundingClientRect();

    slider.style.width = rect.width + "px";
    slider.style.left = rect.left - parentRect.left + "px";
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault();

      // active 管理
      tabs.forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");

      // スライダー移動
      moveSlider(tab);

      // スムーススクロール
      smoothScroll(tab.getAttribute("href"));
    });
  });

  /* ===============================
     初期位置
  =============================== */
  const firstTab = tabs[0];
  if (firstTab) {
    firstTab.classList.add("is-active");
    moveSlider(firstTab);
  }

  /* ===============================
     リサイズ対応
  =============================== */
  window.addEventListener("resize", () => {
    const activeTab = document.querySelector(".tab.is-active");
    if (activeTab) moveSlider(activeTab);
  });

});
