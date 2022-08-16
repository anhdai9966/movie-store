import { googleSheetNews } from '../shared/config.js';
import { AJAX } from '../shared/helpers.js';

export const state = {
  detailNews: {},
};

export const loadDetails = async function (id) {
  try {
    const data = await AJAX(`${googleSheetNews.API_URL}?id=${id}`);
    console.log(data);
    
  } catch (error) {
    console.log(error,'⚡⚡⚡⚡');
    throw error;
  }
};