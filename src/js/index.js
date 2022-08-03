import requestMoviedb from './utils/requestMoviedb.js';
// import homeScreen from './screens/homeScreen.js';
// import { parseRequest } from './utils/utils.js';
// import error404Screen from './screens/error404Screen.js';

const routes = {
  '/': homeScreen,
  '/product/:id': productScreen,
};

export const parseRequest = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split('/');
  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  }
}

const router = () => {
  const request = parseRequest();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? ':id' : '') +
    (request.action ? `/${request.action}` : '');
  const screen = router[parseUrl] ? router[parseUrl] : error404Screen;

  const main = document.querySelector('#main-container');
  main.innerHTML = screen.render();
};

window.addEventListener('hashchange', router);

