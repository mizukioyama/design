export function initTab(wrapper) {
  const tabs = wrapper.querySelectorAll(".list-tab");
  const contents = wrapper.querySelectorAll(".tab-container");

  if (!tabs.length || !contents.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const key = tab.id.replace("li-tab--", "");

      tabs.forEach(t => t.classList.remove("selected"));
      tab.classList.add("selected");

      contents.forEach(c => c.classList.remove("show"));
      wrapper
        .querySelector("#content--" + key)
        ?.classList.add("show");
    });
  });
}
