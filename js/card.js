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



document.addEventListener("DOMContentLoaded", () => {

  /* ========= modal ========= */
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("modal--first");
  const closeBtn = modal.querySelector(".close");

  function openModal() {
    overlay.classList.add("show");
    modal.classList.add("show");
  }

  function closeModal() {
    overlay.classList.remove("show");
    modal.classList.remove("show");
    resetCards();
  }

  overlay.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);

  /* 仮：初期表示（本番では trigger から） */
  openModal();

  /* ========= card ========= */
  const cards = modal.querySelectorAll(".card-wrapper");

  cards.forEach(card => {
    card.addEventListener("click", e => {
      e.stopPropagation();

      const active = card.classList.contains("active");
      resetCards();

      if (!active) {
        card.classList.add("active");
      }
    });
  });

  function resetCards() {
    cards.forEach(card => card.classList.remove("active"));
  }

  modal.addEventListener("click", () => {
    resetCards();
  });

});
