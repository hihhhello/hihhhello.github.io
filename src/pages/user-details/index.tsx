import styles from './styles.module.scss';

import React from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'shared/ui';
import { UserCard, userHooks } from 'entities/user';
import { ReposSearch } from 'features/repos-search';

const UserDetailsPage = () => {
  const { login } = useParams();
  const { data, isLoading } = userHooks.useFetchUserByLogin(login!);

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        {isLoading ? <Loader /> : data ? <UserCard {...data} /> : 'not found'}
      </div>
      <ReposSearch login={login!} nodeId="repos-search-user-details" />
    </div>
  );
};

export default UserDetailsPage;
