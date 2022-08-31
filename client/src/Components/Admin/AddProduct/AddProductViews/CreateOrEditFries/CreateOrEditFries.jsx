import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import {
  alertCustom,
  createProduct,
  updateProduct,
} from '../../../../requests';
import { postImageToCloudinary, setImgProductErr } from '../../../../methods';

import './CreateOrEditFries.css';
import '../FormsGlobal.css';

function CreateOrEditFries({ data }) {
  const navigate = useNavigate();
  const [edit] = useState(isEdit());
  const [isRestore, setRestore] = useState(false);
  const [input, setInput] = useState({
    id: '',
    name: '',
    price: '',
    size: 'Chico',
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
        await updateProduct('fries', input);
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
        await createProduct('fries', input);
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
    <Container>
      <h2>{edit ? 'Editar Papas Fritas' : 'Crear Papas Fritas'}</h2>
      <hr />
      <div className="editFries__container">
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

          <Form.Group className="mb-3" controlId="formGridImage">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              placeholder="Url de la imagen"
              onChange={setImg}
              type="file"
              name="imgUri"
            ></Form.Control>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridsize">
              <Form.Label>Tamaño *</Form.Label>
              <Form.Select onChange={onChange} name="size" value={input.size}>
                <option value="Chico" defaultValue>
                  Chico
                </option>
                <option value="Mediano">Mediano</option>
                <option value="Grande">Grande</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridVegan">
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

          <Button onClick={onSubmit} disabled={isDisabledSubmit()}>
            Confirmar
          </Button>
        </Form>
      </div>
      <hr />
    </Container>
  );
}

export default CreateOrEditFries;
