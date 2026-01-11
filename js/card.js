document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-wrapper");
  let activeCard = null;

  cards.forEach(cardWrapper => {
    cardWrapper.addEventListener("click", e => {
      e.stopPropagation();

      if (activeCard && activeCard !== cardWrapper) {
        resetCard(activeCard);
      }

      if (cardWrapper === activeCard) {
        resetCard(cardWrapper);
        activeCard = null;
        return;
      }

      activeCard = cardWrapper;
      animateCard(cardWrapper);
    });
  });

  document.addEventListener("click", () => {
    if (activeCard) {
      resetCard(activeCard);
      activeCard = null;
    }
  });

  function animateCard(cardWrapper) {
    cardWrapper.style.zIndex = 20;

    setTimeout(() => {
      const rect = cardWrapper.getBoundingClientRect();
      const x = window.innerWidth / 2 - rect.width / 2 - rect.left;
      const y = window.innerHeight / 2 - rect.height / 2 - rect.top;

      cardWrapper.style.transition = "transform 0.3s ease";
      cardWrapper.style.transform =
        `translate(${x}px, ${y}px) scale(1.2)`;

      setTimeout(() => {
        const detail = cardWrapper.querySelector(".card-detail");
        if (!detail) return;

        Object.assign(detail.style, {
          opacity: "1",
          transform: "translateX(0) scale(1)",
          pointerEvents: "auto"
        });
      }, 250);
    }, 50);
  }

  function resetCard(cardWrapper) {
    cardWrapper.style.transform = "";
    cardWrapper.style.zIndex = "";

    const detail = cardWrapper.querySelector(".card-detail");
    if (detail) {
      detail.style.opacity = "";
      detail.style.transform = "";
      detail.style.pointerEvents = "";
    }
  }
});
