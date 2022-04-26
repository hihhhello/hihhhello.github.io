import styles from './styles.module.scss';

import type { UserPreview } from 'shared/api';
import { Image } from 'shared/ui';

interface Props extends Omit<React.HTMLProps<HTMLDivElement>, 'data'> {
  data: UserPreview;
}

export const UserRow = ({ data }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <Image src={data.avatarUrl} width="7.5rem" height="7.5rem" />
      </div>
      <span className={styles.username}>{data.login}</span>
    </div>
  );
};
