import React from 'react';

import styles from './ErrorNoResult.module.css';

function ErrorNoResults() {
  return (
    <div className={styles.page_404}>
      <div className={styles.four_zero_four_bg}>
        <h1 className={styles.notResult__h3}>Resultado no encontrado</h1>
        <p>
          No encontramos nada que coincida con tu búsqueda, volvé a intentarlo..
        </p>
      </div>
    </div>
  );
}

export default ErrorNoResults;
