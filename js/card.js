document.addEventListener("DOMContentLoaded", () => {
    const cardWrappers = document.querySelectorAll(".card-wrapper");
    const overlay = document.querySelector(".modal-overlay");

    cardWrappers.forEach((wrapper) => {
        wrapper.addEventListener("click", (e) => {
            e.stopPropagation();

            const isActive = wrapper.classList.contains("active");

            resetCards(cardWrappers);

            if (!isActive) {
                activateCard(wrapper, overlay);
            }
        });
    });

    // 背景クリックでリセット
    document.addEventListener("click", () => {
        resetCards(cardWrappers);
        restoreOverlay(overlay);
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

function activateCard(wrapper, overlay) {
    // overlay がクリックを奪わないようにする
    disableOverlay(overlay);

    wrapper.classList.add("active");
    wrapper.style.zIndex = 100;

    requestAnimationFrame(() => {
        wrapper.style.transition = "transform 0.3s ease";
        wrapper.style.transform = "scale(1.2)";

        setTimeout(() => moveToCenter(wrapper), 300);
    });
}

function moveToCenter(wrapper) {
    const rect = wrapper.getBoundingClientRect();

    const translateX =
        window.innerWidth / 2 - rect.width / 2 - rect.left;
    const translateY =
        window.innerHeight / 2 - rect.height / 2 - rect.top;

    wrapper.style.transition = "transform 0.25s ease";
    wrapper.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(1.2)`;

    setTimeout(() => expandBackground(wrapper), 250);
}

function expandBackground(wrapper) {
    const bg = wrapper.querySelector(".card-background");
    if (!bg) return;

    Object.assign(bg.style, {
        top: "0",
        left: "47%",
        width: "75vmin",
        maxHeight: "40vmin",
        padding: "1vmin 4vmin 2vmin 22vmin",
        transition: "all 0.25s ease, height 1s ease"
    });
}

/* =========================
   overlay 制御（最重要）.js
========================= */

function disableOverlay(overlay) {
    if (!overlay) return;
    overlay.style.pointerEvents = "none";
}

function restoreOverlay(overlay) {
    if (!overlay) return;
    overlay.style.pointerEvents = "";
}
