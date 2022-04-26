import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Repo } from 'shared/api';

interface IRepoContext {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLast: boolean;
  setIsLast: React.Dispatch<React.SetStateAction<boolean>>;
  repos: Repo[];
  setRepos: React.Dispatch<React.SetStateAction<Repo[]>>;
  login: string;
  setLogin: React.Dispatch<React.SetStateAction<string>>;
}

const initialValues: IRepoContext = {
  search: '',
  setSearch: () => {},
  login: '',
  setLogin: () => {},
  page: 1,
  setPage: () => {},
  isLast: false,
  setIsLast: () => {},
  repos: [],
  setRepos: () => {},
};

const RepoContext = createContext(initialValues);

export const useRepoContext = () => useContext(RepoContext);

export const RepoProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [search, setSearch] = useState('');
  const [login, setLogin] = useState('');
  const [page, setPage] = useState(1);
  const [isLast, setIsLast] = useState(false);
  const [repos, setRepos] = useState<Repo[]>([]);

  const values: IRepoContext = useMemo(
    () => ({
      search,
      setSearch,
      repos,
      setRepos,
      page,
      setPage,
      isLast,
      setIsLast,
      login,
      setLogin,
    }),
    [isLast, login, page, repos, search]
  );

  return <RepoContext.Provider value={values}>{children}</RepoContext.Provider>;
};
