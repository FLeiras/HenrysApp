import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import imgLogin from '../../../Assets/Images/Hamburguesas/PAPAS-KING.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import Swal from 'sweetalert2';

import './UserRegister.css';

function UserRegister() {
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [error, setError] = useState({});

  const [isSubmited, setSubmited] = useState(false);

  /* Funcion que modifica el estado local con los valores de los input */
  const handleChange = (e) => {
    setInput((state) => {
      const newState = {
        ...state,
        [e.target.name]: e.target.value,
      };
      return newState;
    });
    setError(validate({ ...input, [e.target.name]: e.target.value }));
  };

  /* validaciones */
  function validate(input) {
    let error = {};
    /* del nombre */

    if (!input.firstName) {
      error.firstName = '* El nombre es obligatorio';
    } else if (
      !/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
        input.firstName
      )
    ) {
      error.firstName = '* Nombre inválido sólo admite letras';
    }

    /* del apellido */

    if (!input.lastName) {
      error.lastName = '* El apellido es obligatorio';
    } else if (
      !/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
        input.lastName
      )
    ) {
      error.lastName = '* Apellido inválido';
    }

    /* del email */

    if (!input.email) {
      error.email = '* E-mail obligatorio';
    } else if (
      // eslint-disable-next-line no-useless-escape
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        input.email
      )
    ) {
      error.email = '*E-mail es invalido';
    }

    /* del pass */

    if (!input.password) {
      error.password = '* El campo es requerido';
    }

    /* del confirm */
    if (input.passwordConfirm !== input.password) {
      error.passwordConfirm = '* Error al confirmar contraseña';
    }

    return error;
  }

  /* al submitear */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmited(true);
      const res = await axios.post(`/register`, { ...input });
      if (res.status === 201) {
        setInput({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirm: '',
        });
        Swal.fire({
          customClass: {
            confirmButton: 'confirmBtnSwal',
          },
          title: 'Usuario creado exitosamente!',
          text: 'Revise su correo para activar la cuenta',
          imageUrl:
            'https://res.cloudinary.com/henrysburgers/image/upload/v1659301858/success-henrys_nlrgo0.png',
          imageWidth: 150,
          imageHeight: 150,
          imageAlt: 'Logo henrys',
        });
      }
    } catch (error) {
      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: 'Oops...',
        text:
          typeof error.response.data.error !== 'string'
            ? 'Error al registrarse!'
            : error.response.data.error,
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301854/error-henrys_zoxhtl.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
    } finally {
      setSubmited(false);
    }
  };

  return (
    <Container>
      <div>
        <Row className="userRegister__container m-3">
          <Col lg={6} sm={12}>
            <h1 className="userRegister__tittle">Crear tu cuenta</h1>
            <p>Regístrate para poder empezar a disfrutar de Henry´s</p>

            <p className="userRegister__divider">────────────────────</p>
            <Form
              className="mb-5"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <Row className="mb-3">
                <Form.Group as={Col} sm={12} lg={6} controlId="formGridNombre">
                  <div className="userRegister__errContainer">
                    {error.firstName && <p>{error.firstName}</p>}
                  </div>
                  <Form.Control
                    type="input"
                    value={input.firstName}
                    name="firstName"
                    autoComplete="off"
                    placeholder="Nombre*"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  sm={12}
                  lg={6}
                  controlId="formGridApellido"
                >
                  <div className="userRegister__errContainer">
                    {error.lastName && <p>{error.lastName}</p>}
                  </div>
                  <Form.Control
                    type="text"
                    value={input.lastName}
                    name="lastName"
                    placeholder="Apellido*"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridEmail">
                <div className="userRegister__errContainer">
                  {error.email && <p>{error.email}</p>}
                </div>
                <Form.Control
                  type="text"
                  value={input.email}
                  name="email"
                  placeholder="Email*"
                  onChange={handleChange}
                />
              </Form.Group>
              <Row className="mb-5">
                <Form.Group
                  as={Col}
                  sm={12}
                  lg={6}
                  controlId="formGridPassword"
                >
                  <div className="userRegister__errContainer">
                    {error.password && <p>{error.password}</p>}
                  </div>
                  <Form.Control
                    value={input.password}
                    name="password"
                    type="password"
                    placeholder="Contraseña*"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  sm={12}
                  lg={6}
                  controlId="formGridConfirPassword"
                >
                  <div className="userRegister__errContainer">
                    {error.passwordConfirm && <p>{error.passwordConfirm}</p>}
                  </div>
                  <Form.Control
                    value={input.passwordConfirm}
                    name="passwordConfirm"
                    type="password"
                    placeholder="Confirmar*"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Button
                variant="primary"
                type="submit"
                disabled={
                  !input.firstName.length ||
                  !input.lastName.length ||
                  !input.email.length ||
                  !input.password.length ||
                  !input.passwordConfirm.length ||
                  Object.keys(error).length ||
                  isSubmited
                }
              >
                Registrarme
              </Button>
            </Form>
            <span>¿Ya tenés una cuenta? </span>
            <Link to="/userlogin" className="navBar__registrate">
              Ingresá
            </Link>
          </Col>
          <Col lg={6} sm={12}>
            <img
              className="img-fluid"
              src={imgLogin}
              alt="imagen de un combo"
            />
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default UserRegister;
