import axios from 'axios';
import { GITHUB_API_URL } from 'shared/config';
import { camelizeResponse } from '../middlewares';

export const apiInstance = axios.create({
  baseURL: GITHUB_API_URL,
});

apiInstance.interceptors.response.use(camelizeResponse);
