/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteCart, postPurchase } from '../../../Redux/actions/actions';

function UserPurchase() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useLocation().search;
  const purchaseId = params.slice(params.indexOf('=') + 1, params.indexOf('&'));
  const { token } = JSON.parse(window.localStorage.getItem('user'));

  function removeLocalStorage() {
    if (window.localStorage.getItem('carrito')) {
      window.localStorage.removeItem('carrito');
      dispatch(deleteCart());
    }

    if (window.localStorage.getItem('cupones')) {
      window.localStorage.removeItem('cupones');
    }
  }

  useEffect(() => {
    if (purchaseId) {
      // dispatch(postPurchase(purchaseId, token));
      // Aca tendria que ir la logica de crear la nota
      removeLocalStorage();
      navigate(`/user/purchaseDetail/${purchaseId}`);
    }
  }, [dispatch, purchaseId, token, navigate]);

  return <div></div>;
}

export default UserPurchase;
