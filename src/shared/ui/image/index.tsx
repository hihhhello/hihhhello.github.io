import styles from './styled.module.scss';

interface Props {
  width?: string;
  height?: string;
  alt?: string;
  src: string;
}

export const Image = ({ width, height, alt, ...rest }: Props) => {
  return (
    <div style={{ height, width }}>
      <img {...rest} className={styles.image} alt={alt} />
    </div>
  );
};
