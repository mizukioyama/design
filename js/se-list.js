document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     Smooth Scroll（安全版）
  ========================= */
  const scrollDuration = 600;
  let isScrolling = false;

  function smoothScroll(targetEl) {
    if (!targetEl || targetEl === "#") return;
    const target = document.querySelector(targetEl);
    if (!target) return;

    if (isScrolling) return;
    isScrolling = true;

    const startY = window.pageYOffset;
    const targetY = target.getBoundingClientRect().top + startY;
    const distance = targetY - startY;
    let startTime = null;

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    function animate(time) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const y = ease(elapsed, startY, distance, scrollDuration);
      window.scrollTo(0, y);

      if (elapsed < scrollDuration) {
        requestAnimationFrame(animate);
      } else {
        isScrolling = false;
      }
    }

    requestAnimationFrame(animate);
  }

  document.querySelectorAll('a[href^="#"]:not([href="#"])')
    .forEach(a => {
      a.addEventListener("click", e => {
        e.preventDefault();
        smoothScroll(a.getAttribute("href"));
      });
    });

  /* =========================
     Tab Control（安全）
  ========================= */
  const tabs = document.querySelectorAll(".list-tab");
  const contents = document.querySelectorAll(".list-container .container");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const id = tab.id.replace("li-tab--", "");

      tabs.forEach(t => t.classList.remove("selected"));
      tab.classList.add("selected");

      contents.forEach(c => c.classList.remove("show"));
      document.getElementById(`content--${id}`)?.classList.add("show");
    });
  });

  requestAnimationFrame(() => {
    document.getElementById("li-tab--first")?.click();
  });

  /* =========================
     Card Animation（統合）
  ========================= */
  const cards = document.querySelectorAll(".se_card");
  const modal = document.getElementById("dynamic-modal");

  let activeCard = null;

  cards.forEach((card, index) => {
    card.addEventListener("click", e => {
      e.stopPropagation();

      if (activeCard === card) {
        closeModal();
        return;
      }

      resetCards();
      activeCard = card;
      card.classList.add("is-active");

      requestAnimationFrame(() => {
        card.classList.add("is-centered");
        openModal(index);
      });
    });
  });

  function resetCards() {
    cards.forEach(c => {
      c.classList.remove("is-active", "is-centered");
    });
    activeCard = null;
  }

  /* =========================
     Modal Control（DOM常設）
  ========================= */
  const modalContent = document.querySelector(".modal-left-content");

  const modalData = [
    "<h4>Web Design</h4><p>HTML/CSS/JS制作</p>",
    "<h4>Art Order</h4><p>Art制作</p>",
    "<h4>Consulting</h4><p>事業支援</p>",
    "<h4>Illustration</h4><p>イラスト制作</p>",
    "<h4>Writing</h4><p>ライティング</p>",
    "<h4>Photo</h4><p>撮影</p>",
    "<h4>Video</h4><p>映像制作</p>",
    "<h4>DTP</h4><p>印刷物</p>",
    "<h4>Banner</h4><p>バナー制作</p>",
    "<h4>Logo</h4><p>ロゴ制作</p>",
    "<h4>etc</h4><p>その他</p>"
  ];

  function openModal(index) {
    if (!modal) return;
    modalContent.innerHTML = modalData[index] || "";
    modal.classList.add("is-open");
  }

  function closeModal() {
    modal?.classList.remove("is-open");
    resetCards();
  }

  document.querySelector(".modal-close")?.addEventListener("click", closeModal);

  window.addEventListener("click", e => {
    if (modal?.classList.contains("is-open") &&
        !modal.contains(e.target) &&
        !e.target.closest(".se_card")) {
      closeModal();
    }
  });

});
