import styles from './styles.module.scss';

import React, { useCallback, useMemo, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { userModel, UserRow } from 'entities/user';
import { Input, Loader } from 'shared/ui';
import { userHooks } from 'entities/user';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

interface Props {
  nodeId: string;
}

export const UsersSearch = ({ nodeId }: Props) => {
  const {
    data: users,
    pagination,
    error,
    refetch,
    isLoading,
  } = userHooks.useFetchUsersList();

  const fetchNextUsers = useCallback(async () => {
    await refetch({ since: pagination.since });
  }, [pagination.since, refetch]);

  const { search, setSearch } = userModel.useUserContext();

  const scrollRef = useRef<HTMLDivElement>(null);

  const [
    getSearchUsers,
    {
      data: searchedUsers,
      pagination: searchedPagination,
      error: searchedError,
      isLoading: isSearchedLoading,
      fetchNextUsers: fetchNextSearchedUsers,
    },
  ] = userHooks.useLazyFetchSearchedUsersList();

  const fetchSearched = async (searchValue: string) => {
    // preventing infinity-scroll-component from fetching twice when it was scrolled from top
    if (scrollRef.current?.scrollTop === 0) {
      await getSearchUsers({
        q: searchValue || search,
        page: searchedPagination?.page || 1,
      });
    }
  };

  const fetchNextSearched = async () => {
    await fetchNextSearchedUsers({
      q: search,
      page: searchedPagination?.page,
    });
  };

  const onSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    if (searchValue) {
      await fetchSearched(searchValue);
    }
  };

  const debouncedSearchChange = useMemo(
    () => debounce(onSearchChange, 800),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const mappedList = search ? searchedUsers : users;

  const loader = useMemo(
    () =>
      searchedError || error ? (
        <h4>{searchedError || error}</h4>
      ) : isLoading || isSearchedLoading ? (
        <Loader />
      ) : (
        'No data'
      ),
    [searchedError, error, isLoading, isSearchedLoading]
  );

  return (
    <div>
      <Input
        onChange={debouncedSearchChange}
        className={styles.input}
        defaultValue={search}
      />
      <div ref={scrollRef} id={nodeId} className={styles.scrollable}>
        <InfiniteScroll
          dataLength={search ? searchedUsers.length : users.length}
          next={search ? fetchNextSearched : fetchNextUsers}
          hasMore={true}
          scrollableTarget={nodeId}
          loader={loader}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {mappedList.map((user) => (
            <Link key={user.login} to={user.login} className={styles.link}>
              <UserRow data={user} />
            </Link>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};
