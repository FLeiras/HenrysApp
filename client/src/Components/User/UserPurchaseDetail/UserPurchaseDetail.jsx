/* eslint-disable camelcase */
import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { getPurchase } from '../../../Redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import purchaseImg from '../../../Assets/Images/transaction-confirm.png';
import { FcPaid, FcExpired } from 'react-icons/fc';

import './UserPurchaseDetail.css';

function UserPurchaseDetail() {
  const dispatch = useDispatch();
  const { token } = JSON.parse(window.localStorage.getItem('user'));
  const { id } = useParams();
  const { purchaseInfo } = useSelector((state) => state);
  const {
    transaction_amount,
    status,
    additional_info,
    transaction_details,
    installments,
  } = purchaseInfo || '';

  useEffect(() => {
    if (!purchaseInfo) {
      dispatch(getPurchase(id, token));
    }
  }, [purchaseInfo, dispatch, id, token]);

  return (
    <Container className="mb-3 mt-3">
      <h1>Información de tu compra</h1>
      <p>
        Se envió un mail a la dirección registrada con instruciones a seguir.
      </p>
      <hr />
      <div className="purchaseDetail__container mt-5 mb-5">
        <Row>
          <Col className="purchaseDetail__img" sm={12} lg={5}>
            <img
              src={purchaseImg}
              alt="imagen de un combo"
              className="img-fluid"
            />
          </Col>
          <Col sm={12} lg={6}>
            <div className="purchaseDetail__pay__container">
              {purchaseInfo && (
                <div>
                  {status === 'approved' ? (
                    <h2>
                      <FcPaid />
                      Transacción exitosa
                    </h2>
                  ) : status === 'in_process' ? (
                    <h2>
                      <FcExpired />
                      Su pago está en proceso
                    </h2>
                  ) : (
                    <h2>
                      <FcExpired />
                      Su pago está pendiente
                    </h2>
                  )}
                  <hr />
                  <div className="purchaseDetail__payment">
                    <h4>Datos del pago:</h4>
                    <hr />
                    {/* Verifica si hay cuotas */}
                    {installments && installments > 1 && (
                      <div>
                        <p>Subtotal: $ {transaction_amount.toFixed(2) || ''}</p>
                        <p>
                          En {installments} cuotas de $
                          {transaction_details.installment_amount}
                        </p>
                      </div>
                    )}
                    <p className="purchaseDetail__total">
                      Total: ${transaction_details.total_paid_amount.toFixed(2) || ''}
                    </p>
                  </div>

                  <div className="purchaseDetail__productList">
                    <h4>Detalle de la compra:</h4>
                    <hr />
                    {additional_info.items.map((i) => (
                      <ul key={i.id} className="purchaseDetail__ul">
                        <li>
                          Producto: <span>{i.title}</span>
                        </li>

                        <li>
                          Precio unitario:<span> ${i.unit_price ? Number(i.unit_price).toFixed(2) : ""}</span>
                        </li>
                        <li>
                          Cantidad:
                          <span> {i.quantity}</span>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default UserPurchaseDetail;
