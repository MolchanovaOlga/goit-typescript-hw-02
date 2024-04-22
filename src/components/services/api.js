import axios from 'axios';

const idAPI = '3ABtWRVdIJO46ffwj_MMAhTMfBgXLKP31Mw70DmKoiE';

const requestByKeyWord = async (query, pages, perPage) => {
  const objUrlParams = {
    client_id: idAPI,
    page: pages,
    per_page: perPage,
    query,
  };

  axios.defaults.baseURL = 'https://api.unsplash.com/';
  const response = await axios.get('search/photos/', {
    params: { ...objUrlParams, page: pages },
  });

  // objUrlParams.total = response.data.total;
  return response.data;
};

export { requestByKeyWord };
