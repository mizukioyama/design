export function initTab() {
  const container = document.querySelector(".tabs-container");
  if (!container) {
    console.warn("tabs-container not found");
    return;
  }

  const tabs = container.querySelectorAll(".tab");
  if (!tabs.length) {
    console.warn("tabs not found");
    return;
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault();

      tabs.forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");

      const target = document.querySelector(tab.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // 初期アクティブ
  tabs[0].classList.add("is-active");
}
