export function initTab() {
  const run = () => {
    const wraps = document.querySelectorAll(".tab-wrap");
    if (!wraps.length) return;

    wraps.forEach(wrap => {
      const tabs = wrap.querySelectorAll(".list-tab");
      const contents = wrap.querySelectorAll(".tab-content");

      if (!tabs.length || !contents.length) return;

      const activate = tab => {
        const key = tab.id
          .replace("sp-li-tab--", "")
          .replace("li-tab--", "");

        tabs.forEach(t => t.classList.remove("selected"));
        tab.classList.add("selected");

        contents.forEach(c => c.classList.remove("show"));

        contents.forEach(c => {
          if (c.id.includes(key)) {
            c.classList.add("show");
          }
        });
      };

      const firstTab =
        wrap.querySelector(".list-tab.selected") || tabs[0];

      activate(firstTab);

      tabs.forEach(tab => {
        tab.addEventListener("click", () => activate(tab));
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
}