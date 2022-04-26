import { githubApi, parseLinkHeader } from 'shared/api';
import type { PaginatedResponse, Repo } from 'shared/api';

export const getReposList = async (
  username: string,
  params: githubApi.repos.GetReposListParams
): Promise<PaginatedResponse<Repo>> => {
  const { data, headers } = await githubApi.repos.getReposList(
    username,
    params
  );
  let pagination;

  if (headers['link']) {
    pagination = parseLinkHeader(headers);
  }

  return {
    list: data.items,
    ...pagination,
  };
};
