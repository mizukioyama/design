document.querySelectorAll('.accordion-wrap').forEach(wrap => {
  const headers = wrap.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', e => {
      e.preventDefault(); // ← スクロールを止める

      const item = header.closest('.accordion-item');
      const isActive = item.classList.contains('active');

      wrap.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        const text = i.querySelector('.accordion-text');
        text.style.maxHeight = null;
        text.style.padding = '0';
        i.querySelector('.fa')?.classList.remove('rotate-fa');
      });

      if (!isActive) {
        item.classList.add('active');
        const text = item.querySelector('.accordion-text');
        text.style.maxHeight = text.scrollHeight + 'px';
        text.style.padding = '1rem';
        item.querySelector('.fa')?.classList.add('rotate-fa');
      }
    });
  });
});
