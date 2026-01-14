document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".list-tab");
  const contents = document.querySelectorAll(".tab-container");

  if (!tabs.length || !contents.length) {
    console.warn("tab or content not found");
    return;
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const key = tab.id.replace("li-tab--", "");

      // tab切替
      tabs.forEach(t => t.classList.remove("selected"));
      tab.classList.add("selected");

      // content切替
      contents.forEach(c => c.classList.remove("show"));
      const target = document.getElementById("content--" + key);
      if (target) target.classList.add("show");
    });
  });

  // 初期表示
  document.getElementById("li-tab--first")?.click();
});
