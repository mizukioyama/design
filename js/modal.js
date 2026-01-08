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
