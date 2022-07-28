import * as requestMovie from './assets/utils/request.js';
import homeScreen from './screens/homeScreen.js';
import { parseRequestUrl } from './utils/utils.js';
import error404Screen from './screens/error404Screen.js';

const routes = {
    '/': homeScreen,
    '/product/:id': productScreen,
};

const router = () => {
    const request = parseRequestUrl();
    const parseUrl =
        (request.resource ? `/${request.resource}` : '/') +
        (request.id ? ':id' : '') +
        (request.action ? `/${request.action}` : '');
    const screen = router[parseUrl] ? router[parseUrl] : error404Screen;

    const main = document.querySelector('#main-container');
    main.innerHTML = screen.render();
};

window.addEventListener('hashchange', router);

const fetchAPI = async () => {
    try {
        const res = await requestMovie('movie/now_playing');
        console.log(res);
        // if (res) {}
    } catch (error) {
        console.log(error);
        return {error: error.message};
    }
};
