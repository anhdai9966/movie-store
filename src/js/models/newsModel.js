import { AJAX } from '../shared/helpers.js';
import { googleSheetNews } from '../shared/config.js';

export let state = {
  news: [],
  pages: {
    page: 0,
    totalPages: 0,
    totalResults: 0,
  },
  bookmarks: [],
};

// https://script.google.com/macros/s/AKfycbwD1nTQ9mDGu47Fv4BKC45Yqx0bjtoM3tbrubxDFPZ8M15ctnoW8IZB0GPLC3LFkWMe/exec
// các tham số hỗ trợ : id, query, page, list(giới hạn 10 item), tìm theo quốc gia (với VN countryId=1 Quốc tế =2) (giới hạn 10 item)
export const loadNews = async function (pg = '') {
  try {
    const data = await AJAX(`${googleSheetNews.API_URL}?${pg}`);
    
    if(data.status == 'fail') return ;

    state.news = data.results.map(news => {
      return {
        author: news.author,
        countryId: news.country_id,
        createdAt: news.created_at,
        description: news.description,
        id: news.id,
        imageUrl: news.image_url,
        nameSource: news.name_source,
        sourceUrl: news.source_url,
        title: news.title,
      }
    })
    state.pages = {
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
}

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();