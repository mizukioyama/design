export function initTab() {
  const run = () => {
    const tabs = document.querySelectorAll(".sp-list-tab");
    const contents = document.querySelectorAll(".sp-tab-content");

    if (!tabs.length || !contents.length) return;

    const activate = tab => {
      const key = tab.id.replace("sp-li-tab--", "");

      tabs.forEach(t => t.classList.remove("sp-selected"));
      tab.classList.add("sp-selected");

      contents.forEach(c => c.classList.remove("show"));

      document
        .getElementById("sp-content--" + key)
        ?.classList.add("sp-show");
    };

    const firstTab =
      document.querySelector(".sp-list-tab.sp-selected") || tabs[0];

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
