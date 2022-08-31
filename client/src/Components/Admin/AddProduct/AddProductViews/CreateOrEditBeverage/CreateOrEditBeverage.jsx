import { React, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import {
  alertCustom,
  createProduct,
  updateProduct,
} from '../../../../requests';
import { postImageToCloudinary, setImgProductErr } from '../../../../methods';

import './CreateOrEditBeverage.css';
import '../FormsGlobal.css';

function CreateOrEditBeverage({ data }) {
  const navigate = useNavigate();
  const [edit] = useState(isEdit());
  const [isRestore, setRestore] = useState(false);
  const [input, setInput] = useState({
    id: '',
    name: '',
    price: '',
    size: 'Chico',
    isCarbonated: true,
    isSugar: true,
    imgUri: '',
    isVeggie: true,
  });

  useEffect(() => {
    if (edit && !isRestore) {
      setInput({
        id: data.id,
        name: data.name,
        price: data.price,
        size: data.size,
        isCarbonated: data.isCarbonated,
        isSugar: data.isSugar,
        imgUri: data.imgUri ? data.imgUri : '',
        isVeggie: data.isVeggie,
      });
      setRestore(true);
    }
  }, [edit, isRestore, data]);

  function isDisabledSubmit() {
    return !input.name || !input.price || !input.size;
  }

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  async function setImg(e) {
    const result = await postImageToCloudinary(e);

    if (result) {
      setInput({
        ...input,
        imgUri: result,
      });
    } else {
      e.target.value = '';
    }
  }

  function isEdit() {
    return data && Object.keys(data).length;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      try {
        await updateProduct('beverages', input);
        alertCustom(
          input.name,
          'Actualizada con exito!',
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301858/success-henrys_nlrgo0.png'
        );
        navigate('/adminproducts');
      } catch (error) {
        alertCustom(
          'Oops...',
          'No se pudo actualizar el producto!',
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301854/error-henrys_zoxhtl.png'
        );
      }
    } else {
      try {
        await createProduct('beverages', input);
        alertCustom(
          input.name,
          'Creada con exito!',
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301858/success-henrys_nlrgo0.png'
        );
        navigate('/adminproducts');
      } catch (error) {
        alertCustom(
          'Oops...',
          'No se pudo crear el producto!',
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659301854/error-henrys_zoxhtl.png'
        );
      }
    }
  };

  return (
    <Container className="mb-5">
      <h2>{edit ? 'Editar Bebidas' : 'Crear Bebidas'}</h2>
      <hr />
      <div className="editBeverage__container">
        <img
          src={input.imgUri}
          onError={(e) => setImgProductErr(e)}
          alt="img not"
          className="editOrCreate__img"
        ></img>

        <Form>
          <hr />
          <Row className="mb-3">
            <Form.Group as={Col} controlId="beverageName">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                placeholder="Nombre *"
                onChange={onChange}
                type="text"
                value={input.name}
                name="name"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="beveragePrice">
              <Form.Label>Precio *</Form.Label>
              <Form.Control
                placeholder="Precio *"
                onChange={onChange}
                type="number"
                value={input.price}
                name="price"
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="uploadImgBeverage">
            <Form.Label>Imagen *</Form.Label>
            <Form.Control
              placeholder="Url de la imagen"
              onChange={setImg}
              type="file"
              name="imgUri"
            ></Form.Control>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="isCarbonated">
              <Form.Label>Gasificada *</Form.Label>
              <Form.Select
                onChange={onChange}
                name="isCarbonated"
                value={input.isCarbonated}
              >
                <option value={true} defaultValue>
                  Si
                </option>
                <option value={false}>No</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="IsSugar">
              <Form.Label>Tiene Azúcar *</Form.Label>
              <Form.Select
                onChange={onChange}
                name="isSugar"
                value={input.isSugar}
              >
                <option value={true} defaultValue>
                  Si
                </option>
                <option value={false}>No</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="size">
              <Form.Label>Tamaño *</Form.Label>
              <Form.Select
                name="size"
                value={input.size}
                onChange={(e) => onChange(e)}
              >
                <option value="Chico" defaultValue>
                  Chica
                </option>
                <option value="Mediano">Mediana</option>
                <option value="Grande">Grande</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="isVeggie">
              <Form.Label>Apto para vegetarianos *</Form.Label>
              <Form.Select
                onChange={onChange}
                name="isVeggie"
                value={input.isVeggie}
              >
                <option value={true} defaultValue>
                  Si
                </option>
                <option value={false}>No</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Button
            onClick={onSubmit}
            disabled={isDisabledSubmit()}
            variant="primary"
            type="submit"
          >
            Confirmar
          </Button>
        </Form>
      </div>
      <hr />
    </Container>
  );
}

export default CreateOrEditBeverage;
