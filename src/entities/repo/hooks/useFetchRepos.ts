import { useEffect, useRef, useState } from 'react';
import { githubApi } from 'shared/api';
import type { Repo } from 'shared/api';
import { repoModel } from '..';
import { useRepoContext } from '../model';

type UseGetSearchedUsersReturnType = [
  fetch: (
    username: string,
    params: githubApi.repos.GetReposListParams
  ) => Promise<void>,
  other: {
    data: Repo[];
    isLoading: boolean;
    error: string | null;
    fetchNext: (
      username: string,
      params: githubApi.repos.GetReposListParams
    ) => Promise<void>;
    pagination: {
      page: number;
    };
  }
];

export const useFetchRepos = (
  username: string
): UseGetSearchedUsersReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    page,
    setPage,
    repos,
    setRepos,
    search,
    isLast,
    setIsLast,
    login,
    setSearch,
  } = useRepoContext();

  const isLoaded = useRef<boolean>(false);

  const fetchNextRepos = async (
    username: string,
    params: githubApi.repos.GetReposListParams
  ) => {
    if (isLast) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const { list, next } = await repoModel.getReposList(username, params);
      setRepos((prev) => (prev ? [...prev, ...list] : list));
      if (next) {
        setPage(+next!.page);
      } else {
        setIsLast(true);
      }
    } catch (e) {
      // @ts-ignore
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRepos = async (
    username: string,
    params: githubApi.repos.GetReposListParams
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      const { list, next } = await repoModel.getReposList(username, params);
      setRepos(list);
      if (next) {
        setPage(+next!.page);
      } else {
        setIsLast(true);
      }
    } catch (e) {
      // @ts-ignore
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (login === username) {
      return;
    }
    setRepos([]);
    setPage(1);
    setSearch('');
    setIsLast(false);
    fetchRepos(username, { page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoaded.current) {
      console.log('clearing repos and is last');
      setRepos([]);
      setPage(1);
      setIsLast(false);
    }
    isLoaded.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return [
    fetchRepos,
    {
      data: repos,

      isLoading,
      error,
      fetchNext: fetchNextRepos,
      pagination: {
        page,
      },
    },
  ];
};
