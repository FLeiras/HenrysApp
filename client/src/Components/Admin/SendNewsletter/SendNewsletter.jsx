/* eslint-disable no-useless-computed-key */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Swal from 'sweetalert2';

import './SendNewsletter.css';

function SendNewsletter() {
  const [input, setInput] = useState({
    title: 'Tenemos novedades para vos!',
    description: '',
    btnTxt: 'VER MÁS',
  });

  const [isSubmited, setSubmited] = useState(false);

  function handleOnChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      setSubmited(true);
      await axios.post(
        '/newsletter/send',
        { ...input },
        {
          headers: {
            'auth-token': JSON.parse(window.localStorage.getItem('user')).token,
          },
        }
      );

      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: 'Newsletter',
        text: 'Novedades enviadas correctamente!',
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301858/success-henrys_nlrgo0.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });

      setInput({
        title: 'Tenemos novedades para vos!',
        description: '',
        btnTxt: 'VER MÁS',
      });
    } catch (error) {
      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: 'Opss...',
        text: error.response.data.error,
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301854/error-henrys_zoxhtl.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
    } finally {
      setSubmited(false);
    }
  }

  return (
    <div className="sendNewsletter__container mt-3">
      <h2 className="mb-3">Compartí las novedades</h2>
      <Container className="sendNewsletter__form">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título*</Form.Label>
            <Form.Control
              name="title"
              onChange={handleOnChange}
              value={input.title}
              type="text"
              placeholder="Ingrese el título"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción*</Form.Label>
            <Form.Control
              name="description"
              onChange={handleOnChange}
              value={input.description}
              type="text"
              placeholder="Ingrese la descripción"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Texto del Botón*</Form.Label>
            <Form.Control
              name="btnTxt"
              onChange={handleOnChange}
              value={input.btnTxt}
              type="text"
              placeholder="Texto del botón"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={
              !input.title.length ||
              !input.description.length ||
              !input.btnTxt.length ||
              isSubmited
            }
          >
            Enviar
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default SendNewsletter;

