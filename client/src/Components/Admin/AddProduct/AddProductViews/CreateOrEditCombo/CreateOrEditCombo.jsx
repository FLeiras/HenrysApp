import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {
  getBeverages,
  getBurgers,
  getFries,
} from '../../../../../Redux/actions/actions';
import {
  alertCustom,
  createProduct,
  updateProduct,
} from '../../../../requests';
import { postImageToCloudinary, setImgProductErr } from '../../../../methods';
import './CreateOrEditCombo.css';
import '../FormsGlobal.css';

function CreateOrEditCombo({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const burgers = useSelector((state) => state.burgers);
  const fries = useSelector((state) => state.fries);
  const beverages = useSelector((state) => state.beverages);

  const [edit] = useState(isEdit());
  const [isRestore, setRestore] = useState(false);
  const [input, setInput] = useState({
    id: '',
    name: '',
    price: '',
    fries: [],
    beverage: [],
    burger: [],
    imgUri: '',
    isVeggie: false,
  });

  useEffect(() => {
    dispatch(getBurgers('burgers'));
    dispatch(getFries('fries'));
    dispatch(getBeverages('beverages'));

    if (edit && !isRestore) {
      setInput({
        id: data.id,
        name: data.name,
        price: data.price,
        fries: data.fries,
        beverage: data.beverage,
        // beverage: data.beverage.map((e) => e.id),
        burger: data.burger,
        imgUri: data.imgUri ? data.imgUri : '',
        isVeggie: data.isVeggie,
      });
      // setSelectBeverage(data.beverage.map((el) => el));
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
      burger: [],
      fries: [],
      beverage: [],
    });
  };

  function isEdit() {
    return data && Object.keys(data).length;
  }

  function handleSelectBeverages(e) {
    if (e.target.value === '0') return;

    const value = JSON.parse(e.target.value);
    if (!input.beverage.map((e) => e.id).includes(value.id)) {
      setInput({
        ...input,
        beverage: [...input.beverage, value],
      });
    }
  }

  function handleDeleteBeverages(e) {
    setInput({
      ...input,
      beverage: input.beverage.filter((c) => c.id !== e.target.value),
    });
  }

  function handleSelectFries(e) {
    if (e.target.value === '0') return;

    const value = JSON.parse(e.target.value);
    if (!input.fries.map((e) => e.id).includes(value.id)) {
      setInput({
        ...input,
        fries: [...input.fries, value],
      });
    }
  }

  function handleDeleteFries(e) {
    setInput({
      ...input,
      fries: input.fries.filter((c) => c.id !== e.target.value),
    });
  }

  function handleSelectBurgers(e) {
    if (e.target.value === '0') return;

    const value = JSON.parse(e.target.value);
    if (!input.burger.map((e) => e.id).includes(value.id)) {
      setInput({
        ...input,
        burger: [...input.burger, value],
      });
    }
  }

  function handleDeleteBurgers(e) {
    setInput({
      ...input,
      burger: input.burger.filter((c) => c.id !== e.target.value),
    });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      try {
        await updateProduct('combos', {
          ...input,
          beverage: input.beverage.map((e) => e.id),
          fries: input.fries.map((e) => e.id),
          burger: input.burger.map((e) => e.id),
        });
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
        await createProduct('combos', {
          ...input,
          beverage: input.beverage.map((e) => e.id),
          fries: input.fries.map((e) => e.id),
          burger: input.burger.map((e) => e.id),
        });
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
      <h2>{edit ? 'Editar Combo' : 'Crear Combo'}</h2>
      <hr />
      <div className="editCombo__container">
        <img
          src={input.imgUri}
          onError={(e) => setImgProductErr(e)}
          alt="img not"
          className="editOrCreate__img"
        ></img>

        <Form className="editOrCreate__form">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="comboName">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                placeholder="Nombre *"
                onChange={onChange}
                type="text"
                name="name"
                value={input.name}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="comboPrice">
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

          <Form.Group className="mb-3" controlId="uploadImgCombo">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              placeholder="Url de la imagen"
              onChange={setImg}
              type="file"
              name="imgUri"
            ></Form.Control>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group
              onChange={(e) => handleSelectBeverages(e)}
              as={Col}
              controlId="beverages"
            >
              <Form.Label>Bebidas</Form.Label>
              <Form.Select>
                <option value="0" defaultValue>
                  Seleccionar
                </option>
                {beverages &&
                  beverages.map((bev) => (
                    <option value={JSON.stringify(bev)} key={bev.id}>
                      {bev.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <div className="editOrCreate__mainContainer">
                {input.beverage?.map((e) => (
                  <div key={e.id} className="editOrCreate__productCard">
                    <p>{e.name}</p>
                    <button
                      className="editOrCreate__btnDelete"
                      value={e.id}
                      type="button"
                      onClick={(e) => handleDeleteBeverages(e)}
                    >
                      &#10008;
                    </button>
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="burger"
              multiple
              onChange={(e) => handleSelectBurgers(e)}
            >
              <Form.Label>Hamburguesas</Form.Label>
              <Form.Select>
                <option value="0" defaultValue>
                  Seleccionar
                </option>
                {burgers &&
                  burgers.map((bur) => (
                    <option value={JSON.stringify(bur)} key={bur.id}>
                      {bur.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <div className="editOrCreate__mainContainer">
                {input.burger?.map((e) => (
                  <div key={e.id} className="editOrCreate__productCard">
                    <p>{e.name}</p>
                    <button
                      className="editOrCreate__btnDelete"
                      value={e.id}
                      type="button"
                      onClick={(e) => handleDeleteBurgers(e)}
                    >
                      &#10008;
                    </button>
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="fries"
              onChange={(e) => handleSelectFries(e)}
            >
              <Form.Label>Papas</Form.Label>
              <Form.Select>
                <option value="0" defaultValue>
                  Seleccionar
                </option>
                {fries &&
                  fries.map((bur) => (
                    <option value={JSON.stringify(bur)} key={bur.id}>
                      {bur.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <div className="editOrCreate__mainContainer">
                {input.fries?.map((e) => (
                  <div key={e.id} className="editOrCreate__productCard">
                    <p>{e.name}</p>
                    <button
                      className="editOrCreate__btnDelete"
                      value={e.id}
                      type="button"
                      onClick={(e) => handleDeleteFries(e)}
                    >
                      &#10008;
                    </button>
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group as={Col} controlId="isVeggie">
              <Form.Label>Apto para vegetarianos *</Form.Label>
              <Form.Select
                name="isVeggie"
                value={input.isVeggie}
                onChange={setVeggie}
              >
                <option value={false} defaultValue>
                  No
                </option>
                <option value={true}>Si</option>
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

export default CreateOrEditCombo;
