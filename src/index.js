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
  // mobile CSS
  import("./style/mobile-all.css");
  import("./style/mobile-page.css");
  import("./style/tab.css");

  // mobile tab
  import("../js/tab.js")
    .then(tabModule => {
      tabModule.initTab?.(); // ← 即実行（DOMContentLoaded 不要）
    })
    .catch(err => {
      console.error("mobile tab error:", err);
    });
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
      import("../js/se-list.js")
    ]).then(([card, list]) => {
      card.initCard?.();

      // ※ mobile tab.js と役割が被らないよう注意
      if (!isMobile) {
        list.initTab?.();
      }
    }).catch(err => {
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

// ===============================
// Assets
// ===============================
import "./assets/images/pd.ico";
import "./assets/images/logo-tyep.png";
import "./assets/images/pd-bg-img.jpg";
import "./assets/images/pd-body-bg.jpg";

// bg
import "./assets/images/text-gold.png";
import "./assets/images/text-bronze.png";

// section
import "./assets/images/bg-a.png";
import "./assets/images/bg-c.png";
import "./assets/images/bg-s.png";
import "./assets/images/bg-p.png";

// mobile
import "./assets/images/mobile-main-second.png";

// audio
import "./assets/audio/tukinohikari.mp3";
