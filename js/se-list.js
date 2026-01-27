export function initTab(scopeSelector = document) {
  const root =
    typeof scopeSelector === "string"
      ? document.querySelector(scopeSelector)
      : scopeSelector;

  if (!root) return;

  const tabs = root.querySelectorAll(".list-tab");
  const contents = root.querySelectorAll(".tab-container");

  if (!tabs.length || !contents.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const key = tab.id.replace("li-tab--", "");

      tabs.forEach(t => t.classList.remove("selected"));
      tab.classList.add("selected");

      contents.forEach(c => c.classList.remove("show"));
      root
        .querySelector(`#content--${key}`)
        ?.classList.add("show");
    });
  });
}
