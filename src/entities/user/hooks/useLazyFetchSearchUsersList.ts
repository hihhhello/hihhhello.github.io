import { useCallback, useEffect, useRef, useState } from 'react';
import type { githubApi, UserPreview } from 'shared/api';
import { userModel } from '..';
import { useUserContext } from '../model';

type UseGetSearchedUsersReturnType = [
  fetch: (params: githubApi.users.GetSearchUsersListParams) => Promise<void>,
  other: {
    data: UserPreview[];
    fetchNextUsers: (
      params: githubApi.users.GetSearchUsersListParams
    ) => Promise<void>;
    isLoading: boolean;
    error: string | null;
    pagination: {
      page: number;
    };
  }
];

export const useLazyFetchSearchedUsersList =
  (): UseGetSearchedUsersReturnType => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {
      page,
      setPage,
      searchedUsers,
      setSearchedUsers,
      search,
      setIsLast,
      isLast,
    } = useUserContext();

    const isLoaded = useRef<boolean>(false);

    const fetchUsers = useCallback(
      async (params: githubApi.users.GetSearchUsersListParams) => {
        if (isLast) {
          return;
        }
        try {
          setIsLoading(true);
          setError(null);
          const { list, next } = await userModel.getSearchUsersList(params);
          setSearchedUsers(list);
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
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

    const fetchNextUsers = useCallback(
      async (params: githubApi.users.GetSearchUsersListParams) => {
        if (isLast) {
          return;
        }

        try {
          setIsLoading(true);
          setError(null);
          const { list, next } = await userModel.getSearchUsersList(params);
          setSearchedUsers((prev) => (prev ? [...prev, ...list] : list));
          if (next) {
            setPage(+next!.page);
          }
        } catch (e) {
          // @ts-ignore
          setError(e.message);
        } finally {
          setIsLoading(false);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

    useEffect(() => {
      setPage(1);
      setIsLast(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (isLoaded.current) {
        setPage(1);
        setSearchedUsers([]);
      }
      setIsLast(false);
      isLoaded.current = true;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return [
      fetchUsers,
      {
        data: searchedUsers,
        fetchNextUsers,
        isLoading,
        error,
        pagination: {
          page,
        },
      },
    ];
  };
