const detailMainEl = document.querySelector('#detail__main');
const yearInputEl = document.getElementById('year__input');
const nationInputEl = document.getElementById('nation__input');

const navResultEl = detailMainEl.querySelector('.nav__result');
const resultGridEl = navResultEl.querySelector('.result__grid');

detailMainEl.addEventListener('click', e => {
  const navBtnEl = e.target.closest('.nav__btn');
  const resultItemEL = e.target.closest('.result__item');
  const classNames = ['nav--active', 'nav__reset'];

  if (!navBtnEl) return;

  if (detailMainEl.querySelector('.nav--active')) {
    detailMainEl.querySelector('.nav--active').classList.remove('nav--active');
  }

  if (!classNames.some(className => navBtnEl.classList.contains(className))) {
    navBtnEl.classList.add('nav--active');

    if(!navBtnEl.classList.contains('nav__sort')) {
      navResultEl.style.display = 'block';
      setTimeout(() => {
        navResultEl.style.opacity = '1';
        navResultEl.style.height = '23rem';
        navResultEl.style.padding = '1rem';
      }, 100);
    }

    navBtnEl.classList.contains('nav__year')
    ? yearInputEl.style.display = 'block'
    : yearInputEl.style.display = 'none';

    navBtnEl.classList.contains('nav__nation')
    ? nationInputEl.style.display = 'block'
    : nationInputEl.style.display = 'none';
  }
}, true);

// movieMainEl.querySelector('.nav__reset').style.display = 'block';

detailMainEl.addEventListener('click', e => {
  const resultItemEL = e.target.closest('.result__item');

  if (!resultItemEL) return;

  if (detailMainEl.querySelector('.result__item--active')) {
    detailMainEl.querySelector('.result__item--active').classList.remove('result__item--active');
  }

  if(!resultItemEL.classList.contains('result__item--active')) {
    resultItemEL.classList.add('result__item--active');
  }
}, true);