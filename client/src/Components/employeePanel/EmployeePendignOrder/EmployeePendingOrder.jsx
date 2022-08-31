import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { MdPendingActions } from 'react-icons/md';
import { GiPartyPopper } from 'react-icons/gi';
import { setStateOrder } from '../../requests';
import { setOrders } from '../../../Redux/actions/actions';

import './EmployeePendingOrder.css';

function EmployeePendingOrder() {
  const dispatch = useDispatch();
  const [isSubmited, setSubmited] = useState(false);
  const session = useSelector((state) => state.loginState);
  const orders = useSelector((state) => state.orders.filter(ord => ord.status === "Pendiente"));
  const [show, setShow] = useState(false);
  const [orderId, setOrderId] = useState("");
  const handleClose = () => setShow(false);
  function handleShow(e){
    setOrderId(e.target.value);
    setShow(true);
  }

  async function handleSubmit(e) {
    try {
      setSubmited(true);
      const data = {
        status: 'Listo',
        employee: session.firstName + ' ' + session.lastName,
      };
      await setStateOrder(orderId, data);
      let updateData = [];

      for (let i = 0; i < orders.length; i++) {
        if (orders[i].purchaseId !== orderId) {
          updateData.push(orders[i]);
        }
      }

      dispatch(setOrders(updateData));
    } catch (error) {
    } finally {
      setSubmited(false);
      handleClose();
    }
  }

  return (
    <div className="employee__pending__container mt-5">
      <h2>
        <MdPendingActions className="employee__cardList" />
        Gestionar pedidos Pendientes
      </h2>
      <hr />
      <Container>
        <Table bordered hover responsive>
          <thead className="employee__thead">
            <tr>
              <th>Fecha y Hora</th>
              <th>Cliente</th>
              <th>Productos</th>
              <th>Nota</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!orders.length && (
              <tr>
                <td colSpan={6} className="pt-5 pb-5">
                  <h2>
                    <GiPartyPopper className="giPartyPopper" /> ¡Felicitaciones!
                    <GiPartyPopper className="giPartyPopper" />
                  </h2>
                  <p>No hay órdenes pendientes para preparar.</p>
                </td>
              </tr>
            )}
            {orders &&
              orders?.map((ord, i) => (
                <tr key={i}>
                    <td>
                    {new Date(ord.createdAt)
                        .toString()
                        .slice(
                        0,
                        new Date(ord.createdAt).toString().indexOf('GMT') -
                            1
                        )}
                    </td>
                    <td>
                    {ord.customer[0].firstName +
                        ' ' +
                        ord.customer[0].lastName}
                    </td>
                    <td>
                    <ul className="employee__ul">
                        {ord.data.additional_info.items &&
                        ord.data.additional_info.items.map((item, i) => (
                            <li key={i}>
                            <span className="employee__li__span">
                                {item.title}
                            </span>
                            <br />
                            Cantidad: {item.quantity}
                            <hr />
                            </li>
                        ))}
                    </ul>
                    </td>
                    <td>
                    {ord.data.metadata.note ? ord.data.metadata.note : ''}
                    </td>
                    <td>
                    $ {ord.data.transaction_amount}
                    </td>
                    <td>
                    <Button value={ord.purchaseId} variant="primary" onClick={(e) => handleShow(e)}>
                        Listo
                    </Button>                    
                    </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Confirmar Estado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                ¿Estás seguro de pasar éste pedido se encuentra
                listo?
                </Modal.Body>
                <Modal.Footer>
                <Button
                    id={orderId}
                    onClick={handleSubmit}
                    disabled={isSubmited}
                    variant="primary"
                >
                    Confirmar
                </Button>
                </Modal.Footer>
            </Modal>
      </Container>
    </div>
  );
}

export default EmployeePendingOrder;
