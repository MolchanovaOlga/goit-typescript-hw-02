import axios, { AxiosResponse } from 'axios';

import { ResponseData } from '../../types';

const idAPI = '3ABtWRVdIJO46ffwj_MMAhTMfBgXLKP31Mw70DmKoiE';

type RequestByKeyWord = {
  client_id: string;
  page: number;
  per_page: number;
  query: string;
};

const requestByKeyWord = async (
  query: string,
  pages: number,
  perPage: number
): Promise<ResponseData> => {
  const objUrlParams: RequestByKeyWord = {
    client_id: idAPI,
    page: pages,
    per_page: perPage,
    query,
  };

  axios.defaults.baseURL = 'https://api.unsplash.com/';
  const response: AxiosResponse<ResponseData> = await axios.get(
    'search/photos/',
    {
      params: { ...objUrlParams, page: pages },
    }
  );

  return response.data;
};

export { requestByKeyWord };
