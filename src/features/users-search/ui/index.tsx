import styles from './styles.module.scss';

import React, { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UserPreview } from 'shared/api';
import { userModel, UserRow } from 'entities/user';
import { Input } from 'shared/ui';
import { userHooks } from 'entities/user';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

interface Props {
  nodeId: string;
  list: UserPreview[];
  isLoading: boolean;
  fetchUsers: () => Promise<void>;
}

export const UsersSearch = ({ list, nodeId, fetchUsers, isLoading }: Props) => {
  const { search, setSearch } = userModel.useUserContext();

  const [
    getSearchUsers,
    {
      data: searchedUsers,
      pagination,
      error,
      isLoading: isSearchedLoading,
      fetchNextUsers,
    },
  ] = userHooks.useLazyFetchSearchedUsersList();

  const fetchSearched = async (searchValue?: string) => {
    await getSearchUsers({
      q: searchValue || search,
      page: pagination?.page || 1,
    });
  };
  const fetchNextSearched = async () => {
    await fetchNextUsers({
      q: search,
      page: pagination?.page,
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

  const mappedList = search ? searchedUsers : list;

  const loader = useMemo(
    () =>
      error ? (
        <h4>{error}</h4>
      ) : isLoading || isSearchedLoading ? (
        'Loading...'
      ) : (
        'No data'
      ),
    [error, isLoading, isSearchedLoading]
  );

  return (
    <div>
      <Input
        onChange={debouncedSearchChange}
        className={styles.input}
        defaultValue={search}
      />
      <div id={nodeId} className={styles.scrollable}>
        <InfiniteScroll
          dataLength={search ? searchedUsers.length : list.length}
          next={search ? fetchNextSearched : fetchUsers}
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
