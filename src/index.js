// ===============================
// Page detection
// ===============================
const page = document.body.dataset.page;

// ===============================
// Global assets (ALL PAGES)
// ===============================

// icons & fonts
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/fonts/fonts.css";

// audio
import "./assets/audio/tukinohikari.mp3";

// common PC styles
import "./style/all.css";
import "./style/menu.css";
import "./style/cursor.css";
import "./style/section.css";
import "./style/bot.css";
import "./style/footer.css";
import "./style/accordion.css";
import "./style/modal.css";

// common JS
import "../js/section.js";
import "../js/cursor.js";
import "../js/accordion.js";
import "../js/chat.js";
import "../js/fade.js";
import "../js/head-foot.js";
import "../js/modal.js";
import "../js/google.js";

// ===============================
// Mobile common (ALL PAGES)
// ===============================
const isMobile = window.matchMedia("(max-width: 599px)").matches;

if (isMobile) {
  Promise.all([
    import("./style/mobile-all.css"),
    import("./style/mobile-page.css"),
    import("./style/tab.css"),
    import("../js/tab.js")
  ])
    .then(([, , , tab]) => {
      tab.initTab?.();
    })
    .catch(err => console.error("mobile tab error:", err));
}

// ===============================
// Page specific
// ===============================
switch (page) {
  case "service":
    import("./style/card.css");
    import("./style/se-list.css");

    Promise.all([
      import("../js/card.js"),
      import("../js/se-list-sp.js"),
      import("../js/se-list.js")
    ])
      .then(([card, list]) => {
        card.initCard?.();

        // ✅ mobile / PC 両方で必ず実行
        list.initTab?.();
      })
      .catch(err => {
        console.error("service page js error:", err);
      });

    break;

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
