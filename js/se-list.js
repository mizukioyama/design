export function initTab() {
  const run = () => {
    const tabs = document.querySelectorAll(".list-tab");
    const contents = document.querySelectorAll(".tab-content");

    if (!tabs.length || !contents.length) return;

    const activate = tab => {
      const key = tab.id.replace("li-tab--", "");

      tabs.forEach(t => t.classList.remove("selected"));
      tab.classList.add("selected");

      contents.forEach(c => c.classList.remove("show"));

      document
        .getElementById("content--" + key)
        ?.classList.add("show");
    };

    const firstTab =
      document.querySelector(".list-tab.selected") || tabs[0];

    activate(firstTab);

    tabs.forEach(tab => {
      tab.addEventListener("click", () => activate(tab));
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
}
