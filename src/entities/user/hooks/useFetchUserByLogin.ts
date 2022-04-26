import { useState, useCallback, useEffect } from 'react';
import { userModel } from '..';

export const useFetchUserByLogin = (login: string) => {
  const { selectedUser, setSelectedUser } = userModel.useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async (login: string) => {
    try {
      setIsLoading(true);
      const userData = await userModel.getUserByLogin(login);
      setSelectedUser(userData);
    } catch (e) {
      // @ts-ignore
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedUser?.login !== login) {
      fetchUser(login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data: selectedUser,
    isLoading,
    error,
  };
};
