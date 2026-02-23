document.addEventListener("DOMContentLoaded", function () {

  const inputs = document.querySelectorAll(".input-text");
  const modal = document.getElementById('thanksModal');
  const closeButton = document.querySelector('.close');
  const contactForm = document.getElementById('contactForm');

  // モーダル初期化
  if (modal) {
    modal.style.display = "none";
    modal.classList.remove("show");
  }

  // フローティングラベル制御
  function toggleLabel(input) {
    if (!input) return;
    if (input.value.trim() !== "") {
      input.classList.add("not-empty");
    } else {
      input.classList.remove("not-empty");
    }
  }

  inputs.forEach(input => {
    toggleLabel(input);
    input.addEventListener("input", () => toggleLabel(input));
  });

  // フォーム送信処理
  if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

      e.preventDefault();

      const form = e.target;
      const submitButton = form.querySelector('.submit-btn');

      if (!submitButton) return;

      submitButton.disabled = true;

      try {

        const formData = new FormData(form);

        // タイムアウト制御（10秒）
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error("HTTPエラー: " + response.status);
        }

        const result = await response.text();

        // GASの戻り値が多少変わっても成功扱いにする
        if (result && result.toLowerCase().includes("success")) {

          if (modal) {
            modal.style.display = "block";
            setTimeout(() => modal.classList.add("show"), 10);
          }

          form.reset();

          inputs.forEach(input => {
            input.classList.remove("not-empty");
          });

        } else {
          throw new Error("送信は完了しましたが、想定外のレスポンスです: " + result);
        }

      } catch (error) {

        console.error("送信エラー:", error);

        alert("送信に問題が発生しました。時間をおいて再度お試しください。");

      } finally {

        submitButton.disabled = false;

      }

    });
  }

  // モーダル閉じる処理
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }

  if (closeButton && modal) {
    closeButton.addEventListener("click", closeModal);
  }

  if (modal) {
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

});