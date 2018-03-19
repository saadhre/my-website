document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.navbar-burger').addEventListener('click', () => {
    document.querySelector('.navbar-menu').classList.toggle('is-active');
  });

  let openStackButton = document.getElementById('show-stack');
  openStackButton.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('stack').classList.toggle('is-hidden');
    openStackButton.classList.toggle('is-active');
  });
});