import styles from './styles.module.scss';

export const LoadingPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
