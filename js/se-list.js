document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".list-tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const id = tab.id.replace("li-tab--", "");

      // タブ切替
      tabs.forEach(t => t.classList.remove("selected"));
      tab.classList.add("selected");

      // コンテンツ切替
      contents.forEach(c => c.classList.remove("show"));
      document.getElementById(`content--${id}`)?.classList.add("show");
    });
  });

  // 初期表示
  document.getElementById("li-tab--first")?.click();
});
