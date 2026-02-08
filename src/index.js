// ===============================
// Page detection
// ===============================
const page = document.body.dataset.page;

// ===============================
// Global assets
// ===============================
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/fonts/fonts.css";
import "./assets/audio/tukinohikari.mp3";

import "./style/all.css";
import "./style/menu.css";
import "./style/cursor.css";
import "./style/section.css";
import "./style/bot.css";
import "./style/footer.css";
import "./style/accordion.css";
import "./style/modal.css";

import "../js/section.js";
import "../js/cursor.js";
import "../js/accordion.js";
import "../js/chat.js";
import "../js/fade.js";
import "../js/head-foot.js";
import "../js/modal.js";
import "../js/google.js";

// ===============================
// Mobile判定
// ===============================
const isMobile = window.matchMedia("(max-width: 599px)").matches;

// ===============================
// DOM ready 待ち
// ===============================
window.addEventListener("DOMContentLoaded", () => {

  switch (page) {
    case "service": {
      import("./style/card.css");
      import("./style/se-list.css");

      Promise.all([
        import("../js/card.js"),
        import("../js/se-list.js")
      ]).then(([card, list]) => {
        card.initCard?.();
        list.initTab?.(); // ← mobile / PC 両方でOK
      });

      break;
    }

    case "contact":
      import("./style/form.css");
      import("../js/form.js");
      break;

    case "blog":
      import("./style/blog.css");
      import("../js/blog.js");
      import("../js/blog-categories.js");
      break;

    case "matching":
      import("./style/matching.css");
      import("../js/hearing.js");
      break;
  }

});
