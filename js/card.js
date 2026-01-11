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

  openModal(); // 仮表示

  /* ========= card ========= */
  const cards = modal.querySelectorAll(".card-wrapper");

  cards.forEach(card => {
    card.addEventListener("click", e => {
      e.stopPropagation(); // 🔑 超重要

      const active = card.classList.contains("active");
      resetCards();

      if (!active) {
        card.classList.add("active");
      }
    });
  });

  // 🔑 card 以外をクリックした時だけ reset
  modal.addEventListener("click", e => {
    if (e.target.closest(".card-wrapper")) return;
    resetCards();
  });

  function resetCards() {
    cards.forEach(card => card.classList.remove("active"));
  }

});
