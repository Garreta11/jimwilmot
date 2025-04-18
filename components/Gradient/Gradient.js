import styles from './Gradient.module.scss';

const Gradient = () => {
  return (
    <div className={styles.gradient}>
      <svg xmls='http://www.w3.org/2000/svg'>
        <defs>
          <filter id='goo'>
            <feGaussianBlur
              in='SourceGraphic'
              stdDeviation='10'
              result='blur'
            />
            <feColorMatrix
              in='blur'
              mode='matrix'
              values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8'
              result='goo'
            />
            <feBlend in='SourceGraphic' in2='goo' />
          </filter>
        </defs>
      </svg>
      <div className={styles.gradient__container}>
        <div className={styles.gradient__container__item}></div>
        <div className={styles.gradient__container__item_2}></div>
        <div className={styles.gradient__container__item_3}></div>
      </div>
    </div>
  );
};

export default Gradient;
