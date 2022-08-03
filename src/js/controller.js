const renderPending = parentEl => {
  const markup = /*html*/ `
    <div class="pic-item">
      <div class="img">
        <div class="pending-bg"></div>
      </div>
    </div>
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const id = window.location.hash.slice(1);
console.log('🚀 ~ id', id);

// 1) loading

// 2) rendering

['hashchange', 'load'].forEach(ev => window.addEventListener(ev => showMovie));
// window.addEventListener('hashchange', showMovie);
// window.addEventListener('load', showMovie);
