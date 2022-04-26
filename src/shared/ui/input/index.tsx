import styles from './styles.module.scss';
import React from 'react';
interface Props extends React.HTMLProps<HTMLInputElement> {}

export const Input = React.forwardRef(({ ...rest }: Props, ref: any) => {
  return <input ref={ref} {...rest} className={styles.root} />;
});
