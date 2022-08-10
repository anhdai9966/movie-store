import * as c from '../components.js';

const picGiftEl = document.querySelector('.js-pic-gift');

const giftDb = async () => {
  const res = await fetch('../../json/gift.json');
  const movies = await res.json();
  const html = await movies.map(movie => {
    let movieObj = {
      backdropPath: movie.backdropPath,
      posterPath: movie.posterPath,
      title: movie.title,
      originalTitle: movie.originalTitle,
      idMovie: movie.idMovie,
    }
    return c.picItem.render(movieObj);
  }).join('');
  picGiftEl.innerHTML = html;
}
giftDb();