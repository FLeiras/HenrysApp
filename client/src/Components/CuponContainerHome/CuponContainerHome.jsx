import React, { useEffect } from 'react';
import CardCupponHome from '../CardCuponHome/CardCuponHome';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons } from '../../Redux/actions/actions';

import './CuponContainerHome.css';

function CuponContainerHome() {
  const { coupons } = useSelector((state) => state);
  const dispatch = useDispatch();
  const currentDate = getCurrentDate();

  useEffect(() => {
    if (!coupons) {
      dispatch(getCoupons());
    }
  }, [coupons, dispatch]);

  function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    return new Date(`${yyyy}-${mm}-${dd}`);
  }

  function isExpired(currentDate, expirationDate) {
    const expDate = new Date(expirationDate);
    return currentDate > expDate;
  }

  return (
    <div className="cuponsHome__mainContainer pt-5">
      <h2 className="p-3">Aprovechá las promos que Henry´s tiene para vos</h2>
      <div className="couponsHome pb-5 mt-4">
        {coupons &&
          coupons.length > 0 &&
          coupons?.map((c, i) => (
            <div key={c.code}>
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
            </div>
          ))}
      </div>
    </div>
  );
}

export default CuponContainerHome;
