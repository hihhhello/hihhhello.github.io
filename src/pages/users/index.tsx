import styles from './styles.module.scss';

import React from 'react';
import { UsersSearch } from 'features/users-search';

const UsersPage = () => {
  return (
    <div className={styles.root}>
      <UsersSearch nodeId="users-page-scroll" />
    </div>
  );
};

export default UsersPage;
