import React, { useEffect, useState } from 'react';
import './CouponAdmin.css';
import CuponContainerHome from '../../../CuponContainerHome/CuponContainerHome';
import CouponUpdate from '../CouponUpdate/CouponUpdate';
import CardCupponHome from '../../../CardCuponHome/CardCuponHome';
import { getCoupons, getProduct } from '../../../../Redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { PencilSquare } from 'react-bootstrap-icons';

function CouponAdmin() {
  const dispatch = useDispatch();
  const { coupons } = useSelector((state) => state);
  const [isEditing, setIsEditing] = useState(false);
  const { products } = useSelector((state) => state);
  const [couponToEdit, setCouponToEdit] = useState({});

  useEffect(() => {
    if (!coupons) {
      dispatch(getCoupons());
    }
  }, [coupons, dispatch]);

  useEffect(() => {
    if (products.length < 1) {
      dispatch(getProduct());
    }
  }, [dispatch, products]);

  function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    return new Date(`${yyyy}-${mm}-${dd}`);
  }

  const currentDate = getCurrentDate();

  function isExpired(currentDate, expirationDate) {
    const expDate = new Date(expirationDate);
    return currentDate > expDate;
  }

  function editCoupon(coupon) {
    setIsEditing(true);
    setCouponToEdit(coupon);
    // setCouponToEdit({
    //   ...coupon,
    //   productsId: coupon.productsId.map((p) =>
    //     products.find((product) => product.id === p)
    //   ),
    // });
  }

  // const editCoupon = (id) => {
  //   console.log(id);
  // };

  return (
    <div className="couponAdmin_Container">
      <h2 className="couponAdmin__MainTitle">Gestioná tus cupones</h2>
      <hr />
      {coupons &&
        coupons.length > 0 &&
        coupons?.map((c, i) => (
          <div key={c.code} className="couponAdmin__CardCupponHome">
            {
              <CardCupponHome
                code={c.code}
                title={c.title}
                expirationDate={c.expirationDate}
                imgUri={c.imgUri}
                discountPorcentage={c.discountPorcentage}
                expired={isExpired(currentDate, c.expirationDate)}
              />
            }
            <Button
              className="couponAdmin__editButton"
              variant="secondary"
              onClick={() => editCoupon(c)}
            >
              <PencilSquare />
            </Button>
          </div>
        ))}
      {/* Este div solo se debe mostrar cuando editar = true */}
      {isEditing && (
        <div>
          <CouponUpdate
            setIsEditing={setIsEditing}
            key={couponToEdit.code}
            couponToEdit={couponToEdit}
          />
        </div>
      )}
    </div>
  );
}

export default CouponAdmin;
