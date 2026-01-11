document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 JS loaded");

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

  // ※ 確認用（本番では削除）
  openModal();

  /* ========= card ========= */
  const cards = modal.querySelectorAll(".card-wrapper");

  function resetCards() {
    cards.forEach(card => card.classList.remove("active"));
  }

  cards.forEach(card => {
    card.addEventListener("click", e => {
      e.stopPropagation(); // ← 超重要
      console.log("✅ card clicked");

      const isActive = card.classList.contains("active");
      resetCards();
      if (!isActive) card.classList.add("active");
    });
  });

});
