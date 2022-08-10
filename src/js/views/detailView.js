import View from './View.js';
import { calcRuntime, pathPictureW1920, pathPictureW600, translateVietnamese } from '../helpers.js';

import icons from 'url:../../imgs/icons.svg';

class DetailView extends View {
  _parentElement = document.getElementById('detail__banner');
  _errorMessage = 'Liên kết có thể bị hỏng hoặc trang này có thể đã bị gỡ.';
  
  // HyperText Markup Language
  _generateMarkup() {
    return /*html*/ `
      <div class='detail-header__bg'>
        <img src=${pathPictureW1920(this._data.backdropPath)} alt='backdrop' loading='lazy' class='movie__backdrop' />
        <div class='header__overlay'></div>
      </div>

      <div class='container'>
        <div class='header__main'>
          <div class='header__bg'>
            <img src=${pathPictureW1920(this._data.backdropPath)} alt='backdrop' loading='lazy' class='movie__backdrop' />
            <div class='header__overlay'></div>
          </div>

          <div class='header__section'>
            <a href='#' class='movie__poster'>
              <img src=${pathPictureW600(this._data.posterPath)} alt='poster' loading='lazy'>
            </a>
            <div class='header__text'>
              <h1 class='movie__title'>${this._data.title}</h1>
              <p class='movie__info'><span>${this._data.genres[0].name}</span> • <span>${this._data.releaseDate.slice(0, 4)}</span> • <span>${calcRuntime(this._data.runtime)}</span></p>
            </div>
          </div>
          
          <div class='header__section'>
            <div class='movie__rate'>
              <p>
                <span>${this._data.voteAverage.toFixed(1)}</span>
                <svg class='rate__icon'>
                  <use href='${icons}#icon-star-fill'></use>
                </svg>
              </p>
              <p>${this._data.voteCount} đánh giá</p>
            </div>
            <div class='vertical__rule'></div>
            <div class='header__certification'>
              <p class='certification'>C 13</p>
              <p>Mức phân loại</p>
            </div>
          </div>

          <div class='header__section'>
            <button class='buy__btn'>Mua: 210.000 đ</button>
            <button class='rent__btn'>Thuê: 80.000 đ</button>
            <button class='wishlist__btn'>
              <svg class='wishlist__icon'>
                <use href='${icons}#icon-bookmark'></use>
              </svg>
              <span>Thêm vào danh sách yêu thích</span>
            </button>
          </div>

          <a href='#' class='trailer__btn'>
            <svg class='play__icon'>
              <use href='${icons}#icon-play'></use>
            </svg>
            <span>Đoạn giới thiệu</span>
          </a>
        </div>
      </div>
    `;
  }
  
  // // <!-- 555 word 5 line -->
  // _generateMarkupMain() {
  //   return /*html*/ `
  //     <div class="container">
  //       <nav class="main__nav">
  //         <div class="nav__active"></div>
  //         <button class="detail-nav__btn" onclick="activeTranX(0)">Chi tiết</button>
  //         <button class="comment-nav__btn" onclick="activeTranX(1)">Nhận xét</button>
  //         <button class="similar-nav__btn" onclick="activeTranX(2)">Liên quan</button>
  //       </nav>

  //       <div class="main__grid">
  //         <article class="movie__detail main__show">
  //           <p class="main__heading">Chi tiết</p>
  //           <section class="main__section">
  //             <h5 class="main__title">Giới thiệu phim</h5>
  //             <p class="movie__description">${this._data.overview}</p>
  //             <button class="see-more__btn">Thêm</button>
  //           </section>
            
  //           <section class="main__section">
  //             <h5 class="main__title">Có trong bộ</h5>
  //             <div class="movie__collection">
  //               <a href="#" class="collection__backdrop">
  //                 <img src=${pathPictureW1920(this._data.belongsToCollection.backdrop_path)} alt="" class="movie__backdrop">
  //               </a>
  //               <div class="collection__text">
  //                 <a href="#" class="collection__title">
  //                   <h6>${this._data.belongsToCollection.name}</h6>
  //                 </a>
  //                 <p class="collection__category">
  //                 ${
  //                   this._data.genres.map(genre => {
  //                     return `<span> ${genre.name} </span>`
  //                   }).join('')
  //                 }
  //                 </p>
  //               </div>
  //             </div>
  //           </section>

  //           <section class="main__section">
  //             <div class="section__title">
  //               <h5 class="main__title">Đoàn làm phim</h5>
  //               <a href="#" class="cast__link">Xem tất cả ></a>
  //             </div>
  //             <h6 class="cast__title">Dàn diễn viên</h6>
  //             <div class="cast__container">
  //               <div class="cast__wrapper">
  //                 <div class="cast__list">
  //                   <div class="cast__item">
  //                     <a href="#" class="cast__avatar">
  //                       <img src="https://www.themoviedb.org/t/p/w138_and_h175_face/jpurJ9jAcLCYjgHHfYF32m3zJYm.jpg" alt="cast" class="cast__poster">
  //                     </a>
  //                     <a href="#" class="cast__name"><h6>Chris Hemsworth Hemsworth</h6></a>
  //                     <p class="cast__character">Thor Odinson</p>
  //                   </div>
                    
  //                   <div class="cast__item">
  //                     <a href="#" class="cast__avatar">
  //                       <img src="https://www.themoviedb.org/t/p/w138_and_h175_face/jpurJ9jAcLCYjgHHfYF32m3zJYm.jpg" alt="cast" class="cast__poster">
  //                     </a>
  //                     <a href="#" class="cast__name"><h6>Chris Hemsworth Hemsworth</h6></a>
  //                     <p class="cast__character">Thor Odinson</p>
  //                   </div>
  //                   <div class="cast__item">
  //                     <a href="#" class="cast__avatar">
  //                       <img src="https://www.themoviedb.org/t/p/w138_and_h175_face/jpurJ9jAcLCYjgHHfYF32m3zJYm.jpg" alt="cast" class="cast__poster">
  //                     </a>
  //                     <a href="#" class="cast__name"><h6>Chris Hemsworth Hemsworth</h6></a>
  //                     <p class="cast__character">Thor Odinson</p>
  //                   </div>
  //                   <div class="cast__item">
  //                     <a href="#" class="cast__avatar">
  //                       <img src="https://www.themoviedb.org/t/p/w138_and_h175_face/jpurJ9jAcLCYjgHHfYF32m3zJYm.jpg" alt="cast" class="cast__poster">
  //                     </a>
  //                     <a href="#" class="cast__name"><h6>Chris Hemsworth Hemsworth</h6></a>
  //                     <p class="cast__character">Thor Odinson</p>
  //                   </div>
  //                   <div class="cast__item">
  //                     <a href="#" class="cast__avatar">
  //                       <img src="https://www.themoviedb.org/t/p/w138_and_h175_face/jpurJ9jAcLCYjgHHfYF32m3zJYm.jpg" alt="cast" class="cast__poster">
  //                     </a>
  //                     <a href="#" class="cast__name"><h6>Chris Hemsworth Hemsworth</h6></a>
  //                     <p class="cast__character">Thor Odinson</p>
  //                   </div>
  //                   <div class="cast__item">
  //                     <a href="#" class="cast__avatar">
  //                       <img src="https://www.themoviedb.org/t/p/w138_and_h175_face/jpurJ9jAcLCYjgHHfYF32m3zJYm.jpg" alt="cast" class="cast__poster">
  //                     </a>
  //                     <a href="#" class="cast__name"><h6>Chris Hemsworth Hemsworth</h6></a>
  //                     <p class="cast__character">Thor Odinson</p>
  //                   </div>
  //                   <div class="cast__item">
  //                     <a href="#" class="cast__avatar">
  //                       <img src="https://www.themoviedb.org/t/p/w138_and_h175_face/jpurJ9jAcLCYjgHHfYF32m3zJYm.jpg" alt="cast" class="cast__poster">
  //                     </a>
  //                     <a href="#" class="cast__name"><h6>Chris Hemsworth Hemsworth</h6></a>
  //                     <p class="cast__character">Thor Odinson</p>
  //                   </div>
  //                   <div class="cast__item">
  //                     <a href="#" class="cast__avatar">
  //                       <img src="https://www.themoviedb.org/t/p/w138_and_h175_face/jpurJ9jAcLCYjgHHfYF32m3zJYm.jpg" alt="cast" class="cast__poster">
  //                     </a>
  //                     <a href="#" class="cast__name"><h6>Chris Hemsworth Hemsworth</h6></a>
  //                     <p class="cast__character">Thor Odinson</p>
  //                   </div>

  //                 </div>
  //               </div>

  //               <button class="cast__btn cast-left__btn">
  //                 <svg class="cast__icon">
  //                   <use href='../../imgs/icons.svg#icon-left-circle'></use>
  //                 </svg>
  //               </button>

  //               <button class="cast__btn cast-right__btn">
  //                 <svg class="cast__icon">
  //                   <use href='../../imgs/icons.svg#icon-right-circle'></use>
  //                 </svg>
  //               </button>

  //             </div>
  //             <h6 class="cast__title">Đạo diễn</h6>
  //             <p>Sam Raimi</p>
  //             <h6 class="cast__title">Kịch bản</h6>
  //             <p>Michael Waldron</p>
  //           </section>

  //           <section class="main__section">
  //             <h5 class="main__title">Thông tin</h5>
  //             <div class="movie__info">
  //               <ul class="info__list">
  //                 <li class="info__item">
  //                   <span>Hãng phim</span>
  //                   <span>${this._data.productionCompanies[0].name}</span>
  //                 </li>
  //                 <li class="info__item">
  //                   <span>Quốc gia</span>
  //                   <span>${this._data.productionCountries[0].name}</span>
  //                 </li>
  //                 <li class="info__item">
  //                   <span>Tiêu đề gốc</span>
  //                   <span>${this._data.originalTitle}</span>
  //                 </li>
  //                 <li class="info__item">
  //                   <span>Thể loại</span>
  //                   <span>${
  //                     this._data.genres.map(genre => {
  //                       return `<span> ${genre.name} </span>`
  //                     }).join('')
  //                   }</span>
  //                 </li>
  //                 <li class="info__item">
  //                   <span>Phát hành</span>
  //                   <span>${this._data.releaseDate}</span>
  //                 </li>
  //                 <li class="info__item">
  //                   <span>Độ dài</span>
  //                   <span>${calcRuntime(this._data.runtime)}</span>
  //                 </li>
  //                 <li class="info__item">
  //                   <span>Trạng thái</span>
  //                   <span>${translateVietnamese(this._data.status)}</span>
  //                 </li>
  //                 <li class="info__item">
  //                   <span>Ngôn ngữ chính</span>
  //                   <span>${translateVietnamese(this._data.originalLanguage)}</span>
  //                 </li>
  //               </ul>
  //             </div>
  //           </section>
  //         </article>
            
  //         <article class="movie__comment">
  //           <p class="main__heading">Nhận xét</p>

  //           <section class="star__section">
  //             <div class="star__header">
  //               <ul class="star__list">
  //                 <li class="star__item">
  //                   <svg class="star__icon">
  //                     <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                   </svg>
  //                 </li>
  //                 <li class="star__item">
  //                   <svg class="star__icon">
  //                     <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                   </svg>
  //                 </li>
  //                 <li class="star__item">
  //                   <svg class="star__icon">
  //                     <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                   </svg>
  //                 </li>
  //                 <li class="star__item">
  //                   <svg class="star__icon">
  //                     <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                   </svg>
  //                 </li>
  //                 <li class="star__item">
  //                   <svg class="star__icon">
  //                     <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                   </svg>
  //                 </li>
  //               </ul>
  //               <h5 class="star__count">5 bài xếp hạng</h5>
  //             </div>

  //             <div class="star__main">
  //               <ul class="star__wrapper">
  //                 <li>
  //                   <ul class="star__list">
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                   </ul>
  //                 </li>
  //                 <li>
  //                   <ul class="star__list">
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                   </ul>
  //                 </li>
  //                 <li>
  //                   <ul class="star__list">
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                   </ul>
  //                 </li>
  //                 <li>
  //                   <ul class="star__list">
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                   </ul>
  //                 </li>
  //                 <li>
  //                   <ul class="star__list">
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                   </ul>
  //                 </li>
  //               </ul>
  //               <div class="line__wrapper">
  //                 <ul class="line__list">
  //                   <li class="line__percent"></li>
  //                   <li class="line__percent"></li>
  //                   <li class="line__percent"></li>
  //                   <li class="line__percent"></li>
  //                   <li class="line__percent"></li>
  //                 </ul>
  //                 <ul class="line-percent__list">
  //                   <li class="line__percent" data-percent="10%"></li>
  //                   <li class="line__percent" data-percent="20%"></li>
  //                   <li class="line__percent" data-percent="10%"></li>
  //                   <li class="line__percent" data-percent="30%"></li>
  //                   <li class="line__percent" data-percent="50%"></li>
  //                 </ul>
  //               </div>
  //             </div>
  //           </section>

  //           <section class="write-comment__section">
  //             <h5 class="main__title">Xếp hạng phim này</h5>
  //             <p>Cho chúng tôi biết suy nghĩ của bạn.</p>
  //             <div class="write__star">
  //               <ul class="star__list">
  //                 <li class="star__item">
  //                   <button class="star__btn">
  //                     <svg class="star__icon">
  //                       <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                     </svg>
  //                   </button>
  //                 </li>
  //                 <li class="star__item">
  //                   <button class="star__btn">
  //                     <svg class="star__icon">
  //                       <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                     </svg>
  //                   </button>
  //                 </li>
  //                 <li class="star__item">
  //                   <button class="star__btn">
  //                     <svg class="star__icon">
  //                       <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                     </svg>
  //                   </button>
  //                 </li>
  //                 <li class="star__item">
  //                   <button class="star__btn">
  //                     <svg class="star__icon">
  //                       <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                     </svg>
  //                   </button>
  //                 </li>
  //                 <li class="star__item">
  //                   <button class="star__btn">
  //                     <svg class="star__icon">
  //                       <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                     </svg>
  //                   </button>
  //                 </li>
  //               </ul>
  //               <button class="comment__btn">Viết nhận xét</button>
  //             </div>
  //           </section>

  //           <section class="comment__section">
  //             <div class="comment__list">
  //               <div class="comment__item">
  //                 <div class="comment__account">
  //                   <div class="acc__avatar">
  //                     <svg class="avatar__icon">
  //                       <use href='../../imgs/icons.svg#icon-user'></use>
  //                     </svg>
  //                     <!-- <img src="" alt=""> -->
  //                   </div>
  //                   <h6 class="acc__name">Darick Nguyễn</h6>
  //                 </div>

  //                 <div class="comment__rate">
  //                   <ul class="star__list">
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                     <li class="star__item">
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                     </li>
  //                   </ul>
  //                   <p class="comment__date">30 tháng 6, 2022</p>
  //                 </div>

  //                 <p class="comment__content">Bác sĩ trang đỉnh quá
  //                 </p>
  //                 <button class="comment-menu__btn">
  //                   <svg class="menu__icon">
  //                     <use href='../../imgs/icons.svg#icon-more-circle-fill'></use>
  //                   </svg>
  //                 </button>
  //               </div>
  //             </div>
  //           </section>

  //           <button class="comment-all__btn">Xem tất cả bài đánh giá ></button>
  //         </article>

  //         <div class="movie__similar">
  //           <p class="main__heading">Liên quan</p>

  //           <section class="main__section">
  //             <div class="section__title">
  //               <h5 class="main__title">Phim tương tự</h5>
  //               <a href="#" class="movie__link">Xem tất cả ></a>
  //             </div>
              
  //             <div class="similar__wrapper">
  //               <div class="similar__list">
  //                 <div class="card__item">
  //                   <a href="#" class="movie__link">
  //                     <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/cjb9NXJvisfh5fmgX9rerxZfFrJ.jpg" alt="movie" loading="lazy" class="movie__poster">
  //                   </a>

  //                   <div class="movie__info">
  //                     <a href="#" class="movie__title">In the Name of the King: A Dungeon Siege Tale</a>
  //                     <p>Phim Gia Đình, Phim Hoạt Hình</p>
  //                     <p class="movie__rate">
  //                       <span>7.0</span>
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                       <span>80.000 đ</span>
  //                     </p>
  //                   </div>
  //                 </div>
                  
  //                 <div class="card__item">
  //                   <a href="#" class="movie__link">
  //                     <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/cjb9NXJvisfh5fmgX9rerxZfFrJ.jpg" alt="movie" loading="lazy" class="movie__poster">
  //                   </a>

  //                   <div class="movie__info">
  //                     <a href="#" class="movie__title">In the Name of the King: A Dungeon Siege Tale</a>
  //                     <p>Phim Gia Đình, Phim Hoạt Hình</p>
  //                     <p class="movie__rate">
  //                       <span>7.0</span>
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                       <span>80.000 đ</span>
  //                     </p>
  //                   </div>
  //                 </div>
                  
  //                 <div class="card__item">
  //                   <a href="#" class="movie__link">
  //                     <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/cjb9NXJvisfh5fmgX9rerxZfFrJ.jpg" alt="movie" loading="lazy" class="movie__poster">
  //                   </a>

  //                   <div class="movie__info">
  //                     <a href="#" class="movie__title">In the Name of the King: A Dungeon Siege Tale</a>
  //                     <p>Phim Gia Đình, Phim Hoạt Hình</p>
  //                     <p class="movie__rate">
  //                       <span>7.0</span>
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                       <span>80.000 đ</span>
  //                     </p>
  //                   </div>
  //                 </div>
                  
  //                 <div class="card__item">
  //                   <a href="#" class="movie__link">
  //                     <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/cjb9NXJvisfh5fmgX9rerxZfFrJ.jpg" alt="movie" loading="lazy" class="movie__poster">
  //                   </a>

  //                   <div class="movie__info">
  //                     <a href="#" class="movie__title">In the Name of the King: A Dungeon Siege Tale</a>
  //                     <p>Phim Gia Đình, Phim Hoạt Hình</p>
  //                     <p class="movie__rate">
  //                       <span>7.0</span>
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                       <span>80.000 đ</span>
  //                     </p>
  //                   </div>
  //                 </div>
                  
  //                 <div class="card__item">
  //                   <a href="#" class="movie__link">
  //                     <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/cjb9NXJvisfh5fmgX9rerxZfFrJ.jpg" alt="movie" loading="lazy" class="movie__poster">
  //                   </a>

  //                   <div class="movie__info">
  //                     <a href="#" class="movie__title">In the Name of the King: A Dungeon Siege Tale</a>
  //                     <p>Phim Gia Đình, Phim Hoạt Hình</p>
  //                     <p class="movie__rate">
  //                       <span>7.0</span>
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                       <span>80.000 đ</span>
  //                     </p>
  //                   </div>
  //                 </div>
                  
  //                 <div class="card__item">
  //                   <a href="#" class="movie__link">
  //                     <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/cjb9NXJvisfh5fmgX9rerxZfFrJ.jpg" alt="movie" loading="lazy" class="movie__poster">
  //                   </a>

  //                   <div class="movie__info">
  //                     <a href="#" class="movie__title">In the Name of the King: A Dungeon Siege Tale</a>
  //                     <p>Phim Gia Đình, Phim Hoạt Hình</p>
  //                     <p class="movie__rate">
  //                       <span>7.0</span>
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                       <span>80.000 đ</span>
  //                     </p>
  //                   </div>
  //                 </div>
                  
  //                 <div class="card__item">
  //                   <a href="#" class="movie__link">
  //                     <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/cjb9NXJvisfh5fmgX9rerxZfFrJ.jpg" alt="movie" loading="lazy" class="movie__poster">
  //                   </a>

  //                   <div class="movie__info">
  //                     <a href="#" class="movie__title">In the Name of the King: A Dungeon Siege Tale</a>
  //                     <p>Phim Gia Đình, Phim Hoạt Hình</p>
  //                     <p class="movie__rate">
  //                       <span>7.0</span>
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                       <span>80.000 đ</span>
  //                     </p>
  //                   </div>
  //                 </div>
                  
  //                 <div class="card__item">
  //                   <a href="#" class="movie__link">
  //                     <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/cjb9NXJvisfh5fmgX9rerxZfFrJ.jpg" alt="movie" loading="lazy" class="movie__poster">
  //                   </a>

  //                   <div class="movie__info">
  //                     <a href="#" class="movie__title">In the Name of the King: A Dungeon Siege Tale</a>
  //                     <p>Phim Gia Đình, Phim Hoạt Hình</p>
  //                     <p class="movie__rate">
  //                       <span>7.0</span>
  //                       <svg class="star__icon">
  //                         <use href='../../imgs/icons.svg#icon-star-fill'></use>
  //                       </svg>
  //                       <span>80.000 đ</span>
  //                     </p>
  //                   </div>
  //                 </div>
                  

  //               </div>
  //             </div>
  //           </section>

  //           <section class="main__section">
  //             <div class="section__title">
  //               <h5 class="main__title">Phim về phép thuật</h5>
  //               <a href="#" class="movie__link">Xem tất cả ></a>
  //             </div>

  //             <div class="similar__list">
  //               <!-- tuong tự -->
  //             </div>
  //           </section>

  //           <section class="main__section">
  //             <h5 class="main__title">Từ khóa</h5>
  //             <ul class="main__keywork">
  //               <li><a href="#" class="keyword__link">magic</a></li>
  //               <li><a href="#" class="keyword__link">superhero</a></li>
  //               <li><a href="#" class="keyword__link">based on comic</a></li>
  //             </ul>
  //           </section>
  //         </div>
  //       </div>
  //     </div>
  //   `;
  // }
};

export default new DetailView();