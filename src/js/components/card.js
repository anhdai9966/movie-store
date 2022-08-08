/* *__________ Start Select node __________ */
const homeCard = document.querySelector('.home__card');
const cardWrapper = homeCard.querySelector('.card__wrapper');
const cardLists = cardWrapper.querySelectorAll('.card__list');

/* __________ End Select node __________ */

/* *__________ Start render card item __________ */

const cardItemHTML = /*html*/ `
  <div class="card__list">
    <div class="card__item">
      <div class="card__image">
        <img
          src="https://www.themoviedb.org/t/p/w220_and_h330_face/y4SQ2dJ1y2LBUnxTH7hCe8sr29c.jpg"
          alt="Minions: Sự Trỗi Dậy của Gru"
          class="card__img poster__img"
          loading="lazy"
        />
        <div class="card__hover">
          <img
            src="https://www.themoviedb.org/t/p/w533_and_h300_bestv2/jRss224yETAKKzqrOyudQo5ayUd.jpg"
            alt="Minions: Sự Trỗi Dậy của Gru"
            class="backdrop__img"
            loading="lazy"
          />

          <div class="card__overlay"></div>

          <button class="card__btn wishlist__btn card__btn--wishlist">
            <svg class="card__icon wishlist__icon">
              <use href="../../imgs/icons.svg#icon-bookmark"></use>
            </svg>
          </button>

          <div class="card-hover__info">
            <a href="#" class="card__link movie__link"> Minions: Sự Trỗi Dậy của Gru</a>

            <p class="card-hover__para"><span>1h 30p</span> - <span>2022</span> - <span>Chỉ từ 80.000 đ</span></p>

            <a href="#" class="card__link trailer__link">Trailer</a>
          </div>
        </div>
      </div>

      <div class="card__info">
        <a href="#" class="card__link movie__link"> Minions: Sự Trỗi Dậy của Gru </a>

        <p class="card__para">
          <span>7.0</span>

          <svg class="card__icon star__icon">
            <use href="../../imgs/icons.svg#icon-star-fill"></use>
          </svg>

          <span>80.000 đ</span>
        </p>
      </div>

      <a href="#" class="card__link card-mobile__link"></a>
    </div>
  </div>
`;

/* __________ End render card item __________ */

// const hoverEl = document.querySelector('.js-card-home-hover');
// let cardHomeHtml = /*html*/ `
// <div>
//   <a href="#" class="btn btn-icon-save-list-hover">
//     <!-- <div class="pending-text-header"></div> -->
//     <svg>
//       <use href="../imgs/iconsios.svg#icon-save-list"></use>
//     </svg>
//   </a>
// </div>
// <div class="card-overlay-hover"></div>
// <div class="content-hover">
//   <div>
//     <a href="#" class="btn title-hover h5 text-2lines">
//       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, voluptatem.
//       <!-- <div class="pending-text-header-2lines"></div> -->
//     </a>
//   </div>
//   <div class="info-hover text-1line">
//     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, voluptatem.
//     <!-- <div class="pending-text-header"></div> -->
//   </div>
//   <div>
//     <a href="#" class="btn btn-trailer-hover"> Trailer </a>
//   </div>
// </div>`;

// function myFunction(x) {
//   if (x.matches) { // If media query matches
//     console.log('width < 1400px');
//   } else {
//     console.log('width > 1400px');
//   }
// }
// // 1400 right 1595 left 263
// var x = window.matchMedia("(max-width: 1400px)")
// myFunction(x) // Call listener function at run time
// x.addListener(myFunction) // Attach listener function on state changes
// onmouseover

/* *__________ Start Xử lý card hover __________ */

Array.from(cardLists).forEach(cardList => {
  const cardItemFirstEl = cardList.querySelector('.card__item:first-child');
  const cardItemLastEl = cardList.querySelector('.card__item:last-child');
  const offsetwidthWrapper = cardWrapper.offsetWidth;
  const offsetleftItem = cardItemLastEl.offsetLeft + cardItemLastEl.offsetWidth;
  cardItemFirstEl.addEventListener('mouseenter', () => {
    setTimeout(() => {
      cardList.style.justifyContent = 'flex-start';
    }, 300);
  });
  if (offsetleftItem >= offsetwidthWrapper) {
    cardItemLastEl.addEventListener('mouseenter', () => {
      setTimeout(() => {
        cardList.style.justifyContent = 'flex-end';
      }, 300);
    });
  }
})

/* __________ End Xử lý card hover __________ */