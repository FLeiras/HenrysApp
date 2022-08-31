import React, { useState, useEffect, useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import imgLogin from '../../../Assets/Images/combos/Combo1.png';
import Form from 'react-bootstrap/Form';
import { FcGoogle } from 'react-icons/fc';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormText from 'react-bootstrap/esm/FormText';
import imgLogo from '../../../Assets/Images/logo-henrys300px.png';
import Swal from 'sweetalert2';

import './UserLogin.css';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState } from '../../../Redux/actions/actions';

function UserLogin() {
  const dispatch = useDispatch();
  const isSession = useSelector((state) => state.loginState);
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  const [show, setShow] = useState(false);
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const [recoveryInput, setRecoveryInput] = useState('');
  const [isSubmitedLogin, setSubmitedLogin] = useState(false);
  const [isSubmitedRecovery, setSubmitedRecovery] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitedLogin(true);
      const res = await axios.post(`/login`, { ...input });

      if (res.status === 200) {
        if (!isSession) {            
          const data = { ...res.data.user, token: res.data.data.token };
          window.localStorage.setItem('user', JSON.stringify(data));
          dispatch(setLoginState(data));
          navigate('/');
        }
      }
    } catch (error) {
      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: 'Oops...',
        text: typeof(error.response.data.error) !== "string" ? "Credenciales inválidas!" : error.response.data.error,
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301854/error-henrys_zoxhtl.png',
        imageWidth: 170,
        imageHeight: 170,
        imageAlt: 'Logo henrys',
      });
    } finally {
        setSubmitedLogin(false);
    }
  };

  const handleSubmitRecoveryPass = async (e) => {
    try {
      e.preventDefault();
      setSubmitedRecovery(true);
      const res = await axios.post('/passwordRecovery', {
        email: recoveryInput,
      });

      if (res.status === 200) {
        Swal.fire({
          customClass: {
            confirmButton: 'confirmBtnSwal',
          },
          title: 'Mensaje enviado correctamente',
          text: 'Revise el correo para recuperar su cuenta!',
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
        title: 'Opss...',
        text: typeof(error.response.data.error) !== "string" ? "Correo inválido!" : error.response.data.error,
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301854/error-henrys_zoxhtl.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
    } finally {
        setSubmitedRecovery(false);
    }
    handleClose();
  };

  return (
    <div>
        <Row className="userLogin__container m-3">
          <Col lg={6} sm={12}>
            <h1 className="userLogin__tittle">Ingresá a tu cuenta</h1>
            <p>Bienvenido de nuevo, por favor ingrese sus datos.</p>
            <Button
              variant="outline-secondary"
              className="p-2"
              onClick={() => loginWithRedirect()}
            >
              <FcGoogle /> Continuar con Google
            </Button>
            <p className="userLogin__divider">──────── Ó ────────</p>
            <Form
              className="userLogin__form mb-5"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Form.Group controlId="formGridEmail">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="mb-3"
                  value={input.email}
                  onChange={(e) => handleChange(e)}
                />
                <Form.Control
                  className="mb-3"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={input.password}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>

              <FormText
                className="mb-3 userLogin__forgotPass"
                as={Button}
                onClick={handleShow}
              >
                Olvidé mi contraseña
              </FormText>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <img
                    src={imgLogo}
                    alt="logo de henrys"
                    className="img-fluid userLogin__imgLogo"
                  ></img>
                  <Modal.Title>Recuperar Contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    Ingresá el E-mail con el que te registraste para recuperar
                    tu acceso.
                  </p>
                  <Form.Control
                    type="email"
                    placeholder="Ingresar mail"
                    className="mb-3"
                    value={recoveryInput}
                    onChange={(e) => setRecoveryInput(e.target.value)}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    disabled={!recoveryInput || isSubmitedRecovery}
                    onClick={(e) => handleSubmitRecoveryPass(e)}
                  >
                    Enviar
                  </Button>
                </Modal.Footer>
              </Modal>
              <Button
                // as={Link}
                // to="/userprofiledashboard"
                variant="primary"
                type="submit"
                disabled={
                    !input.email.length ||
                    !input.password.length ||
                    isSubmitedLogin}
              >
                Ingresar
              </Button>
            </Form>
            <span>¿No tenés cuenta? </span>
            <Link to="/registeruser" className="navBar__registrate">
              Registrate
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
  );
}

export default UserLogin;
