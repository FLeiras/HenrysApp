import React from 'react';
import ProductCardAdmin from '../ProductCardAdmin/ProductCardAdmin';

import './ProductCardAdminContainer.css';
function ProductsCardAdminContainer({ currentProduct, isDeleted }) {
  return (
    <div className="productAdminCards__container">
      {currentProduct &&
        currentProduct.map((item) => (
          <ProductCardAdmin data={item} key={item.id} isDeleted={isDeleted} />
        ))}
    </div>
  );
}

export default ProductsCardAdminContainer;
