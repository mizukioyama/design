document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".list-tab");
  const contents = document.querySelectorAll(".tab-container");

  if (!tabs.length || !contents.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const key = tab.id.replace("li-tab--", "");

      // タブの切り替え
      tabs.forEach(t => t.classList.remove("selected"));
      tab.classList.add("selected");

      // コンテンツの切り替え
      contents.forEach(c => c.classList.remove("show"));
      const target = document.getElementById("content--" + key);
      if (target) target.classList.add("show");
    });
  });
});
