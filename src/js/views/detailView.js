import inheritView from './inheritView.js';
// import icons from 'url:../../imgs/icons.svg';

class DetailView extends inheritView {
  _movieMainEl = document.getElementById('detail__main');

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  // HyperText Markup Language
  _generateMarkup() {
    return /*html*/`
    
    `
  }
}

export default new DetailView();