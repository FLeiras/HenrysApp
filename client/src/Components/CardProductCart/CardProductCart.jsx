import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './CardProductCart.css';

function CardProductCart({ name, price, imgUri, cantidad }) {
  return (
    <Container>
      <Row className="cardProductCart__Container py-2 mb-3">
        <Col lg={4} sx={4}>
          <img
            src={imgUri}
            alt="foto del producto"
            className="CardProductCart__img img-fluid"
          />
        </Col>
        <Col lg={4} sx={4}>
          <h3>{name}</h3>
          <p>Cantidad: {' ' + cantidad}</p>
        </Col>
        <Col lg={4} sx={4}>
          <span>Precio Unitario:</span>
          <p className="cardProductCart__price">${price}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default CardProductCart;
