// const rowGridEl = document.querySelectorAll('.row-grid');

// const picItem = {
//   render: ({ posterPath, title, idMovie }) => {
//     return /*html*/ `
//       <div class="pic-item">
//         <div class="img">
//           <img src="https://image.tmdb.org/t/p/w200/${posterPath}" loading="lazy">
//         </div>
//         <a href="#id=${idMovie}" class="title text-3lines">${title}</a>
//         <a href="#id=${idMovie}" class="btn pic-btn"></a>
//       </div>`;
//   },
// };

// const pendingBg = {
//   render: () => {
//     return /*html*/ `
//       <div class="pic-item">
//         <div class="img">
//           <div class="pending-bg"></div>
//         </div>
//       </div>`;
//   },
// };
// let pendingHtml = '';
// for (let i = 0; i < 80; i++) {
//   pendingHtml += pendingBg.render();
// }
// rowGridEl[0].innerHTML = pendingHtml;
// rowGridEl[1].innerHTML = pendingHtml;

// const listName = ['now_playing', 'popular', 'top_rated', 'upcoming'];

// const fetchAPI = async () => {
//   try {
//     const res = await fetch('https://62c46f2c7d83a75e39f9dad7.mockapi.io/api/header-moviess');
//     const movies = await res.json();
//     console.log(res, movies);
//     // const html = await movies
//     //   .map(movie => {
//     //     let mov = {
//     //       backdropPath: movie.backdropPath,
//     //       posterPath: movie.posterPath,
//     //       title: movie.title,
//     //       originalTitle: movie.originalTitle,
//     //       idMovie: movie.idMovie,
//     //     };
//     //     return picItem.render(mov);
//     //   })
//     //   .join('');
//     // rowGridEl[0].innerHTML = html;
//     // rowGridEl[1].innerHTML = html;
//   } catch (error) {
//     console.log(error);
//     return { Error: error.message };
//   }
// };

// // utils.movieRequest(`movie/823625`).then(movie => {
// //   let mov = {
// //     backdropPath: movie.backdrop_path,
// //     posterPath: movie.poster_path,
// //     title: movie.title,
// //     originalTitle: movie.original_title,
// //     idMovie: movie.id,
// //   };
// //   mockapi(mov);
// // });

// const mockapi = async (movie) => {
//   fetch('https://62c46f2c7d83a75e39f9dad7.mockapi.io/api/header-movies', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(movie)
//   })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log('Success:',data)
//   })
//   .catch((error) => {
//     console.log('Error:', error);
//   });
// }

// fetchAPI();

// const headerShadow = document.querySelector('.header-shadow');
// const headerText = document.querySelector('.header-text');

// // headerShadow.addEventListener('mouseenter', () => {
// //   headerShadow.style.visibility = 'hidden';
// // });
// headerText.addEventListener('mouseenter', () => {
//   headerShadow.style.visibility = 'visible';
//   headerShadow.style.opacity = '1';
// });
// headerText.addEventListener('mouseleave', () => {
//   headerShadow.style.opacity = '0';
//   setTimeout(() => {
//     headerShadow.style.visibility = 'hidden';
//   }, 200);
// });

/* *__________ Start xử lý focus email input __________ */
const headerBanner = document.querySelector('.header__banner');
const emailInput = headerBanner.querySelector('.email__input');
const inputPlaceholder = headerBanner.querySelector('.input__placeholder');
let inputPlaceholderStyle = {};
function blurPlaceholder() {
  if (emailInput.value) {
    inputPlaceholderStyle = {
      'top': 0,
      'font-size': '1.2rem',
    };
    Object.assign(inputPlaceholder.style, inputPlaceholderStyle);
  } else {
    inputPlaceholderStyle = {
      'top': '1.2rem',
      'font-size': '1.6rem',
    };
    Object.assign(inputPlaceholder.style, inputPlaceholderStyle);
  }
}
function focusPlaceholder() {
  inputPlaceholderStyle = {
    'top': 0,
    'font-size': '1.2rem',
  };
  Object.assign(inputPlaceholder.style, inputPlaceholderStyle);
}
/* __________ End xử lý focus email input __________ */
