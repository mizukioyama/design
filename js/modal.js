document.addEventListener('DOMContentLoaded', () => {

  const overlay = document.querySelector('.modal-overlay');
  let activeModal = null;

  /* ========= モーダルを開く ========= */
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    activeModal = modal;
    overlay.classList.add('show');
    modal.classList.add('show');
    document.body.classList.add('modal-open');
  }

  /* ========= モーダルを閉じる ========= */
  function closeModal() {
    if (!activeModal) return;

    activeModal.classList.remove('show');
    overlay.classList.remove('show');
    document.body.classList.remove('modal-open');
    activeModal = null;
  }

  /* ========= トリガー ========= */
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      openModal(btn.dataset.modal);
    });
  });

  /* ========= overlayクリック ========= */
  overlay.addEventListener('click', e => {
    if (e.target !== overlay) return;
    closeModal();
  });

  /* ========= closeボタン ========= */
  document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  });

  /* ========= Esc ========= */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

});
