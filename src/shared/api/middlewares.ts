import { AxiosResponse } from 'axios';
import { camelizeKeys } from 'humps';

// Axios middleware to convert all api responses to camelCase
export const camelizeResponse = (response: AxiosResponse) => {
  if (response.data) {
    response.data = camelizeKeys(response.data);
  }
  return response;
};
