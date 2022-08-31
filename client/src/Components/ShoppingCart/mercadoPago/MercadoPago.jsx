import { React, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import imgMp from '../../../Assets/Images/combos/cajita-nuggetshamb-con-queso.png';
import { Navigate } from 'react-router-dom';

import './mercadoPago.css';


function MercadoPago() {
  const id = JSON.parse(window.localStorage.getItem("compra"))?.id;

  useEffect(() => {
      montarButtonMP(id);
  }, [id]);

  const montarButtonMP = (id) => {
    if(!id){
        return;
    }
    const formChilds = document.getElementById('MP').childNodes;
    if (id && formChilds.length === 0) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
        'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
      script.setAttribute('data-preference-id', id);
      const form = document.getElementById('MP');
      form.appendChild(script);
    }
  };

  if(!id){
    return <Navigate to="/" ></Navigate>
  }

  return (
    <Container>
      <div className="mercadoPago__container">
        <div className="mercadoPago__pay">
          <h1 className="mecadoPago__tittle">
            Estás a un paso de disfrutar tu
            <span className="mercadoPago__span">Henry&apos;s Burger</span>
          </h1>
          <hr />
          <p className="mercadoPago__text">
            Pulsa el siguiente botón para continuar
          </p>
          <form id="MP" method="GET" />
        </div>
        <div className="mercadoPago__img">
          <img
            src={imgMp}
            alt="Foto de dos hamburugesas y un balde de papas"
            className="img-fluid"
          />
        </div>
      </div>
    </Container>
  );
}

export default MercadoPago;
