import { githubApi, parseLinkHeader } from 'shared/api';
import type { PaginatedResponse, UserPreview, User } from 'shared/api';

export type GetUsersListResponse = PaginatedResponse<UserPreview>;

export const getUsersList = async (
  params?: githubApi.users.GetUsersListParams
): Promise<GetUsersListResponse> => {
  const { data, headers } = await githubApi.users.getUsersList(params);

  const pagination = parseLinkHeader(headers);

  return {
    list: data,
    ...pagination,
  };
};

export const getSearchUsersList = async (
  params: githubApi.users.GetSearchUsersListParams
): Promise<GetUsersListResponse> => {
  const { data, headers } = await githubApi.users.getSearchUsersList(params);
  let pagination;
  if (headers['link']) {
    pagination = parseLinkHeader(headers);
  }

  return {
    list: data.items,
    ...pagination,
  };
};

export const getUserByLogin = async (login: string): Promise<User> => {
  const { data } = await githubApi.users.getUserByLogin(login);
  return data;
};
