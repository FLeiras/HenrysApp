import { Fragment, React, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getIngredients } from '../../../../../Redux/actions/actions';
import {
  alertCustom,
  createProduct,
  updateProduct,
} from '../../../../requests';
import { postImageToCloudinary, setImgProductErr } from '../../../../methods';

import './CreateOrEditBurger.css';
import '../FormsGlobal.css';

function CreateOrEditBurger({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ingredientes = useSelector((state) => state.ingredients);
  const [edit] = useState(isEdit());
  const [isRestore, setRestore] = useState(false);
  const [selectIngredient, setSelectIngredient] = useState([]);
  const [input, setInput] = useState({
    id: '',
    name: '',
    price: '',
    ingredient: [],
    imgUri: '',
    isVeggie: false,
  });

  useEffect(() => {
    dispatch(getIngredients());
    if (edit && !isRestore) {
      setInput({
        id: data.id,
        name: data.name,
        price: data.price,
        ingredient: data.ingredient.map((el) => el.id),
        imgUri: data.imgUri ? data.imgUri : '',
        isVeggie: data.isVeggie,
      });
      setSelectIngredient(data.ingredient.map((el) => el));
      setRestore(true);
    }
  }, [dispatch, edit, isRestore, data]);

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

  const setVeggie = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      ingredient: [],
    });
    setSelectIngredient([]);
  };

  function ingredientsNotSelect() {
    let notSelect = ingredientes.map((e) => e);

    if (input.isVeggie === 'true') {
      notSelect = notSelect.filter((f) => f.isVeggie === true);
    }

    if (!selectIngredient || !selectIngredient.length) {
      return notSelect;
    }

    for (let j = 0; j < notSelect.length; j++) {
      const all = notSelect[j];

      for (let i = 0; i < selectIngredient.length; i++) {
        const add = selectIngredient[i];

        if (all === add) {
          notSelect.splice(j, 1);
          j--;
        }
      }
    }
    return notSelect;
  }

  function isEdit() {
    return data && Object.keys(data).length;
  }

  function handleSelect(e) {
    const ingredientFind = ingredientes.find(
      (el) => el.id === Number(e.target.value)
    );
    if (ingredientFind) {
      setInput({
        ...input,
        ingredient: [...input.ingredient, e.target.value],
      });
      setSelectIngredient([...selectIngredient, ingredientFind]);
    }
  }

  function handleDelete(e) {
    const ingredientFind = ingredientes.find(
      (el) => el.name === e.target.value
    );
    setInput({
      ...input,
      ingredient: input.ingredient.filter((c) => c !== ingredientFind.id),
    });
    setSelectIngredient([
      ...selectIngredient.filter((c) => c.name !== e.target.value),
    ]);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      try {
        await updateProduct('burgers', input);
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
        await createProduct('burgers', input);
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
      <h2>{edit ? 'Editar Hamburguesa' : 'Crear Hamburguesa'}</h2>
      <hr />
      <div className="editBurger__container">
        <img
          src={input.imgUri}
          onError={(e) => setImgProductErr(e)}
          alt="img not"
          className="editOrCreate__img"
        ></img>

        <Form className="editOrCreate__form">
          <hr />
          <Row className="mb-3">
            <Form.Group as={Col} controlId="burgerName">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                placeholder="Nombre *"
                onChange={onChange}
                type="text"
                value={input.name}
                name="name"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="burgerPrice">
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
          <Row>
            <Form.Group className="mb-3" controlId="uploadImgBurger">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                placeholder="Url de la imagen"
                onChange={setImg}
                type="file"
                name="imgUri"
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="isVeggie">
              <Form.Label>Veggie *</Form.Label>
              <Form.Select
                onChange={setVeggie}
                value={input.isVeggie}
                name="isVeggie"
              >
                <option value={false} defaultValue>
                  No
                </option>
                <option value={true}>Si</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              onChange={(e) => handleSelect(e)}
              as={Col}
              controlId="burgerIngredients"
            >
              <Form.Label>Ingredientes</Form.Label>
              <Form.Select defaultValue="seleccionar">
                <option>Seleccionar ingredientes</option>
                {ingredientsNotSelect().length > 0 &&
                  ingredientsNotSelect()?.map((el) => (
                    <Fragment key={el.id}>
                      {!selectIngredient.find((s) => s.id === el.id) && (
                        <option value={el.id}>{el.name}</option>
                      )}
                    </Fragment>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <div className="editOrCreate__mainContainer">
                {selectIngredient &&
                  selectIngredient.map((e) => (
                    <div key={e.id} className="editOrCreate__productCard">
                      <p>{e.name}</p>
                      <Button
                        className="editOrCreate__btnDelete"
                        value={e.name}
                        type="button"
                        onClick={(e) => handleDelete(e)}
                      >
                        &#10008;
                      </Button>
                    </div>
                  ))}
              </div>
            </Form.Group>
          </Row>

          <Button
            onClick={onSubmit}
            variant="primary"
            type="submit"
            disabled={isDisabledSubmit()}
          >
            Confirmar
          </Button>
        </Form>
      </div>
      <hr />
    </Container>
  );
}

export default CreateOrEditBurger;
