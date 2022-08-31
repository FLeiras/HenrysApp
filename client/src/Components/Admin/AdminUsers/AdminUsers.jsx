import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../Redux/actions/actions';
import {
  PersonCheckFill,
  PersonXFill,
  PencilSquare,
} from 'react-bootstrap-icons';

import './AdminUsers.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function AdminUsers() {
  const [show, setShow] = useState(false);
  const [rol, setRol] = useState('');
  const [id, setId] = useState('');
  const [filter, setFilter] = useState('');
  function handleClose() {
    setShow(false);
    setRol("");
  }
  function handleConfirm() {
    setShow(false);
    if (rol !== '') {
      submitRole(id);
    }
    setRol("");
  }
  function handleShow(id) {
    setShow(true);
    setId(id);
  }
  const token = JSON.parse(window.localStorage.getItem('user')).token;
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUser(token));
  }, [dispatch, token]);

  function handleRole(e) {
    setRol(e.target.value);
  }

  async function submitRole(id) {
    const obj = { id, role: rol };
    try {
      await axios.put('/users/', obj, {
        headers: {
          'auth-token': token,
        },
      });
      dispatch(getUser(token));
      setRol('');
      setId('');
      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: 'Exito!',
        text: 'Se ha podido cambiar el rol con exito!',
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301858/success-henrys_nlrgo0.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
      // setTimeout(function () {
      //   window.location.reload();
      // }, 3000);
    } catch (error) {
      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: 'Error',
        text: error.response.data.error[0].msg || 'Algo salio mal..',
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301854/error-henrys_zoxhtl.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
    }
  }

  function filterUsers(e) {
    const name = e.target.name;
    let query = '?rol=' + name;
    if (name === '') query = '';
    else if (name === 'active') {
      query = '?active=true';
    }
    else if (name === 'inactive') {
      query = '?active=false';
    }
    setFilter(name);
    dispatch(getUser(token, query));
  }

  async function handleDelete(id) {
    try {

        let query = '?rol=' + filter;
        if (filter === '') query = '';
        else if (filter === 'active') {
          query = '?active=true';
        }
        else if (filter === 'inactive') {
          query = '?active=false';
        }

      await axios.delete('/users/' + id, {
        headers: {
          'auth-token': token,
        },
      });

      dispatch(getUser(token, query));

      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: 'Exito!',
        text: 'Se ha podido desactivar el usuario!',
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301858/success-henrys_nlrgo0.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
      // setTimeout(function () {
      //   window.location.reload();
      // }, 3000);
    } catch (error) {
      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: 'Error',
        text: error.response.data.error[0].msg || 'Algo salio mal..',
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301854/error-henrys_zoxhtl.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
    }
  }

  async function handleActive(id) {
    const obj = {};
    try {

        let query = '?rol=' + filter;
        if (filter === '') query = '';
        else if (filter === 'active') {
          query = '?active=true';
        }
        else if (filter === 'inactive') {
          query = '?active=false';
        }

      await axios.post('/users/' + id, obj, {
        headers: {
          'auth-token': token,
        },
      });
      dispatch(getUser(token, query));
      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: 'Exito!',
        text: 'Se ha podido desactivar el usuario!',
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301858/success-henrys_nlrgo0.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
      // setTimeout(function () {
      //   window.location.reload();
      // }, 3000);
    } catch (error) {
      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: 'Error',
        text: error.response.data.error[0].msg || 'Algo salio mal..',
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301854/error-henrys_zoxhtl.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
    }
  }

  return (
    <Container>
      <div className="adminUsers__container">
        <h2>Gestionar tus usuarios</h2>
        <hr />
        <div className="filters__btn__container mb-3">
          <p>Filtrar Usuarios:</p>
          {/* <h3>{rol}</h3> */}
          <ButtonGroup
            aria-label="Filter Buttons"
            className="me-2 filter__btn"
            size="sm"
          >
            <Button
              className={`filter__btn ${filter === '' && 'activeBtn'}`}
              name=""
              onClick={(e) => filterUsers(e)}
            >
              Todos
            </Button>

            <Button
              className={`filter__btn ${filter === 'active' && 'activeBtn'}`}
              name="active"
              onClick={(e) => filterUsers(e)}
            >
              Activos
            </Button>
            <Button
              className={`filter__btn ${filter === 'inactive' && 'activeBtn'}`}
              name="inactive"
              onClick={(e) => filterUsers(e)}
            >
              Inactivos
            </Button>
            <Button
              className={`filter__btn ${filter === 'admin' && 'activeBtn'}`}
              name="admin"
              onClick={(e) => filterUsers(e)}
            >
              Administradores
            </Button>
            <Button
              className={`filter__btn ${filter === 'customer' && 'activeBtn'}`}
              name="customer"
              onClick={(e) => filterUsers(e)}
            >
              Usuarios
            </Button>
            <Button
              className={`filter__btn ${filter === 'employee' && 'activeBtn'}`}
              name="employee"
              onClick={(e) => filterUsers(e)}
            >
              Empleados
            </Button>
          </ButtonGroup>
        </div>
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>Nombre y Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.rows &&
              users.rows.map((user) => 
                  <tr key={user.id}>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className="adminUser__td__btns">
                      {!user.deletedAt && (
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleShow(user.id)}
                        >
                          <PencilSquare />
                        </Button>
                      )}                      

                      {user.deletedAt && user.role !== "admin" &&
                        <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleActive(user.id)}
                      >
                        <PersonCheckFill />
                      </Button>                      
                      }

                      {!user.deletedAt && user.role !== "admin" && 
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                        >
                          <PersonXFill />
                        </Button>                     
                      }
                    </td>
                  </tr>                
              )}
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Modificar Rol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Select
            aria-label="selectRol"
            onChange={(e) => handleRole(e)}
            >
            <option value="" hidden defaultValue>Selecionar</option>
            <option value="admin">ADMIN</option>
            <option value="employee">EMPLEADO</option>
            <option value="customer">USUARIO</option>
            </Form.Select>
        </Modal.Body>
        <Modal.Footer>
            <Button
            disabled={!rol.length}
            variant="primary"
            onClick={() => handleConfirm()}
            >
            Confirmar
            </Button>
        </Modal.Footer>
        </Modal>
    </Container>
  );
}

export default AdminUsers;
