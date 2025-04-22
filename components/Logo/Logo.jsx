import React from 'react';
import styles from './Logo.module.scss'

const Logo = () => {
  return (
    <div>
      <img className={styles.logo} src='/logo.svg' alt='My Logo' />
    </div>
  );
};

export default Logo;
