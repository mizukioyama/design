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
// Page specific
// ===============================
switch (page) {
  case "service": {
    // styles
    import("./style/card.css");
    import("./style/se-list.css");
    import("./style/tab.css");

    // scripts（両方読み込む）
    Promise.all([
      import("../js/tab.js"),
      import("../js/se-list.js"),
      import("../js/card.js")
    ]).then(([tab, list, card]) => {
      document.addEventListener("DOMContentLoaded", () => {

        // mobile tabs
        document.querySelectorAll(".tab-wrap.mobile-only").forEach(wrap => {
          tab.initTab?.(wrap);
        });

        // pc tabs
        document.querySelectorAll(".tab-wrap.pc-only").forEach(wrap => {
          list.initTab?.(wrap);
        });

        card.initCard?.();
      });
    }).catch(err => {
      console.error("service page error:", err);
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
