import { googleSheetNews } from '../shared/config.js';
import { AJAX } from '../shared/helpers.js';

export const state = {
  detailNews: {},
};

export const loadDetails = async function (id) {
  try {
    const data = await AJAX(`${googleSheetNews.API_URL}?id=${id}`);
    
    const newsdetail = data.results[0];

    state.detailNews = {
      author: newsdetail.author,
      countryId: newsdetail.country_id,
      createdAt: newsdetail.created_at,
      description: newsdetail.description,
      id: newsdetail.id,
      imageUrl: newsdetail.image_url,
      nameSource: newsdetail.name_source,
      sourceUrl: newsdetail.source_url,
      title: newsdetail.title,
      content: newsdetail.content,
    } 
  } catch (error) {
    console.log(error,'⚡⚡⚡⚡');
    throw error;
  }
};