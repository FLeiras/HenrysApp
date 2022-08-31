import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import slider1 from '../../Assets/Images/carrousel/henrys.png';
import slider2 from '../../Assets/Images/carrousel/saborautentico.png';
import slider3 from '../../Assets/Images/carrousel/buenosIngredientes.png';
import './MainHome.css';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img className="d-block w-100" src={slider1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slider2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slider3} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
