const hoverEl = document.querySelector('.js-card-home-hover');
let cardHomeHtml = /*html*/ `
<div>
  <a href="#" class="btn btn-icon-save-list-hover">
    <!-- <div class="pending-text-header"></div> -->
    <svg>
      <use href="../imgs/iconsios.svg#icon-save-list"></use>
    </svg>
  </a>
</div>
<div class="card-overlay-hover"></div>
<div class="content-hover">
  <div>
    <a href="#" class="btn title-hover h5 text-2lines">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, voluptatem.
      <!-- <div class="pending-text-header-2lines"></div> -->
    </a>
  </div>
  <div class="info-hover text-1line">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, voluptatem.
    <!-- <div class="pending-text-header"></div> -->
  </div>
  <div>
    <a href="#" class="btn btn-trailer-hover"> Trailer </a>
  </div>
</div>`;

const cardItemEl = document.querySelector('.card-home-item');
cardItemEl.addEventListener('mouseenter', rederHover, true);

function rederHover() {
  hoverEl.innerHTML = cardHomeHtml;
  cardItemEl.removeEventListener('mouseenter', rederHover, true);
}

/* <div class="show-trailer">
  <a href="#" class="btn btn-dismiss">X</a>
  <div class="iframe">
    <div class="pending-bg"></div>
  </div>
</div> */

// const showTrailer = document.querySelector('.show-trailer');
// const btnTrailer = document.querySelector('.btn-trailer-hover');
// const cardHomeItem = document.querySelector('.card-home-item');
// const btnDismiss = document.querySelector('.btn-dismiss');
// const iframe = document.querySelector('.iframe');
// btnTrailer.addEventListener('click', trailer);

// function trailer() {
//   showTrailer.style.display = 'block';
//   btnDismiss.style.display = 'block';
//   iframe.style.display = 'block';
//   btnDismiss.addEventListener('click', () => {
//     iframe.style.display = 'none';
//     btnDismiss.style.display = 'none';
//     cardHomeItem.addEventListener('mouseenter', hide, true);
//   });
//   cardHomeItem.removeEventListener('mouseenter', hide, true);
// }

// function hide() {
//   showTrailer.style.display = 'none';
// }
