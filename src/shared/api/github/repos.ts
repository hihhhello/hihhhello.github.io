import type { AxiosPromise } from 'axios';
import { apiInstance } from './base';
import type { Repo } from './models';

const BASE_URL = (username: string) =>
  `/search/repositories?q=user:${username}`;
const BASE_SEARCH_URL = (username: string, search: string) =>
  `/search/repositories?q=user:${username}+${search}+in:name`;

export type GetReposListParams = {
  page: number;
  search?: string;
};

export const getReposList = (
  username: string,
  params: GetReposListParams
): AxiosPromise<{ items: Repo[] }> => {
  if (Boolean(params.search)) {
    return apiInstance.get(BASE_SEARCH_URL(username, params.search!));
  }
  return apiInstance.get(BASE_URL(username), { params });
};
