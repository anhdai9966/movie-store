import * as c from './components.js';

const giftDb = async () => {
  const res = await fetch('../json/gift.json');
  const movies = await res.json();
  const html = await movies.map(movie => {
    let movieObj = {
      backdropPath: movie.backdropPath,
      posterPath: movie.posterPath,
      title: movie.title,
      originalTitle: movie.originalTitle,
      idMovie: movie.idMovie,
    }
    c.picItem.render(movieObj);
  }).join('');
  
}
giftDb();