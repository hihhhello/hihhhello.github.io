import styles from './styles.module.scss';

import type { Repo } from 'shared/api';

interface Props extends Repo {}

export const RepoRow = ({ forks, name, stargazersCount }: Props) => {
  return (
    <div className={styles.root}>
      <span>{name}</span>
      <div className={styles.meta}>
        <span>{forks} Forks</span>
        <span>{stargazersCount} Stars</span>
      </div>
    </div>
  );
};
