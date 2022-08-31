import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.page_404}>
      <div className={styles.four_zero_four_bg}>
        <h1 className={styles.page__404__h1}>404</h1>
      </div>

      <div className={styles.contant_box_404}>
        <h3 className={styles.page__404__h3}>Parece que te perdiste...</h3>
        <p>La pagína solicitada no se encuentra ó no está disponible </p>
        <Button className={styles.btn} as={Link} to="/">
          Volver
        </Button>
      </div>
    </div>
  );
}
