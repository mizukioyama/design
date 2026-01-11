document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-wrapper");

  cards.forEach(card => {
    card.addEventListener("click", e => {
      e.stopPropagation();

      const active = card.classList.contains("active");
      reset(cards);

      if (!active) {
        card.classList.add("active");
      }
    });
  });

  document.addEventListener("click", () => {
    reset(cards);
  });
});

function reset(cards) {
  cards.forEach(card => {
    card.classList.remove("active");
  });
}
