import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import orderReady from '../../../Assets/Images/Employee/orderready.png';
import pendingdOrder from '../../../Assets/Images/Employee/pendingorder.png';
import EmployeeNavBar from '../EmployeeNavBar/EmployeeNavBar';

import './EmployeeHome.css';

function EmployeeHome() {
  return (
    <Container className="mt-5">
      <h1>Bienvenido de nuevo, Empleado!</h1>
      <hr />
      <div className="employeeHome__container">
        <div className="employee__cards__container">
          <Card style={{ width: '18rem' }} className="employee__card">
            <Card.Img
              variant="top"
              src={pendingdOrder}
              className="employee__card__img"
            />
            <Card.Body className="employee__cardBody">
              <Card.Title>
                <h3>Pedidos Pendientes</h3>
              </Card.Title>
              <Button variant="secondary" as={Link} to="/employeependingorders">
                Ingresar
              </Button>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }} className="employee__card">
            <Card.Img
              variant="top"
              src={orderReady}
              className="employee__card__img"
            />
            <Card.Body className="employee__cardBody">
              <Card.Title>
                <h3>Pedidos Listos</h3>
              </Card.Title>
              <Button variant="secondary" as={Link} to="/employeeordersready">
                Ingresar
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default EmployeeHome;
