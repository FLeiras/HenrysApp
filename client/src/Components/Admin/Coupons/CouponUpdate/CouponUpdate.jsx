/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  getProduct,
  updateCoupons,
  getCoupons,
} from '../../../../Redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import CardCupponHome from '../../../CardCuponHome/CardCuponHome';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/esm/Form';
import { postImageToCloudinary } from '../../../methods';
import Button from 'react-bootstrap/Button';

import './CouponUpdate.css';

function CouponUpdate({ couponToEdit, setIsEditing }) {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state);
  const [btnSubmit, setBtnSubmit] = useState(false);
  const [coupon, setCoupon] = useState(couponToEdit);
  const [isChange, setIsChange] = useState(false);
  const token = JSON.parse(window.localStorage.getItem('user')).token;

  useEffect(() => {
    if (products.length < 1) {
      dispatch(getProduct());
    } else {
      let productsCoupon = coupon.productsId.map((pId) =>
        products.find((p) => p.id === pId)
      );
      setCoupon({
        ...coupon,
        productsId: productsCoupon,
      });
    }
  }, [dispatch, products]);

  const [couponError, setCouponError] = useState({
    code: false,
    title: false,
    expirationDate: false,
    imgUri: false,
    discountPorcentage: false,
    products: false,
  });

  function validateCode(e) {
    const { value } = e.target;
    setIsChange(true);
    setCoupon({ ...coupon, code: value.toUpperCase() });

    if (value.trim() === '') {
      setCouponError({ ...couponError, code: true });
    }

    if (value.trim().length > 9 || value.trim().length < 1) {
      return setCouponError({ ...couponError, code: true });
    }

    setCouponError({ ...couponError, code: false });
  }

  function validateTitle(e) {
    const value = e.target.value;
    setIsChange(true);
    setCoupon({ ...coupon, title: value });

    if (value.trim() === '') {
      return setCouponError({ ...couponError, title: true });
    }

    if (value.trim().length > 25) {
      return setCouponError({ ...couponError, title: true });
    }

    setCouponError({ ...couponError, title: false });
  }

  function validateDiscount(e) {
    const value = e.target.value;
    setIsChange(true);
    setCoupon({ ...coupon, discountPorcentage: value });

    if (value.trim() === '') {
      return setCouponError({ ...couponError, discountPorcentage: true });
    }

    if (isNaN(value) || value < 0 || value > 100 || value.length > 5) {
      return setCouponError({ ...couponError, discountPorcentage: true });
    }

    setCouponError({ ...couponError, discountPorcentage: false });
  }

  function validateExpirationDate(e) {
    const value = e.target.value.trim();
    setCoupon({ ...coupon, expirationDate: value });
    setIsChange(true);

    if (value === '' || value.length !== 10) {
      return setCouponError({ ...couponError, expirationDate: true });
    }

    const [year, month, day] = value.split('-', 3);
    const expDate = new Date(value);

    if (!year || !month || !day || !expDate) {
      setCouponError({ ...couponError, expirationDate: true });
    }

    // Descomentar para validar la fecha.

    // const today = new Date();
    // const dd = String(today.getDate()).padStart(2, '0');
    // const mm = String(today.getMonth() + 1).padStart(2, '0');
    // const yyyy = today.getFullYear();

    // const todayDate = new Date(`${yyyy}-${mm}-${dd}`);

    // if (todayDate.getTime() > expDate.getTime()) {
    //   return setCouponError({ ...couponError, expirationDate: true });
    // }

    setCouponError({ ...couponError, expirationDate: false });
  }

  // Validacion del boton
  useEffect(() => {
    const {
      code,
      title,
      expirationDate,
      imgUri,
      discountPorcentage,
      products,
    } = couponError;
    if (
      code ||
      title ||
      expirationDate ||
      imgUri ||
      discountPorcentage ||
      products
    ) {
      return setBtnSubmit(false);
    }
    return setBtnSubmit(true);
  }, [couponError]);

  function handleProducts(e) {
    const { value } = e.target;
    const product = products?.find((p) => p.name === value);
    e.target.value = '';

    if (value === '') {
      return null;
    }

    setIsChange(true);
    if (!coupon.productsId?.find((d) => d.name === value)) {
      if (typeof product?.name === 'string') {
        setCouponError({ ...couponError, products: false });
        return setCoupon({
          ...coupon,
          productsId: coupon.productsId?.concat(product),
        });
      }
    } else {
      return null;
    }
  }

  const handleRemoveProduct = (e, productId) => {
    setIsChange(true);
    e.preventDefault();

    setCoupon({
      ...coupon,
      productsId: coupon.productsId?.filter((d) => d.id !== productId),
    });
  };

  useEffect(() => {
    if (coupon.productsId?.length < 1) {
      return setCouponError({ ...couponError, products: true });
    } else {
      return setCouponError({ ...couponError, products: false });
    }
  }, [coupon]);

  function handleUpdateCoupon(e) {
    e.preventDefault();
    if (btnSubmit) {
      let ids = [];
      coupon.productsId.forEach((e) => {
        ids.push(e.id);
      });
      dispatch(
        updateCoupons({
          id: coupon.id,
          code: coupon.code,
          title: coupon.title,
          expirationDate: coupon.expirationDate,
          imgUri: coupon.imgUri,
          discountPorcentage: coupon.discountPorcentage,
          productsId: ids,
        })
      ).then((res) => {
        if (res.status === 201) {
          dispatch(getCoupons());
          setIsEditing(false);
          Swal.fire({
            customClass: {
              confirmButton: 'confirmBtnSwal',
            },
            title: `${coupon.title}`,
            text: 'Actualizada con exito',
            imageUrl:
              'https://res.cloudinary.com/henrysburgers/image/upload/v1659288361/logo-henrys-20x20_ftnamq.png',
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'Logo henrys',
          });
        } else {
          Swal.fire({
            customClass: {
              confirmButton: 'confirmBtnSwal',
            },
            title: `${coupon.title}`,
            text: 'Error al actualizar',
            imageUrl:
              'https://res.cloudinary.com/henrysburgers/image/upload/v1659288361/logo-henrys-20x20_ftnamq.png',
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'Logo henrys',
          });
        }
      });
    }
  }

  async function setImg(e) {
    const result = await postImageToCloudinary(e);

    if (result) {
      setCoupon({ ...coupon, imgUri: result });
    } else {
      e.target.value = '';
    }
    setIsChange(true);
  }

  return (
    <div>
      <div className="couponUpdate__container">
        <form className="couponForm">
          <label htmlFor="code">
            <div className="codeLabel">
              Codigo: <span>*</span>
            </div>
            <input
              className="couponUpdate__form__inputs"
              value={coupon.code}
              type="text"
              autoComplete="off"
              id="code"
              onChange={validateCode}
            />
            <small className={couponError.code ? 'statusWrong' : 'statusOk'}>
              No puede estar vacio
            </small>
          </label>

          <label htmlFor="title">
            <div className="titleLabel">
              Titulo: <span>*</span>
            </div>
            <input
              className="couponUpdate__form__inputs"
              value={coupon.title}
              type="text"
              autoComplete="off"
              id="title"
              onChange={validateTitle}
            />
            <small className={couponError.title ? 'statusWrong' : 'statusOk'}>
              No puede estar vacio
            </small>
          </label>

          <label htmlFor="discount">
            <div className="discountLabel">
              Descuento: <span>*</span>
            </div>
            <input
              className="couponUpdate__form__inputs"
              value={coupon.discountPorcentage}
              type="text"
              autoComplete="off"
              id="discount"
              onChange={validateDiscount}
            />
            <small
              className={
                couponError.discountPorcentage ? 'statusWrong' : 'statusOk'
              }
            >
              Ingrese un numero entre 0 y 100.
            </small>
          </label>

          <label htmlFor="expirationDate">
            <div className="expirationDateLabel">
              Fecha de vencimiento &#40; inclusive: &#41; <span>*</span>
            </div>
            <input
              className="couponUpdate__form__inputs"
              value={coupon.expirationDate}
              type="text"
              autoComplete="off"
              id="expirationDate"
              onChange={validateExpirationDate}
              placeholder="aaaa-mm-dd"
            />
            <small
              className={
                couponError.expirationDate ? 'statusWrong' : 'statusOk'
              }
            >
              Selecciona una fecha desde hoy en adelante.
            </small>
          </label>
          <label htmlFor="productOfCoupon">
            <div className="productOfCouponLabel">
              Seleccione los productos aplicados al descuento: &#41;{' '}
              <span>*</span>
            </div>
            <select
              className="couponUpdate__form__select"
              name="productOfCoupon"
              id="productOfCoupon"
              onClick={handleProducts}
            >
              <option value="" />
              {products?.map((p) => (
                <option value={p.name} key={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <div className="couponUpdate__form__producstContainer">
              {coupon.productsId[0]?.id &&
                coupon.productsId?.map((p) => (
                  <div
                    key={`${p?.id}coupon`}
                    className="couponUpdate__form__producstContainer__itemsContainer"
                  >
                    <Button
                      variant="secondary"
                      type="button"
                      className="couponUpdate__form__producstContainer__closeButton"
                      onClick={(e) => handleRemoveProduct(e, p?.id)}
                    >
                      &#10008;
                    </Button>
                    <p>{p?.name}</p>
                  </div>
                ))}
            </div>
          </label>
          <Row>
            <Form.Group className="mb-3" controlId="uploadImgBurger">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                placeholder="Url de la imagen"
                onChange={setImg}
                type="file"
                name="imgUri"
              ></Form.Control>
            </Form.Group>
          </Row>
        </form>
        <Button
          disabled={!isChange || !btnSubmit}
          onClick={handleUpdateCoupon}
          className="couponUpdate__submitButton"
        >
          ACTUALIZAR
        </Button>
      </div>
      <div className="couponUpdate__CardCupponHome">
        <CardCupponHome
          key={coupon.code}
          code={coupon.code}
          title={coupon.title}
          expirationDate={coupon.expirationDate}
          imgUri={coupon.imgUri}
          discountPorcentage={coupon.discountPorcentage}
        />
      </div>
    </div>
  );
}

export default CouponUpdate;
