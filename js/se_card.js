const cardModalContents = [
  { left: "<h4>Web Design</h4><p>基本的なHTML/CSS/JavaScriptを使用してコーディングを行い制作いたします。「TOP、About、Service、Contact、Information」などの1～5ページ程度のシンプルなサイト制作を行います。 ビジュアルはもちろん、文章に乗せる言葉などの細部もこだわり制作いたします。<br>※制作を検討中の方でも問合せを受け付けているので、お気軽にお問い合わせください。アニメーション、表示速度の調整も可能です。</p>" },
  { left: "<h4>Art Order</h4><p>Art作品の制作を行います。Abstract Art、Digital Art、などの制作が可能です。新築、新居にも合うArt作品を提供いたします。<br>※サイズや使用する画材で価格が変動するので、Orderをご検討の方は問合せにてOrderの詳細をお伝えいたしますので、お気軽にお申し付けください。</p>" },
  { left: "<h4>Consulting</h4><p>個人事業や新規事業の立ち上げへのアドバイスや事業の土台固めを行います。<br>※無料相談「1時間」のお申込みもできますのでお気軽にお申し付けください。※個人事業や新規事業の土台固め、ブランディングの補助を行いますので、ビジョンやこだわり、想いなどの情報共有をお願いいたします。</p>" },
  { left: "<h4>Illustration</h4><p>Webやチラシなど様々な用途で使用できる雰囲気に合ったイラストを提供します。対応しているもの、「ウェブ、印刷、イメージキャラクター」などのイラストを制作します。</p>" },
  { left: "<h4>Writing</h4><p>ウェブ、印刷物、などで使用する文章のライティングを行います。「キャッチコピー、SEOを意識した文章」などのライティングを行います。<br>※お申込み後の面談前日までに乗せたい「文章、キャッチコピー」などがございましたら共有をお願いいたします。</p>" },
  { left: "<h4>Photo</h4><p>Webで使用する写真や商品や個人のプロフィール写真撮影。シンプルなセットで、手軽な撮影を行います。<br>※遠方の撮影も可能ですが、別途交通費のご負担をお願いしています。</p>" },
  { left: "<h4>Video</h4><p>ウェブで使用する映像を撮影・制作を行います。<br>※簡単なアニメーションやスライドショーなど、シンプルな2D動画。商品紹介やサービス説明動画などが中心になります。※制作が困難な場合は、こちらで映像制作を外注が必須になることがあるので、あらかじめクオリティーやイメージをお知らせください。</p>" },
  { left: "<h4>DTP Design</h4><p>印刷物のデザイン制作を行います。<br>※印刷まで行うことも可能ですが、印刷業者、品質で価格が変動しますのでご了承ください。※対応可能な印刷物「メニュー表、名刺、チラシ、ポスター」</p>" },
  { left: "<h4>Banner</h4><p>SNSの投稿用や広告用のバナー制作を行います。<br>※キャンペーンやイベント告知に使用するバナーなども制作しております。※バナーとLP/HPのセットでお申込みいただけるので、LPやHPの制作をご検討中の方はご相談ください。</p>" },
  { left: "<h4>Logo</h4><p>会社や組織団体で使用できる、シンプルなロゴのデザインを行います。<br>※Web用、印刷用どちらも対応いたします。</p>" },
  { left: "<h4>etc...</h4><p>表記のないものを依頼したい場合は、Contactページからお問合せください。</p>" }
];

let clickedCard = null;
let isClosing = false;

/* =========================
   Card Click
========================= */
function cardClicked(cardIndex) {
  const cards = document.querySelectorAll(".se_card");

  if (cardIndex < 1 || cardIndex > cards.length) return;

  if (clickedCard) closeModal();

  clickedCard = cards[cardIndex - 1];
  clickedCard.classList.add("card-clicked");

  moveCardToCenter(clickedCard, cardIndex);
}

/* =========================
   Move Card
========================= */
function moveCardToCenter(card, cardIndex) {
  const rect = card.getBoundingClientRect();
  const centerX = window.innerWidth / 2 - rect.width / 2;

  card.style.transform = `translateX(${centerX - rect.left}px) scale(1.2)`;

  const onTransitionEnd = () => {
    card.removeEventListener("transitionend", onTransitionEnd);
    openModal(cardIndex);
  };

  card.addEventListener("transitionend", onTransitionEnd);

  document.querySelectorAll(".se_card:not(.card-clicked)").forEach(other => {
    other.style.transform = "translateY(50%)";
    other.style.opacity = "0.5";
  });
}

/* =========================
   Modal Open
========================= */
function openModal(cardIndex) {
  closeModal(); // 念のため一度閉じる

  const modal = document.createElement("div");
  modal.id = "dynamic-modal";
  modal.className = "se-modal";

  const content = document.createElement("div");
  content.className = "modal-content";

  const left = document.createElement("div");
  left.className = "modal-left-content";
  left.innerHTML = cardModalContents[cardIndex - 1]?.left || "";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", closeModal);

  content.append(left, closeBtn);
  modal.appendChild(content);
  document.body.appendChild(modal);
}

/* =========================
   Modal Close（安全）
========================= */
function closeModal() {
  if (isClosing) return;
  isClosing = true;

  const modal = document.getElementById("dynamic-modal");
  if (modal && modal.parentNode) {
    modal.parentNode.removeChild(modal);
  }

  document.querySelectorAll(".se_card").forEach(card => {
    card.style.transform = "";
    card.style.opacity = "1";
    card.classList.remove("card-clicked");
  });

  clickedCard = null;
  isClosing = false;
}

/* =========================
   Outside Click
========================= */
window.addEventListener("click", event => {
  const modal = document.getElementById("dynamic-modal");
  if (!modal) return;

  if (!modal.contains(event.target) &&
      !event.target.closest(".se_card")) {
    closeModal();
  }
});
