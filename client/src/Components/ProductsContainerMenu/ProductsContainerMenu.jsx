import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartProduct, getFavorites } from '../../Redux/actions/actions';
import CardProductMenu from '../CardProductMenu/CardProductMenu';
import Container from 'react-bootstrap/Container';
import './ProductsContainerMenu.css';
import Swal from 'sweetalert2';

function ProductsContainerMenu({ currentProduct }) {
  const dispatch = useDispatch();
  let itemsToCart = useSelector((state) => state.cart);
  const [mount, setMount] = useState(true);

  const isSession = useSelector((state) => state.loginState);

  useEffect(() => {
    if (!mount) {
      if (itemsToCart && itemsToCart.length) {
        window.localStorage.setItem('carrito', JSON.stringify(itemsToCart));
      } else {
        window.localStorage.removeItem('carrito');
      }
    } else {
      setMount(false);
    }
  }, [dispatch, itemsToCart, mount]);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (isSession && user) {
      dispatch(getFavorites(user.id));
    }
  }, [dispatch, isSession]);

  const addToCart = (id) => {
    dispatch(addCartProduct(id));
    Swal.fire({
      position: 'top-end',
      imageUrl:
        'https://res.cloudinary.com/henrysburgers/image/upload/v1659301858/success-henrys_nlrgo0.png',
      imageWidth: 80,
      imageHeight: 80,
      text: 'Producto agregado exitosamente',
      showConfirmButton: false,
      timer: 800,
      width: '12rem',
      height: '5rem',
      padding: '0.5rem',
    });
  };

  return (
    <div>
      <Container className="products__container__menu mt-3">
        {currentProduct.map((item) => (
          <CardProductMenu
            id={item.id}
            name={item.name}
            price={item.price}
            imgUri={item.imgUri}
            key={item.name}
            addToCart={addToCart}
          />
        ))}
      </Container>
    </div>
  );
}

export default ProductsContainerMenu;
