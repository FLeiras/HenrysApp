/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { addFavorites, removeFavorites } from '../../Redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, CartPlus, HeartFill } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './CardProductMenu.css';
import { setImgProductHomeErr } from '../methods';

function CardProductMenu({ id, name, price, imgUri, addToCart }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSession = useSelector((state) => state.loginState);
  const favorites = useSelector((state) => state.favorites);

  const ClickFav = (id) => {
    if (!isSession) {
      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        confirmButtonText: 'Iniciar sesión',
        title: 'Opss...',
        text: 'Primero debes iniciar sesión!',
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301854/error-henrys_zoxhtl.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      }).then(function () {
        navigate('/userlogin');
      });
      // alert('es necesario estar logueado');
    } else if (favorites.includes(id)) {
      const userId = JSON.parse(window.localStorage.getItem('user')).id;
      dispatch(removeFavorites(userId, favorites, id));
    } else {
      const userId = JSON.parse(window.localStorage.getItem('user')).id;
      dispatch(addFavorites(userId, favorites, id));
    }
  };

  return (
    <Card className="card__menu" style={{ width: '18rem' }}>
      <Button
        variant="outline"
        onClick={() => ClickFav(id)}
        className="cardMenu__favorite__link"
      >
        {!favorites.includes(id) ? (
          <Heart className="cardMenu__favorite__Svg " />
        ) : (
          <HeartFill className="cardMenu__favorite__Svg " />
        )}
      </Button>
      <Card.Img
        variant="top"
        src={imgUri ? imgUri : ''}
        onError={setImgProductHomeErr}
        className="card__img__menu"
      />
      <Card.Body className="card__menu__body">
        <Card.Title>
          <p>{name}</p>
        </Card.Title>
        <Link className="footer__mail__link" to={`/detalle/${id}`}>
          <p>Ver Más</p>
        </Link>
        <div className="card__cart__container">
          <span>${price}</span>
          <Button onClick={() => addToCart(id)} className="card__menu__cart">
            <CartPlus />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardProductMenu;
