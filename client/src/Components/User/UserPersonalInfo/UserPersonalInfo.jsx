import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import { setLoginState } from '../../../Redux/actions/actions';
import './UserPersonalInfo.css';

function UserPersonalInfo() {

  const dispatch = useDispatch();
  const isSession = useSelector((state) => state.loginState);

  const [input, setInput] = useState({
    firstName: isSession.firstName,
    lastName: isSession.lastName
  });

  const [password, setPassword] = useState({
    beforePassword: "",
    password: "",
    confirm: ""
  });
  const [error, setError] = useState({});

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function validate(input) {
    let error = {};
    if (input.password || input.confirm) {
      if (input.confirm !== input.password) {
        error.password = 'Las contraseñas deben coincidir';
      }
    }
    return error;
  }

  async function handleSubmit(e, input) {
    e.preventDefault();
    if (!input.firstName || !input.lastName) {
      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: 'Error!',
        text: 'Los campos no pueden estar vacios!',
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301854/error-henrys_zoxhtl.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
      return;
    }
    try {
      await axios.put(`/users/${isSession.id}`, {...input}, {
        headers: {
          'auth-token': isSession.token,
        },
      });
      const updateSession = {
        ...isSession,
        ...input,
      };

      const updateLocal = {
        ...JSON.parse(window.localStorage.getItem("user")),
        ...input,
      };

      window.localStorage.setItem("user", JSON.stringify(updateLocal));

      dispatch(setLoginState(updateSession));
      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: 'Exito!',
        text: 'Se han modificado los datos!',
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301858/success-henrys_nlrgo0.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
    } catch (error) {
      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: 'Opss...',
        text: 'Error del servidor!',
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301854/error-henrys_zoxhtl.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
    }

  }
  function defaultData() {
    setInput({
        firstName: isSession.firstName,
        lastName: isSession.lastName
    }); 
    resetPassInputs();   
  }

  function resetPassInputs(){
    setPassword({
        beforePassword: "",
        password: "",
        confirm: ""
    });
    setError({});
  }

  function handlePassword(e) {

    setPassword({ ...password, [e.target.name]: e.target.value });
    setError(validate({ ...password, [e.target.name]: e.target.value }));
  }

  async function submitPassword(e, password) {
    e.preventDefault();
    if (
      !password.password ||
      !password.confirm ||
      !password.beforePassword ||
      Object.keys(error).length !== 0
    ) {
      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: 'No se puede cambiar la contraseña',
        text: 'Por favor complete todos los espacios correctamente',
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301854/error-henrys_zoxhtl.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
      return;
    }
    const obj = {
      passwordOld: password.beforePassword,
      passwordNew: password.confirm,
      email: isSession.email,
    };

    try {
      await axios.put('/changePassword/', obj, {
        headers: {
          'auth-token': isSession.token,
        },
      });
      resetPassInputs();
      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: 'Exito!',
        text: 'Contraseña modificada!',
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301858/success-henrys_nlrgo0.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
    } catch (error) {
      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: 'Opss...',
        text: 'La contraseña actual es incorrecta!',
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301854/error-henrys_zoxhtl.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
    }
  }

  return (
    <div className="userPersonalInfo__container">
      <h1>Mis Datos</h1>
      <Form className="mb-5">
        <hr />
        <Row className="mb-3 mt-5 userInfo__row">
          <Col lg={6}>
            <Form.Group as={Col} controlId="formGridNombre">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                placeholder="Nombre*"
                name="firstName"
                onChange={(e) => handleChange(e)}
                value={input.firstName}
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group as={Col} controlId="formGridApellido">
              <Form.Label>Apellido:</Form.Label>
              <Form.Control
                placeholder="Apellido*"
                name="lastName"
                onChange={(e) => handleChange(e)}
                value={input.lastName}
              />
            </Form.Group>
          </Col>
          <Button
            className="userInfo__btn__pass"
            variant="primary"
            type="Submit"
            onClick={(e) => handleSubmit(e, input)}
          >
            Actualizar Datos
          </Button>
        </Row>
        <Row className="mb-5 userInfo__row">
          <Col lg={4}>
            <Form.Group controlId="formGridPassword">
              <Form.Label>Contraseña actual:</Form.Label>
              <Form.Control
                value={password.beforePassword}
                type="password"
                placeholder="Ingrese contraseña actual*"
                name="beforePassword"
                onChange={(e) => handlePassword(e)}
              />
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group controlId="formGridPassword">
              <Form.Label>Contraseña nueva:</Form.Label>
              <Form.Control
                value={password.password}
                type="password"
                placeholder="Ingrese contraseña nueva*"
                name="password"
                onChange={(e) => handlePassword(e)}
              />
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group as={Col} controlId="formGridConfirPassword">
              <Form.Label>Confirmar contraseña:</Form.Label>
              <Form.Control
                value={password.confirm}
                type="password"
                placeholder="Confirme la contraseña*"
                name="confirm"
                onChange={(e) => handlePassword(e)}
              />
            </Form.Group>
            <div className="formGrid__errContainer">
                {error.password && <p>{error.password}</p>}
            </div>
          </Col>
          <Button
            className="mb-3 userInfo__btn__pass"
            variant="primary"
            type="Submit"
            onClick={(e) => submitPassword(e, password)}
          >
            Actualizar Contraseña
          </Button>
        </Row>
        <hr />
        <Button as={Link} to="/userprofiledashboard" variant="primary">
          Volver
        </Button>
        <Button
          variant="outline-warning"
          className="userInfo__btn m-3"
          onClick={defaultData}
        >
          Cancelar
        </Button>
      </Form>
    </div>
  );
}

export default UserPersonalInfo;
