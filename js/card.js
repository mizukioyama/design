document.addEventListener("DOMContentLoaded", () => {
    const cardWrappers = document.querySelectorAll(".card-wrapper");

    cardWrappers.forEach((wrapper) => {
        wrapper.addEventListener("click", (e) => {
            e.stopPropagation();

            const isActive = wrapper.classList.contains("active");
            resetCards(cardWrappers);

            if (!isActive) {
                activateCard(wrapper);
            }
        });
    });

    document.addEventListener("click", () => {
        resetCards(cardWrappers);
    });
});

/* =========================
   共通処理
========================= */

function resetCards(cardWrappers) {
    cardWrappers.forEach((el) => {
        el.classList.remove("active");
        el.style.transition = "";
        el.style.transform = "";
        el.style.zIndex = 1;

        const bg = el.querySelector(".card-background");
        if (bg) bg.removeAttribute("style");
    });
}

function activateCard(cardWrapper) {
    cardWrapper.classList.add("active");
    cardWrapper.style.zIndex = 100;

    requestAnimationFrame(() => {
        cardWrapper.style.transition = "transform 0.3s ease";
        cardWrapper.style.transform = "scale(1.2)";

        setTimeout(() => moveToCenter(cardWrapper), 300);
    });
}

function moveToCenter(cardWrapper) {
    const rect = cardWrapper.getBoundingClientRect();
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;

    const translateX =
        window.innerWidth / 2 - rect.width / 2 - (rect.left + scrollX);
    const translateY =
        window.innerHeight / 2 - rect.height / 2 - (rect.top + scrollY);

    cardWrapper.style.transition = "transform 0.25s ease";
    cardWrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.2)`;

    setTimeout(() => expandBackground(cardWrapper), 250);
}

function expandBackground(cardWrapper) {
    const bg = cardWrapper.querySelector(".card-background");
    if (!bg) return;

    Object.assign(bg.style, {
        fontFamily: "sans-serif",
        top: "0",
        left: "47%",
        width: "75vmin",
        maxHeight: "40vmin",
        padding: "1vmin 4vmin 2vmin 22vmin",
        transition: "all 0.25s ease, height 1s ease"
    });
}
