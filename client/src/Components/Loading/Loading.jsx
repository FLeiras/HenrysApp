import React from 'react';
import loadingGif from '../../Assets/Images/Loading.gif';

import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.error}>
      <img className={styles.loadingGif} src={loadingGif} alt="" />
    </div>
  );
}
