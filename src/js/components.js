export const picItem = {
  render: ({ posterPath, title, idMovie }) => {
    return /*html*/ `
      <div class="pic-item">
        <div class="img">
          <img src="https://image.tmdb.org/t/p/w200/${posterPath}" loading="lazy">
        </div>
        <a href="#id=${idMovie}" class="title text-3lines">${title}</a>
        <a href="#id=${idMovie}" class="pic-btn btn"></a>
      </div>
    `;
  },
};