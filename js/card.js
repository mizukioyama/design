console.log("🔥 script loaded");

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-wrapper");

  cards.forEach(card => {
    card.addEventListener("click", e => {
      e.stopPropagation();
      console.log("✅ card clicked");

      const isActive = card.classList.contains("active");

      cards.forEach(c => c.classList.remove("active"));
      if (!isActive) card.classList.add("active");
    });
  });

  document.body.addEventListener("click", () => {
    cards.forEach(c => c.classList.remove("active"));
  });
});
