import styles from './styles.module.scss';

import React, { useEffect, useMemo, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Input } from 'shared/ui';
import debounce from 'lodash.debounce';
import { useRepoContext } from 'entities/repo/model';
import { repoHooks, RepoRow } from 'entities/repo';

interface Props {
  nodeId: string;
  login: string;
}

export const ReposSearch = ({ nodeId, login }: Props) => {
  const { search, setSearch, isLast, setLogin } = useRepoContext();

  useEffect(() => {
    setLogin(login);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const [fetchRepos, { data, pagination, isLoading, error, fetchNext }] =
    repoHooks.useFetchRepos(login);

  const fetchSearched = async (searchValue: string) => {
    await fetchRepos(login, {
      page: 1,
      search: searchValue || undefined,
    });
  };

  const fetchNextSearched = async () => {
    await fetchNext(login, {
      page: pagination.page,
      search: search || undefined,
    });
  };

  const onSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    await fetchSearched(searchValue);
  };

  const debouncedSearchChange = useMemo(
    () => debounce(onSearchChange, 600),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = search;
    }
  }, [search]);

  const loader = useMemo(
    () =>
      error ? (
        <h4>{error}</h4>
      ) : isLoading ? (
        'Loading...'
      ) : isLast ? (
        'No more data'
      ) : null,
    [error, isLast, isLoading]
  );

  return (
    <div className={styles.root}>
      <Input
        onChange={debouncedSearchChange}
        className={styles.input}
        ref={inputRef}
      />
      <div id={nodeId} className={styles.scrollable}>
        <InfiniteScroll
          dataLength={data.length}
          next={fetchNextSearched}
          hasMore={true}
          scrollableTarget={nodeId}
          loader={loader}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {data.map((repo) => (
            <a
              href={repo.htmlUrl}
              target="_blank"
              className={styles.link}
              rel="noreferrer"
              key={repo.id}
            >
              <RepoRow {...repo} />
            </a>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};
