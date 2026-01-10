document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-wrapper");

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

  // card 外クリックでリセット
  document.addEventListener("click", () => {
    resetCards(cards);
  });
});

function resetCards(cards) {
  cards.forEach(card => {
    card.classList.remove("active");
  });
}
