document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".list-tab");
  const containers = document.querySelectorAll("#container");

  if (!tabs.length || !containers.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabId = tab.id.replace("li-tab--", "");

      tabs.forEach(t => t.classList.remove("selected"));
      tab.classList.add("selected");

      containers.forEach(c => c.classList.remove("show"));
      document.getElementById("content--" + tabId)?.classList.add("show");
    });
  });

  // 初期タブ（他JS初期化後）
  setTimeout(() => {
    document.getElementById("li-tab--first")?.click();
  }, 0);
});
