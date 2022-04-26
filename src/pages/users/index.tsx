import styles from './styles.module.scss';

import React, { useCallback } from 'react';
import { userHooks } from 'entities/user';
import { UsersSearch } from 'features/users-search';

const UsersPage = () => {
  const { data, pagination, refetch, isLoading } =
    userHooks.useFetchUsersList();

  const fetchNextUsers = useCallback(async () => {
    await refetch({ since: pagination.since });
  }, [pagination.since, refetch]);

  return (
    <div className={styles.root}>
      <UsersSearch
        nodeId="users-page-scroll"
        fetchUsers={fetchNextUsers}
        list={data}
        isLoading={isLoading}
      />
    </div>
  );
};

export default UsersPage;
