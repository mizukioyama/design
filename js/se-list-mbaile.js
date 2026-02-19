export function initTab() {
  const run = () => {
    const tabs = document.querySelectorAll(".mobile-list-tab");
    const contents = document.querySelectorAll(".mobile-tab-container");

    if (!tabs.length || !contents.length) return;

    const activate = tab => {
      const key = tab.id.replace("mobile-li-tab--", "");

      tabs.forEach(t => t.classList.remove("mobile-selected"));
      tab.classList.add("mobile-selected");

      contents.forEach(c => c.classList.remove("show"));
      document
        .getElementById("mobile-content--" + key)
        ?.classList.add("show");
    };

    // 🔹 初期表示（超重要）
    const firstTab =
      document.querySelector(".mobile-list-tab.selected") || tabs[0];

    activate(firstTab);

    // 🔹 click
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        activate(tab);
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
}
