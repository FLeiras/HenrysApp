import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import imgAboutUs from '../../Assets/Images/about-img.png';

import './AboutUs.css';

function AboutUs() {
  return (
    <div>
      <Container>
        <Row className="aboutUs__row">
          <Col lg={6} sm={12} className="aboutUs__text">
            <h1>Somos Henry’s</h1>
            <p>
              La pasión por la comida se vive a diario en nuestros locales,
              impulsada por el concepto de FastGood, que destaca lo rápido y
              bueno. La elaboración de productos con altos estándares de
              calidad, la mezcla de ingredientes frescos, caseros y procesos
              artesanales nos permiten brindar a nuestros clientes una
              experiencia única, para que disfruten de las mejores hamburguesas,
              fries, hotdogs, helados, limonadas, cervezas y vinos en un
              ambiente relajado y moderno, con la mejor música y atención
              personalizada.
            </p>
            <p>
              Orgullosos de generar conciencia en nuestro entorno, en Henry´s
              promovemos un impacto favorable en el presente y futuro de las
              personas. Las tiendas, creadas con materiales reciclados y
              reutilizados de obras y desarmaderos; uso y consumo de energía
              eficiente, así como ayudas a entidades humanitarias y animales,
              son ejemplos de acciones que hacemos con el corazón.
            </p>
            <Button as={Link} to="/" className="aboutUs__btn">
              Volver
            </Button>
          </Col>
          <Col lg={6} sm={12}>
            <img
              src={imgAboutUs}
              alt="imagen de un dibujo de una hamburguesa"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutUs;
