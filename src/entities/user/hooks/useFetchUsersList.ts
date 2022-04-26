import { useCallback, useEffect, useState } from 'react';
import type { githubApi, UserPreview } from 'shared/api';
import { userModel } from '..';

type UseGetUsersReturnType = {
  data: UserPreview[];
  isLoading: boolean;
  error: string | null;
  refetch: (
    params?: githubApi.users.GetUsersListParams | undefined
  ) => Promise<void>;
  pagination: {
    since: number;
  };
};

export const useFetchUsersList = (
  params?: githubApi.users.GetUsersListParams
): UseGetUsersReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { users, search, setUsers, since, setSince } =
    userModel.useUserContext();

  const fetchUsers = useCallback(
    async (params?: githubApi.users.GetUsersListParams) => {
      try {
        setIsLoading(true);
        const { list, next } = await userModel.getUsersList(params);
        setUsers((prev) => (prev ? [...prev, ...list] : list));
        setSince(+next!.since);
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
    if (!search && !users.length) {
      fetchUsers(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    data: users,
    isLoading,
    error,
    refetch: fetchUsers,
    pagination: {
      since,
    },
  };
};
