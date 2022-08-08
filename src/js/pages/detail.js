const detailMain = document.querySelector('.detail__main');
const navActiveEl = detailMain.querySelector('.nav__active');
function activeTranX(e) {
  const targetEl = window.event.target;
  if (!targetEl) return;
  const getStr = targetEl.getAttribute('class');
  const nameEl = getStr.substring(0, getStr.indexOf('-'));
  console.log(nameEl);
  switch (e) {
    case 0:
      navActiveEl.style.left = `calc(((100% - .6rem) / 3) * ${e} + .3rem)`;
      detailMain.querySelector('.main__show').classList.remove('main__show');
      detailMain.querySelector(`.movie__${nameEl}`).classList.add('main__show');
      break;
    case 1:
      navActiveEl.style.left = `calc(((100% - .6rem) / 3) * ${e} + .3rem)`;
      detailMain.querySelector('.main__show').classList.remove('main__show');
      detailMain.querySelector(`.movie__${nameEl}`).classList.add('main__show');
      break;
    case 2:
      navActiveEl.style.left = `calc(((100% - .6rem) / 3) * ${e} + .3rem)`;
      detailMain.querySelector('.main__show').classList.remove('main__show');
      detailMain.querySelector(`.movie__${nameEl}`).classList.add('main__show');
      break;
  }
}
