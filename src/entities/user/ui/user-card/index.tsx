import styles from './styles.module.scss';

import type { User } from 'shared/api';
import { Image } from 'shared/ui';

interface Props extends User {}

export const UserCard = (props: Props) => {
  const { avatarUrl, login, email, createdAt, followers, following, bio } =
    props;
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Image
          src={avatarUrl}
          alt="user profile photo"
          height="15rem"
          width="15rem"
        />
        <div className={styles.meta}>
          <span className={styles.metaField}>
            username: <span className={styles.metaData}>{login}</span>
          </span>
          <span className={styles.metaField}>
            email: <span className={styles.metaData}>{email}</span>
          </span>
          <span className={styles.metaField}>
            join date:{' '}
            <span className={styles.metaData}>
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </span>
          <span className={styles.metaField}>
            <span className={styles.metaData}>{followers}</span> followers
          </span>
          <span className={styles.metaField}>
            following <span className={styles.metaData}>{following}</span>
          </span>
        </div>
      </div>
      <p className={styles.description}>{bio}</p>
    </div>
  );
};
