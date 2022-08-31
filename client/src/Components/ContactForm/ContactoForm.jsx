/* eslint-disable no-useless-escape */
import React, { useState, useRef } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Swal from 'sweetalert2';
import contactImg from '../../Assets/Images/Hamburguesas/Stacker-Triple.png';
import emailjs from '@emailjs/browser';

import './ContactForm.css';

function ContactoForm() {
  const form = useRef();

  const [done, setDone] = useState(false);
  const [error, setError] = useState({});
  const [input, setInput] = useState({});

  function handleSubmit() {
    Swal.fire({
      title: 'Mensaje enviado con éxito',
      text: 'Muchas gracias por contactarnos, en breve estaremos comunicandonos.',
      imageUrl:
        'https://res.cloudinary.com/henrysburgers/image/upload/v1659301858/success-henrys_nlrgo0.png',
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Logo henrys',
      showConfirmButton: false,
      timer: 2500,
    });
  }

  const sendEmail = (e) => {
    e.preventDefault();
    // eslint-disable-next-line import/no-named-as-default-member
    emailjs
      .sendForm(
        'service_xu5vfs3',
        'template_as17onx',
        form.current,
        '-zW9oJ2EERInnxlyT'
      )
      .then((result) => {
        setDone(true);
      });
    e.target.reset();
    setInput({ subject: undefined });
  };
  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validate({ ...input, [e.target.name]: e.target.value }));
  }
  function validate(input) {
    let error = {};

    if (!input.user_name) {
      error.user_name = '*El nombre es obligatorio';
    } else if (
      !/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
        input.user_name
      )
    ) {
      error.user_name = 'Nombre inválido sólo admite letras';
    }

    if (!input.user_surname) {
      error.user_surname = '*El apellido es obligatorio';
    } else if (
      !/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
        input.user_surname
      )
    ) {
      error.user_surname = 'Apellido inválido';
    }

    if (!input.email) {
      error.email = '*El Email es obligatorio';
    }
    // eslint-disable-next-line no-useless-escape
    else if (
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        input.email
      )
    ) {
      error.email = 'Este email es inválido';
    }

    if (!input.telephone) {
      error.telephone = '* El celular es obligatorio';
    } else if (input.telephone.length < 10 || isNaN(Number(input.telephone))) {
      error.telephone = 'Escribe un número válido';
    }

    if (!input.message) {
      error.message = 'Por favor escribe el motivo de tu consulta';
    }

    return error;
  }

  return (
    <div>
      <Container>
        <h2 className="pt-3">¡Nos encanta saber de vos!</h2>
        <Row className="contact__form__container">
          <Col lg={6} sm={12} className="p-5">
            <p className="contact__text__left">
              Compartí tus consultas, comentarios ó sugerencias a través del
              formulario y te responderemos a la brevedad
            </p>
            <form
              ref={form}
              onSubmit={(e) => {
                handleSubmit(e);
                sendEmail(e);
              }}
              action="#"
              id="contact_form"
            >
              <Row>
                <input
                  className="contactForm__input"
                  type="text"
                  placeholder="Nombre*"
                  name="user_name"
                  id="name_input"
                  required
                  onChange={(e) => handleChange(e)}
                />
                <div className="contactForm__errContainer">
                  {error.user_name && <p>{error.user_name}</p>}
                </div>
                <input
                  className="contactForm__input"
                  type="text"
                  placeholder="Apellido*"
                  name="user_surname"
                  id="surname_input"
                  required
                  onChange={(e) => handleChange(e)}
                />
                <div className="contactForm__errContainer">
                  {error.user_surname && <p>{error.user_surname}</p>}
                </div>
              </Row>
              <Row>
                <input
                  className="contactForm__input"
                  type="email"
                  placeholder="E-mail*"
                  name="email"
                  id="email_input"
                  required
                  onChange={(e) => handleChange(e)}
                />
                <div className="contactForm__errContainer">
                  {error.email && <p>{error.email}</p>}
                </div>
                <input
                  className="contactForm__input"
                  type="text"
                  placeholder="Telefono*"
                  name="telephone"
                  id="telephone_input"
                  required
                  onChange={(e) => handleChange(e)}
                />
                <div className="contactForm__errContainer">
                  {error.telephone && <p>{error.telephone}</p>}
                </div>
              </Row>
              <Row>
                <select
                  className="contactForm__input"
                  placeholder="Tipo de consulta"
                  name="subject"
                  id="subject_input"
                  required
                  onChange={(e) => handleChange(e)}
                >
                  <option value="default" hidden>
                    Tipo de consulta*
                  </option>
                  <option value="1">Franquicias</option>
                  <option value="2">Consulta General</option>
                  <option value="3">Felicitaciones</option>
                  <option value="4">Reclamos</option>
                </select>
                <div className="contactForm__errContainer">
                  {Object.keys(error).length > 0 && !input.subject && (
                    <p>Por favor seleccione una opción</p>
                  )}
                </div>

                <textarea
                  className="contactForm__input"
                  name="message"
                  placeholder="* Me comunico por..."
                  id="message_input"
                  cols="20"
                  rows="3"
                  required
                  onChange={(e) => handleChange(e)}
                />
                <div className="contactForm__errContainer">
                  {error.message && <p>{error.message}</p>}
                </div>
              </Row>
              <Button
                type="submit"
                key="submit"
                value="submit"
                id="form_button"
                disabled={Object.keys(error).length > 0 || !input.subject}
              >
                Enviar
              </Button>
            </form>
          </Col>
          <Col sm={12} lg={5}>
            <img
              src={contactImg}
              alt="Imagen de una hamburguesa triple con bacon"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactoForm;
