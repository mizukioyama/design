document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    const tab = e.target.closest(".list-tab");
    if (!tab) return;

    const key = tab.id.replace("li-tab--", "");

    // tab
    document.querySelectorAll(".list-tab").forEach(t =>
      t.classList.remove("selected")
    );
    tab.classList.add("selected");

    // content
    document.querySelectorAll(".tab-container").forEach(c =>
      c.style.display = "none"
    );

    const target = document.getElementById("content--" + key);
    if (target) {
      target.style.display = "block";
    }
  });

  // 初期表示をJSで強制
  document.querySelectorAll(".tab-container").forEach(c =>
    c.style.display = "none"
  );
  document.getElementById("content--first").style.display = "block";
});
