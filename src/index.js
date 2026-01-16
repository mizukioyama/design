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

// common styles
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
// Page specific
// ===============================
switch (page) {

  case "service":
    // CSS
    import("./style/card.css");
    import("./style/se-list.css");
    import("./style/tab.css");

    // JS
    Promise.all([
      import("../js/card.js"),
      import("../js/se-list.js"),
      import("../js/tab.js")
    ])
      .then(([card, list, tab]) => {
        card.initCard?.();
        list.initTab?.();   // ← se-list 用ならOK
        tab.initTab?.();    // ← mobile / PC 共通
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

// ===============================
// Assets
// ===============================
import "./assets/images/pd.ico";
import "./assets/images/logo-tyep.png";
import "./assets/images/pd-bg-img.jpg";
import "./assets/images/pd-body-bg.jpg";
import "./assets/images/text-gold.png";
import "./assets/images/text-bronze.png";
import "./assets/images/bg-a.png";
import "./assets/images/bg-c.png";
import "./assets/images/bg-s.png";
import "./assets/images/bg-p.png";
import "./assets/images/mobile-main-second.png";
import "./assets/audio/tukinohikari.mp3";
