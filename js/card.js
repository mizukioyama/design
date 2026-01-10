console.log("🔥 card.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready");
});




document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-wrapper");

  cards.forEach(card => {
    card.addEventListener("click", e => {
      e.stopPropagation();

      const active = card.classList.contains("active");
      reset(cards);
      if (!active) activate(card);
    });
  });

  document.addEventListener("click", () => reset(cards));
});

function reset(cards) {
  cards.forEach(card => {
    card.classList.remove("active");
    card.style.transform = "";
    card.style.zIndex = "";
    const bg = card.querySelector(".card-background");
    if (bg) bg.removeAttribute("style");
  });
}

function activate(card) {
  card.classList.add("active");
  card.style.zIndex = 100;

  requestAnimationFrame(() => {
    card.style.transform = "scale(1.2)";
  });
}
