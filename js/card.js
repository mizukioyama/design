document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-wrapper");
  let activeCard = null;

  cards.forEach(cardWrapper => {
    cardWrapper.addEventListener("click", e => {
      e.stopPropagation();

      // すでに開いているカードを閉じる
      if (activeCard && activeCard !== cardWrapper) {
        resetCard(activeCard);
      }

      // 同じカードを再クリック → 閉じる
      if (cardWrapper === activeCard) {
        resetCard(cardWrapper);
        activeCard = null;
        return;
      }

      activeCard = cardWrapper;
      animateCard(cardWrapper);
    });
  });

  // 画面クリックで閉じる
  document.addEventListener("click", () => {
    if (activeCard) {
      resetCard(activeCard);
      activeCard = null;
    }
  });

  /* =========================
     animation
  ========================= */

  function animateCard(cardWrapper) {
    cardWrapper.style.zIndex = 20;

    setTimeout(() => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const rect = cardWrapper.getBoundingClientRect();

      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;

      const translateX =
        (windowWidth / 3.75 - rect.width / 3.75) - (rect.left + scrollX);

      const translateY =
        (windowHeight / 2.5 - rect.height / 2.5) - (rect.top + scrollY);

      cardWrapper.style.transition = "transform 0.25s ease";
      cardWrapper.style.transform =
        `scale(1.2) translate(${translateX}px, ${translateY}px)`;

      setTimeout(() => {
        const bg = cardWrapper.querySelector(".card-detail");
        if (!bg) return;

        Object.assign(bg.style, {
          fontFamily: "sans-serif",
          top: "0",
          left: "47%",
          width: "75vmin",
          height: "auto",
          maxHeight: "40vmin",
          padding: "1vmin 4vmin 2vmin 22vmin",
          opacity: "1",
          pointerEvents: "auto",
          transition: "all 0.25s ease, height 1s ease"
        });
      }, 250);

    }, 50);
  }

  function resetCard(cardWrapper) {
    cardWrapper.style.transform = "";
    cardWrapper.style.zIndex = "";

    const bg = cardWrapper.querySelector(".card-detail");
    if (bg) {
      bg.style.opacity = "";
      bg.style.pointerEvents = "";
      bg.style.width = "";
      bg.style.height = "";
      bg.style.maxHeight = "";
      bg.style.padding = "";
      bg.style.left = "";
      bg.style.top = "";
      bg.style.transition = "";
    }
  }
});
