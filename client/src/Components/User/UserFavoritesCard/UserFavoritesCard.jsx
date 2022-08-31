import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { removeFavorites } from '../../../Redux/actions/actions';
import { useNavigate } from 'react-router-dom';

import './UserFavoritesCard.css';
import axios from 'axios';

function UserFavoritesCard({ id, favoritosId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});

  useEffect(() => {
    async function getProductById() {
      const res = await axios.get(`/products/${id}`);
      setProduct(res.data);
    }
    getProductById();
  }, [dispatch, id]);

  const delFav = (id) => {
    const userId = JSON.parse(window.localStorage.getItem('user')).id;
    dispatch(removeFavorites(userId, favoritosId, id));
  };

  const goDetail = () => {
    navigate(`/detalle/${id}`);
  };

  if (product)
    return (
      <Container>
        <Row className="userFavCard__container">
          <Col lg={3}>
            <img
              src={product?.imgUri}
              alt="foto del producto"
              className="img-fluid userFavImg"
            />
          </Col>
          <Col lg={3}>
            <h4>{product?.name}</h4>
          </Col>
          <Col lg={3}>
            <Button variant="secondary" onClick={goDetail} className="me-2">
              Ver
            </Button>
            <Button variant="secondary" onClick={() => delFav(id)}>
              Quitar
            </Button>
          </Col>
        </Row>
        <hr />
      </Container>
    );
}

export default UserFavoritesCard;
