/* eslint-disable dot-notation */
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearState, getProductById } from '../../../../Redux/actions/actions';
import NotFound from '../../../NotFound/NotFound';
import Loading from '../../../Loading/Loading';
import CreateOrEditBeverage from '../AddProductViews/CreateOrEditBeverage/CreateOrEditBeverage';
import CreateOrEditBurger from '../AddProductViews/CreateOrEditBurger/CreateOrEditBurger';
import CreateOrEditBurgerBase from '../AddProductViews/CreateOrEditBurgerBase/CreateOrEditBurgerBase';
import CreateOrEditCombo from '../AddProductViews/CreateOrEditCombo/CreateOrEditCombo';
import CreateOrEditFries from '../AddProductViews/CreateOrEditFries/CreateOrEditFries';
import CreateOrEditIngredients from '../AddProductViews/CreateOrEditIngredients/CreateOrEditIngredients';

function EditProducts() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.productDetail);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getProductById(id, setLoading));
    return () => {
      dispatch(clearState());
    };
  }, [dispatch, id]);

  if (loading) {
    return <Loading />;
  }

  if (!product.type || product.deletedAt) {
    return <NotFound />;
  }

  return (
    <div>
      {product.type === 'burgers' && <CreateOrEditBurger data={product} />}
      {product.type === 'fries' && <CreateOrEditFries data={product} />}
      {product.type === 'beverages' && <CreateOrEditBeverage data={product} />}
      {product.type === 'combos' && <CreateOrEditCombo data={product} />}
      {product.type === 'burgerBase' && <CreateOrEditBurgerBase data={product} />}
      {product.type === 'ingredients' && <CreateOrEditIngredients data={product} />}
    </div>
  );
}

export default EditProducts;
