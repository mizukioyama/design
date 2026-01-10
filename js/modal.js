document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.modal-overlay');
  let activeModal = null;

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    activeModal = modal;
    overlay.classList.add('show');
    modal.classList.add('show');
  }

  function closeModal() {
    if (!activeModal) return;
    activeModal.classList.remove('show');
    overlay.classList.remove('show');
    activeModal = null;
  }

  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openModal(btn.dataset.modal);
    });
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});
