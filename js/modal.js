document.addEventListener('DOMContentLoaded', function () {

  function openStaticModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.querySelector('.modal-overlay');

    if (!modal || !overlay) return;

    modal.classList.add('show');
    overlay.classList.add('show');
    document.body.classList.add('modal-open');
  }

  function closeStaticModal() {
    document.querySelectorAll('.modal.show').forEach(modal => {
      modal.classList.remove('show');
    });

    const overlay = document.querySelector('.modal-overlay');
    if (overlay) overlay.classList.remove('show');

    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      openStaticModal(button.dataset.modal);
    });
  });

  const overlay = document.querySelector('.modal-overlay');
  if (overlay) overlay.addEventListener('click', closeStaticModal);

  document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', closeStaticModal);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeStaticModal();
  });
});
document.addEventListener('DOMContentLoaded', () => {

  const overlay = document.querySelector('.modal-overlay');
  if (!overlay) return;

  let activeModal = null;

  /* ===============================
     モーダルを開く
  =============================== */
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    activeModal = modal;

    modal.classList.add('show');
    overlay.classList.add('show');
    document.body.classList.add('modal-open');
  }

  /* ===============================
     モーダルを閉じる
  =============================== */
  function closeModal() {
    if (!activeModal) return;

    activeModal.classList.remove('show');
    overlay.classList.remove('show');
    document.body.classList.remove('modal-open');

    activeModal = null;
  }

  /* ===============================
     トリガーボタン
  =============================== */
  document.querySelectorAll('.button[data-modal]').forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation(); // ← 他JS遮断
      openModal(button.dataset.modal);
    });
  });

  /* ===============================
     overlay クリック
     ※ モーダル外だけ有効
  =============================== */
  overlay.addEventListener('click', e => {
    if (!activeModal) return;

    // modal 内クリックは無視
    if (activeModal.contains(e.target)) return;

    closeModal();
  });

  /* ===============================
     close ボタン
  =============================== */
  document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  });

  /* ===============================
     Escキー
  =============================== */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeModal) {
      closeModal();
    }
  });

});
