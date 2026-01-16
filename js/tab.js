export function initTab() {
  const container = document.querySelector(".tabs-container");
  if (!container) return;

  const tabs = [...container.querySelectorAll(".tab")];
  const slider = container.querySelector(".tab-slider");
  if (!tabs.length || !slider) return;

  const moveSlider = (tab) => {
    const tabRect = tab.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    slider.style.width = tabRect.width + "px";
    slider.style.top =
      tab.offsetTop + tab.offsetHeight - 2 + "px";
  };

  const activateTab = (tab) => {
    tabs.forEach(t => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    moveSlider(tab);
  };

  tabs.forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(tab.getAttribute("href"));
      if (!target) return;

      activateTab(tab);

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // 初期化（animation後に実行）
  const firstTab = tabs[0];
  activateTab(firstTab);

  setTimeout(() => {
    moveSlider(firstTab);
  }, 500);
}
