document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".list-tab");
  const containers = document.querySelectorAll(".list-container .container");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabId = tab.id.replace("li-tab--", "");

      tabs.forEach(t => t.classList.remove("selected"));
      tab.classList.add("selected");

      containers.forEach(c => c.classList.remove("show"));

      const target = document.getElementById("content--" + tabId);
      if (target) target.classList.add("show");
    });
  });

  requestAnimationFrame(() => {
    document.getElementById("li-tab--first")?.click();
  });
});
