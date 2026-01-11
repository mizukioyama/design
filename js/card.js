document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 main.js loaded");

  const modal = document.getElementById("modal--first");
  const cards = modal.querySelectorAll(".card-wrapper");

  cards.forEach(card => {
    card.addEventListener("click", e => {
      e.stopPropagation();
      console.log("✅ card clicked");

      cards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
    });
  });

  modal.addEventListener("click", () => {
    cards.forEach(c => c.classList.remove("active"));
  });
});
