import React, { createContext, useContext, useMemo, useState } from 'react';
import type { User, UserPreview } from 'shared/api';

interface IUserContext {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  users: UserPreview[];
  setUsers: React.Dispatch<React.SetStateAction<UserPreview[]>>;
  searchedUsers: UserPreview[];
  setSearchedUsers: React.Dispatch<React.SetStateAction<UserPreview[]>>;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  since: number;
  setSince: React.Dispatch<React.SetStateAction<number>>;
  initialScrollY: number;
  setInitialScrollY: React.Dispatch<React.SetStateAction<number>>;
  isLast: boolean;
  setIsLast: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValues: IUserContext = {
  search: '',
  setSearch: () => {},
  page: 1,
  setPage: () => {},
  users: [],
  setUsers: () => {},
  searchedUsers: [],
  setSearchedUsers: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
  since: 1,
  setSince: () => {},
  initialScrollY: 0,
  setInitialScrollY: () => {},
  isLast: false,
  setIsLast: () => {},
};

const UserContext = createContext(initialValues);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [since, setSince] = useState(0);
  const [users, setUsers] = useState<UserPreview[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<UserPreview[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [initialScrollY, setInitialScrollY] = useState(0);
  const [isLast, setIsLast] = useState(false);

  const values: IUserContext = useMemo(
    () => ({
      search,
      setSearch,
      users,
      setUsers,
      page,
      setPage,
      selectedUser,
      setSelectedUser,
      setSince,
      since,
      searchedUsers,
      setSearchedUsers,
      initialScrollY,
      setInitialScrollY,
      isLast,
      setIsLast,
    }),
    [
      search,
      users,
      page,
      selectedUser,
      since,
      searchedUsers,
      initialScrollY,
      isLast,
    ]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
