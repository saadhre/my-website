document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.navbar-burger').addEventListener('click', () => {
    document.querySelector('.navbar-menu').classList.toggle('is-active');
  });
});