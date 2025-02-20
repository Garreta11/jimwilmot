import styles from './Background.module.scss';
const Background = () => {
  return (
    <div className={styles.background}>
      <div
        className={`${styles.background__rect} ${styles.background__rect__topleft}`}
      ></div>
      <div
        className={`${styles.background__rect} ${styles.background__rect__topright}`}
      ></div>
      <div
        className={`${styles.background__rect} ${styles.background__rect__bottomleft}`}
      ></div>
      <div
        className={`${styles.background__rect} ${styles.background__rect__bottomright}`}
      ></div>
    </div>
  );
};

export default Background;
