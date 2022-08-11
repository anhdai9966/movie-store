const cardGridElment = document.querySelector('.card__grid');
const containerElement = document.querySelector('.container');

cardGridElment.addEventListener('mouseover', e => { 
  // lấy dúng sự kiện tại phần tử trailer
  const trailerLinkElement  = e.target.closest('.trailer__link');
  
  // nếu không đúng thì thôi
  if (!trailerLinkElement) return;
  
  // chọn phần tử cha
  const parentElement = trailerLinkElement.parentElement;
  // chọn ngược lại phần tử overview
  const movieOverview = parentElement.querySelector('.movie__overview');
  // lấy width của overview hiện tại
  const cardDescriptionWidth = movieOverview.offsetWidth;
  // lấy kích thước card gần với cạnh phải nhất
  const offsetLeft = parentElement.offsetLeft + parentElement.offsetWidth;

  // kiểm tra nếu nó vượt quá container thì di chuyển overview sang trái
  if (offsetLeft >= containerElement.offsetWidth ) {
    movieOverview.style.left = `calc(50% - 2.5rem - ${cardDescriptionWidth}px)`;
  };
}, true); // true là ưu tiên sự kiện con trước

// const maxWidthMd = window.matchMedia("(min-width: 768px)");

// if (maxWidthMd.matches) {
// }