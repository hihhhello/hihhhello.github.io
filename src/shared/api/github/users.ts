import type { AxiosPromise } from 'axios';
import { apiInstance } from './base';
import type { UserPreview, User } from './models';

const BASE_URL = '/users';
const BASE_SEARCH_URL = '/search/users';

export type GetUsersListParams = {
  since?: number;
};

export const getUsersList = (
  params?: GetUsersListParams
): AxiosPromise<UserPreview[]> => {
  return apiInstance.get(BASE_URL, {
    params,
  });
};

export type GetSearchUsersListReturnType = {
  items: UserPreview[];
};

export type GetSearchUsersListParams = {
  q: string;
  page: number;
};

export const getSearchUsersList = (
  params: GetSearchUsersListParams
): AxiosPromise<GetSearchUsersListReturnType> => {
  return apiInstance.get(BASE_SEARCH_URL, {
    params: {
      ...params,
    },
  });
};

export const getUserByLogin = (login: string): AxiosPromise<User> => {
  return apiInstance.get(`${BASE_URL}/${login}`);
};
