import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import {
  postImageToCloudinary,
  setImgIngredientErr,
} from '../../../../methods';
import './CreateOrEditIngredients.css';
import '../FormsGlobal.css';
import {
  alertCustom,
  createProduct,
  updateProduct,
} from '../../../../requests';

function CreateOrEditIngredients({ data }) {
  const navigate = useNavigate();
  const [edit] = useState(isEdit());
  const [isRestore, setRestore] = useState(false);
  const [input, setInput] = useState({
    id: '',
    name: '',
    price: '',
    isRepeat: true,
    imgUri: '',
    isVeggie: true,
  });

  useEffect(() => {
    if (edit && !isRestore) {
      setInput({
        id: data.id,
        name: data.name,
        price: data.price,
        isRepeat: data.isRepeat,
        imgUri: data.imgUri ? data.imgUri : '',
        isVeggie: data.isVeggie,
      });
      setRestore(true);
    }
  }, [edit, isRestore, data]);

  function isDisabledSubmit() {
    return !input.name || !input.price;
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
        await updateProduct('ingredients', input);
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
        await createProduct('ingredients', input);
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
      <h2>{edit ? 'Editar Ingrediente' : 'Crear Ingrediente'}</h2>
      <hr />
      <div className="editIngredients__container">
        <img
          src={input.imgUri}
          onError={(e) => setImgIngredientErr(e)}
          alt="img not"
          className="editOrCreate__img"
        ></img>
        <Form className="editOrCreate__form">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                placeholder="Nombre *"
                type="text"
                name="name"
                value={input.name}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPrice">
              <Form.Label>Precio *</Form.Label>
              <Form.Control
                placeholder="Precio *"
                type="number"
                name="price"
                value={input.price}
                onChange={onChange}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="uploadImgBurger">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                placeholder="Url de la imagen"
                type="file"
                name="imgUri"
                onChange={setImg}
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridsize">
              <Form.Label>¿Se puede repetir? *</Form.Label>
              <Form.Select
                onChange={onChange}
                name="isRepeat"
                value={input.isRepeat}
              >
                <option value={true} defaultValue>
                  Si
                </option>
                <option value={false}>No</option>
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

export default CreateOrEditIngredients;
