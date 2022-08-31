import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import {
  alertCustom,
  createProduct,
  updateProduct,
} from '../../../../requests';
import { useNavigate } from 'react-router-dom';
import { postImageToCloudinary, setImgProductErr } from '../../../../methods';

import './CreateOrEditBurgerBase.css';
import '../FormsGlobal.css';

function CreateOrEditBurgerBase({ data }) {
  const navigate = useNavigate();
  const [edit] = useState(isEdit());
  const [isRestore, setRestore] = useState(false);
  const [input, setInput] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    imgUri: '',
    isVeggie: false,
  });

  useEffect(() => {
    if (edit && !isRestore) {
      setInput({
        id: data.id,
        name: data.name,
        price: data.price,
        description: data.description,
        imgUri: data.imgUri ? data.imgUri : '',
        isVeggie: data.isVeggie,
      });
      setRestore(true);
    }
  }, [edit, isRestore, data]);

  function isDisabledSubmit() {
    return !input.name || !input.price || !input.description;
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
        await updateProduct('burgerBase', input);
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
        await createProduct('burgerBase', input);
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
      <h2>{edit ? 'Editar Hamburguesa Base' : 'Crear Hamburguesa Base'}</h2>
      <hr />
      <div className="editBurgerBase__container">
        <img
          src={input.imgUri}
          onError={(e) => setImgProductErr(e)}
          alt="img not"
          className="editOrCreate__img"
        ></img>

        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                placeholder="Nombre *"
                onChange={onChange}
                type="text"
                name="name"
                value={input.name}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPrice">
              <Form.Label>Precio *</Form.Label>
              <Form.Control
                placeholder="Precio *"
                onChange={onChange}
                type="number"
                name="price"
                value={input.price}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              placeholder="Url de la imagen"
              onChange={setImg}
              type="file"
              name="imgUri"
            ></Form.Control>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridDescription">
              <Form.Label>Descripción *</Form.Label>
              <Form.Control
                placeholder="Descripción *"
                onChange={onChange}
                type="text"
                name="description"
                value={input.description}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridVegan">
              <Form.Label>Apto para vegetarianos *</Form.Label>
              <Form.Select
                onChange={onChange}
                name="isVeggie"
                value={input.isVeggie}
              >
                <option value={false} defaultValue>
                  No
                </option>
                <option value={true}>Si</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Button onClick={onSubmit} disabled={isDisabledSubmit()}>
            Confirmar
          </Button>
        </Form>
      </div>
      <hr />
    </Container>
  );
}

export default CreateOrEditBurgerBase;
