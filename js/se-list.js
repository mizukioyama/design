export function initTab() {
  const init = () => {
    const tabWraps = document.querySelectorAll(".tab-wrap");
    if (!tabWraps.length) return;

    tabWraps.forEach(wrap => {
      const tabs = wrap.querySelectorAll(".list-tab");
      const contents = wrap.querySelectorAll(".tab-content");

      if (!tabs.length || !contents.length) return;

      const activate = tab => {
        const key = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove("selected"));
        tab.classList.add("selected");

        contents.forEach(c => {
          c.classList.toggle(
            "show",
            c.dataset.content === key
          );
        });
      };

      // 初期表示
      const first =
        wrap.querySelector(".list-tab.selected") || tabs[0];
      activate(first);

      // クリックイベント
      tabs.forEach(tab => {
        tab.addEventListener("click", () => activate(tab));
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}