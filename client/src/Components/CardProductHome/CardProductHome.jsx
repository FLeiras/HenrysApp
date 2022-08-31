import { React } from 'react';
import hamburguesasMini from '../../Assets/Images/Hamburguesas/hamburguesa-clasica.png';
import combitos from '../../Assets/Images/combos/Combo1.png';
import bebidas from '../../Assets/Images/bebidas/bebidas-transparentes-copia.png';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../Assets/Images/logo-henrys300px.png';
import './CardProductHome.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../Redux/actions/actions';

function CardProductHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBurgers = () => {
    dispatch(setCategory('burgers'));
    navigate('/menu');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleCombos = () => {
    dispatch(setCategory('combos'));
    navigate('/menu');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleBeverages = () => {
    dispatch(setCategory('beverages'));
    navigate('/menu');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleAll = () => {
    dispatch(setCategory(''));
    navigate('/menu');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };
  return (
    <Container>
      <Row className="sectionproduct mb-5 mt-5">
        <Col lg={3}>
          <div className="cardProductHome">
            <div className="cardProductHome__img__container">
              <img
                src={hamburguesasMini}
                alt="imagen"
                className="cardProductHome__img img-fluid"
              />
            </div>
            <h1 className="cardProductsHome__tittle">Hamburguesas</h1>
            <div className="cardProductHome--overlay">
              <div className="cardProuctHome__Text">
                <h1>Hamburguesas</h1>
                <p className="hidden hide-text">
                  Nuestras hamburguesas estan hechas con carne premium de
                  novillo fresco y en pan de papa.
                </p>
                <Button
                  onClick={handleBurgers}
                  className="productCard__content__box__h2"
                >
                  Ver mas
                </Button>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={3}>
          <div className="cardProductHome">
            <div className="cardProductHome__img__container">
              <img
                src={combitos}
                alt="imagen"
                className="cardProductHome__img img-fluid"
              />
            </div>
            <h1 className="cardProductsHome__tittle">Combos</h1>
            <div className="cardProductHome--overlay">
              <div className="cardProuctHome__Text">
                <h1>Combos</h1>
                <p>
                  Las mejores delicias en combos que se adaptan a tu estilo de
                  vida.
                </p>
                <Button
                  onClick={handleCombos}
                  className="productCard__content__box__h2"
                >
                  Ver mas
                </Button>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={3}>
          <div className="cardProductHome">
            <div className="cardProductHome__img__container">
              <img
                src={bebidas}
                alt="imagen"
                className="cardProductHome__img img-fluid"
              />
            </div>
            <h1 className="cardProductsHome__tittle">Bebidas</h1>
            <div className="cardProductHome--overlay">
              <div className="cardProuctHome__Text">
                <h1 className="cardProductsHome__tittle">Bebidas</h1>
                <p>
                  Bebidas a la temperatura perfecta para acompañar tu
                  hamburguesa
                </p>

                <Button
                  onClick={handleBeverages}
                  className="productCard__content__box__h2"
                >
                  Ver mas
                </Button>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={3}>
          <div className="cardProductHome">
            <div className="cardProductHome__img__container__todos">
              <img
                src={logo}
                alt="imagen"
                className="cardProductHome__img img-fluid"
              />
            </div>
            <h1 className="cardProductsHome__tittle">Todo</h1>
            <div className="cardProductHome--overlay">
              <div className="cardProuctHome__Text">
                <h1 className="cardProductsHome__tittle">Todo</h1>
                <p className="hidden hide-text">
                  Conocé todo lo que Henry´s tiene para vos.
                </p>

                <Button
                  onClick={handleAll}
                  className="productCard__content__box__h2"
                >
                  Ver mas
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CardProductHome;
