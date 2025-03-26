import styles from './Gradient.module.scss';

const Gradient = () => {
  return (
    <div className={styles.gradient}>
      <div className={styles.gradient__item}></div>
      <div className={styles.gradient__item_2}></div>
      <div className={styles.gradient__item_3}></div>
    </div>
  );
};

export default Gradient;
