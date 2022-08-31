import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { PencilSquare, Trash, ArrowClockwise } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  deleteProduct,
  restoreProduct,
} from '../../../../Redux/actions/actions';
import { setImgIngredientErr, setImgProductHomeErr } from '../../../methods';

import './ProductCardAdmin.css';

function ProductCardAdmin({ data, isDeleted }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirect = () => {
    navigate(`/admineditproducts/${data.id}`);
  };

  const onDelete = () => {
    if (isDeleted) {
      dispatch(deleteProduct(data.id, data.type));
    } else {
      dispatch(restoreProduct(data.id, data.type));
    }
  };

  return (
    <Card style={{ width: '15rem' }} className="adminProductHome__card">
      <Card.Img
        variant="top"
        src={data.imgUri}
        className="adminProductHome__card__img"
        onError={data.type === "ingredients" ? (e) => setImgIngredientErr(e) : (e) => setImgProductHomeErr(e)}
      />
      <Card.Body className="adminProductHome__cardBody">
        <Card.Title className="adminProductHome__cardTittle">
          {data.name}
        </Card.Title>
        <div className="productCard__buttons">
          {isDeleted && (
            <Button onClick={redirect} variant="secondary">
              <PencilSquare />
            </Button>
          )}
          {data.type !== 'burgerBase' && (
            <Button onClick={onDelete} variant="secondary">
              {isDeleted ? <Trash /> : <ArrowClockwise />}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCardAdmin;
