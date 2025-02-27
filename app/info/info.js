import styles from './page.module.scss';
import { PortableText } from '@portabletext/react';

const InfoWrapper = ({ data }) => {
  console.log(data);
  return (
    <div className={styles.page}>
      <div className={styles.page__description}>
        <PortableText value={data.description} />
      </div>

      <div className={styles.page__image}>
        <img src={data.profile} alt='Page builder image' />
      </div>
    </div>
  );
};

export default InfoWrapper;
