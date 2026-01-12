document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".list-tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const key = tab.id.replace("li-tab--", "");

      tabs.forEach(t => t.classList.remove("selected"));
      tab.classList.add("selected");

      contents.forEach(c => c.classList.remove("show"));
      document
        .getElementById("content--" + key)
        ?.classList.add("show");
    });
  });

  // 初期表示
  document.getElementById("li-tab--first")?.click();
});
