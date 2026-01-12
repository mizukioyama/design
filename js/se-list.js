document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".list-tab");
  const contents = document.querySelectorAll("#container .container");

  if (!tabs.length || !contents.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabId = tab.id.replace("li-tab--", "");

      // タブの見た目切替
      tabs.forEach(t => t.classList.remove("selected"));
      tab.classList.add("selected");

      // コンテンツ切替
      contents.forEach(c => c.classList.remove("show"));
      document
        .getElementById("content--" + tabId)
        ?.classList.add("show");
    });
  });

  // 初期表示
  document.getElementById("li-tab--first")?.click();
});
