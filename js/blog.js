document.addEventListener("DOMContentLoaded", () => {
   console.log("DOM fully loaded and parsed");

   /** 🏷️ 目次の自動生成 */
   const tocList = document.getElementById("toc-list");
   const headings = document.querySelectorAll("article h2, article h3");

   if (tocList) {
      if (headings.length > 0) {
         headings.forEach((heading, index) => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = `#section-${index}`;
            link.textContent = heading.textContent;
            listItem.appendChild(link);
            tocList.appendChild(listItem);

            // IDを追加してリンク対応
            heading.id = `section-${index}`;
         });
         console.log("✅ 目次が正常に追加されました。");
      } else {
         console.warn("⚠️ `article` 内に `h2` や `h3` がありません。目次を生成できません。");
      }
   } else {
      console.error("❌ `#toc-list` が見つかりません。");
   }

   /** 🏷️ カテゴリーリストの自動生成 */
   const categories = [
      { name: "Works", slug: "works" },
      { name: "実績", slug: "results" },
      { name: "デザイン", slug: "design" },
      { name: "Web制作", slug: "web-development" },
      { name: "SEO", slug: "seo" },
      { name: "マーケティング", slug: "marketing" },
      { name: "個人事業サポート", slug: "business-support" }
   ];

   const categoryList = document.getElementById("category-list");

   if (categoryList) {
      categories.forEach(category => {
         const listItem = document.createElement("li");
         const link = document.createElement("a");
         link.href = `categories.html?category=${category.slug}`;
         link.textContent = category.name;
         listItem.appendChild(link);
         categoryList.appendChild(listItem);
      });
      console.log("✅ カテゴリーリストが正常に追加されました。");
   } else {
      console.error("❌ `#category-list` が見つかりません。");
   }
});


// サンプル記事データ
const articles = [
   { title: "SEOブログサイト", description: "概要1", thumbnail: "/img/pd-bg-img01.png", link: "https://example.com/seo", category: "ブログ", date: "2025-01-20" },
   { title: "記事タイトル2", description: "概要2", thumbnail: "thumbnail2.jpg", link: "https://example.com/article2", category: "ニュース", date: "2025-01-19" },
   { title: "記事タイトル3", description: "概要3", thumbnail: "thumbnail3.jpg", link: "https://example.com/article3", category: "ブログ", date: "2025-01-18" },
   { title: "記事タイトル4", description: "概要4", thumbnail: "thumbnail4.jpg", link: "https://example.com/article4", category: "レビュー", date: "2025-01-17" },
   { title: "記事タイトル5", description: "概要5", thumbnail: "thumbnail5.jpg", link: "https://example.com/article5", category: "ブログ", date: "2025-01-16" },
   { title: "記事タイトル6", description: "概要6", thumbnail: "thumbnail6.jpg", link: "https://example.com/article6", category: "ニュース", date: "2025-01-15" },
   { title: "記事タイトル7", description: "概要7", thumbnail: "thumbnail7.jpg", link: "https://example.com/article7", category: "レビュー", date: "2025-01-14" },
   { title: "記事タイトル8", description: "概要8", thumbnail: "thumbnail8.jpg", link: "https://example.com/article8", category: "ブログ", date: "2025-01-13" }
];

// ページネーション設定
const articlesPerPage = 2;
let currentPage = 1;
let currentCategory = "すべて"; // 初期値: すべてのジャンル

// DOM要素
const articleContainer = document.getElementById("article-container");
const prevPageBtn = document.getElementById("prev-page");
const nextPageBtn = document.getElementById("next-page");
const pageInfo = document.getElementById("page-info");
const categoryFilter = document.getElementById("category-filter");

// カテゴリ一覧を取得
function getUniqueCategories() {
   const categories = articles.map(article => article.category);
   return ["すべて", ...new Set(categories)];
}

// フィルターとページネーションを更新
function renderArticles() {
   // 選択されたカテゴリに基づいて記事をフィルタリング
   const filteredArticles = currentCategory === "すべて"
      ? articles
      : articles.filter(article => article.category === currentCategory);

   // 日付順にソート（降順）
   filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

   // 表示する記事の開始と終了インデックス
   const startIndex = (currentPage - 1) * articlesPerPage;
   const endIndex = startIndex + articlesPerPage;

   // 記事を表示
   articleContainer.innerHTML = "";
   const visibleArticles = filteredArticles.slice(startIndex, endIndex);
   visibleArticles.forEach(article => {
      const articleCard = document.createElement("div");
      articleCard.classList.add("article-card");
      articleCard.innerHTML = `
         <img src="${article.thumbnail}" alt="${article.title}">
         <h4><a href="${article.link}" target="_blank">${article.title}</a></h4>
         <p>${article.description}</p>
         <p class="article-date">投稿日: ${article.date}</p>
      `;
      articleContainer.appendChild(articleCard);
   });

   // ページ情報を更新
   const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
   pageInfo.textContent = `${currentPage} / ${totalPages}`;

   // ボタンの有効・無効化
   prevPageBtn.disabled = currentPage === 1;
   nextPageBtn.disabled = currentPage === totalPages;
}

// カテゴリフィルターの初期化
function initializeCategoryFilter() {
   const categories = getUniqueCategories();
   categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
   });

   categoryFilter.addEventListener("change", () => {
      currentCategory = categoryFilter.value;
      currentPage = 1; // カテゴリ変更時はページをリセット
      renderArticles();
   });
}

// ページ変更ハンドラ
prevPageBtn.addEventListener("click", () => {
   if (currentPage > 1) {
      currentPage--;
      renderArticles();
   }
});

nextPageBtn.addEventListener("click", () => {
   const totalPages = Math.ceil(articles.length / articlesPerPage);
   if (currentPage < totalPages) {
      currentPage++;
      renderArticles();
   }
});

// 初期表示
document.addEventListener("DOMContentLoaded", () => {
   initializeCategoryFilter();
   renderArticles();
});
