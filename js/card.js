console.log("🟢 card.js loaded");

export function initCard() {
  const cards = document.querySelectorAll(".card-wrapper");
  if (!cards.length) {
    console.warn("⚠️ no card-wrapper found");
    return;
  }

  console.log("✅ card init:", cards.length);

  cards.forEach(card => {
    card.addEventListener("click", e => {
      e.stopPropagation();

      const isActive = card.classList.contains("active");
      resetCards(cards);

      if (!isActive) {
        card.classList.add("active");
      }
    });
  });

  document.addEventListener("click", () => {
    resetCards(cards);
  });
}

function resetCards(cards) {
  cards.forEach(card => card.classList.remove("active"));
}
