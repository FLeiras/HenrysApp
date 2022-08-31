import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import { BoxArrowLeft, Heart } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import imgUserDefault from '../../../Assets/Images/logo-henrys.png';
import { setImgError } from '../../methods';

import './UserLoggedInDropdown.css';

function UserLoggedInDropdown({ userData, logoutSession }) {
  return (
    <Dropdown>
      <Dropdown.Toggle className="nav__btn" id="dropdown-basic">
        <img
          src={userData.imgUri ? userData.imgUri : 'error'}
          onError={(e) => setImgError(e, imgUserDefault)}
          alt="img not found"
          className="loggedIn__img__profile"
        ></img>
        {userData.firstName ? userData.firstName : 'Usuario'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.ItemText className="dropdown__link-btn">
          <Link to="/userprofiledashboard" className="navBar__registrate">
            Mi perfil
          </Link>
        </Dropdown.ItemText>

        <Link to="/userfavorites" className="loggedIn__Link">
          <Heart className="loggedIn__icons" />
          Favoritos
        </Link>
        <br />
        <Link to={false} onClick={logoutSession} className="loggedIn__Link">
          <BoxArrowLeft className="loggedIn__icons" /> Salir
        </Link>
        <Dropdown.Divider />

        {userData.role === 'admin' && (
          <Dropdown.ItemText>
            <Button
              as={Link}
              to="/adminhome"
              variant="secondary"
              className="userLoggedIn__panelAdminBtn"
            >
              Panel Admin
            </Button>
          </Dropdown.ItemText>
        )}

        {userData.role === 'employee' && (
          <Dropdown.ItemText>
            <Button
              as={Link}
              to="/employeehome"
              variant="secondary"
              className="userLoggedIn__panelAdminBtn"
            >
              Empleado
            </Button>
          </Dropdown.ItemText>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserLoggedInDropdown;
