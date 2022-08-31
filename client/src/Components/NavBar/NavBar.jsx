import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CartFill, CartCheckFill } from 'react-bootstrap-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import imgNav from '../../Assets/Images/logo-henrys300px.png';
import UserLoggedInDropdown from '../User/UserLoggedIn/UserLoggedInDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import AdminNavBar from '../Admin/AdminNavBar/AdminNavBar';
import {
  deleteCart,
  setLocalStorage,
  setLoginState,
} from '../../Redux/actions/actions';

import './NavBar.css';
import EmployeeNavBar from '../employeePanel/EmployeeNavBar/EmployeeNavBar';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsToCart = useSelector((state) => state.cart);
  const isSession = useSelector((state) => state.loginState);
  const mount = useRef(true);
  const { isAuthenticated, logout } = useAuth0();
  const path = useLocation().pathname;
  const isAdmin = path.includes('admin');
  const isEmployee = path.includes('employee');

  useEffect(() => {
    if (mount.current) {
      if (!itemsToCart.length && window.localStorage.getItem('carrito')) {
        dispatch(
          setLocalStorage(JSON.parse(window.localStorage.getItem('carrito')))
        );
      }
      if (isLogged()) {
        dispatch(
          setLoginState(JSON.parse(window.localStorage.getItem('user')))
        );
      }
      mount.current = false;
    } else {
      if (isLogged()) {
        dispatch(
          setLoginState(JSON.parse(window.localStorage.getItem('user')))
        );
      }
    }
  }, [dispatch, itemsToCart]);

  function logoutSession(e) {
    e.preventDefault();
    removeLocalStorage();
    dispatch(setLoginState(false));

    if (!isAuthenticated) {
      navigate('/');
    } else {
      logout({ returnTo: window.location.origin });
    }
  }

  function removeLocalStorage() {
    if (window.localStorage.getItem('user')) {
      window.localStorage.removeItem('user');
    }

    if (window.localStorage.getItem('carrito')) {
      dispatch(deleteCart(false));
      window.localStorage.removeItem('carrito');
    }

    if (window.localStorage.getItem('favoritos')) {
      window.localStorage.removeItem('favoritos');
    }

    if (window.localStorage.getItem('cupones')) {
      window.localStorage.removeItem('cupones');
    }
  }

  function isLogged() {
    return !!window.localStorage.getItem('user');
  }

  function setScrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  return (
    <>
      {isAdmin && <AdminNavBar />}
      {isEmployee && <EmployeeNavBar />}

      {!isAdmin && !isEmployee && (
        <Navbar className="navBar" expand="lg" variant="dark" sticky="top">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img src={imgNav} className="nav-img" alt="Henrys burguer logo" />{' '}
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />

            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link
                  className={
                    path === '/' ? 'linkActive' : 'navBar__users__link'
                  }
                  as={Link}
                  to="/"
                  onClick={setScrollToTop}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  className={
                    path === '/menu' ? 'linkActive' : 'navBar__users__link'
                  }
                  as={Link}
                  to="/menu"
                  onClick={setScrollToTop}
                >
                  Menú
                </Nav.Link>
                <Nav.Link
                  className={
                    path === '/nosotros' ? 'linkActive' : 'navBar__users__link'
                  }
                  as={Link}
                  to="/nosotros"
                  onClick={setScrollToTop}
                >
                  Nosotros
                </Nav.Link>
                <Nav.Link
                  className={
                    path === '/contacto' ? 'linkActive' : 'navBar__users__link'
                  }
                  as={Link}
                  to="/contacto"
                  onClick={setScrollToTop}
                >
                  Contacto
                </Nav.Link>
                <Nav.Link
                  className={
                    path === '/quedicendenosotros'
                      ? 'linkActive'
                      : 'navBar__users__link'
                  }
                  as={Link}
                  to="/quedicendenosotros"
                  onClick={setScrollToTop}
                >
                  Reviews
                </Nav.Link>
                <Nav.Link
                  className="ms-5 me-5"
                  as={Link}
                  to="/cart"
                  onClick={setScrollToTop}
                >
                  {itemsToCart && itemsToCart?.length === 0 ? (
                    <CartFill />
                  ) : (
                    <>
                      <CartCheckFill className="CartCheckFill" />
                      <span className="cart__fill__items">
                        {itemsToCart.length}
                      </span>
                    </>
                  )}
                </Nav.Link>
              </Nav>

              {isSession && (
                <UserLoggedInDropdown
                  userData={isSession}
                  logoutSession={logoutSession}
                />
              )}

              {!isSession && (
                <Dropdown>
                  <Dropdown.Toggle className="nav__btn" id="dropdown-basic">
                    Ingresar
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.ItemText className="dropdown__link-btn">
                      <Link to="/userlogin">Iniciá Sesión</Link>
                    </Dropdown.ItemText>

                    <Dropdown.ItemText>
                      <Dropdown.Divider />
                      <span>¿No tenés cuenta?</span>
                      <Link to="/registeruser" className="navBar__registrate">
                        Registrate
                      </Link>
                    </Dropdown.ItemText>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default NavBar;
