import React from 'react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import './CardCuponHome.css';

function CardCupponHome({ code, title, imgUri, discountPorcentage, expired }) {
  function copyCode() {
    navigator.clipboard.writeText(code);
  }

  function openSwal() {
    Swal.fire({
      customClass: {
        confirmButton: 'confirmBtnSwal',
      },
      title: 'Cupón de descuento',
      text: 'Copiado al portapapeles con éxito!',
      imageUrl:
        'https://res.cloudinary.com/henrysburgers/image/upload/v1659301858/success-henrys_nlrgo0.png',
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: 'Logo henrys',
    });
  }

  function handle() {
    if (expired) return;
    copyCode();
    openSwal();
  }

  return (
    <section className={expired ? 'couponsHome__disabled' : ''}>
      <div className="cardCuponHome__cupon">
        <div className="cardCuponHome__containerImg">
          <img
            className="cardCuponHome__img img-fluid"
            src={
              imgUri ||
              'https://assets.stickpng.com/images/5a4613eed099a2ad03f9c996.png'
            }
            alt="cupon de hamburguesa"
          />
        </div>
        <div className="cardCuponHome__text">
          <h2>{title}</h2>
          <p>{discountPorcentage + '% OFF'}</p>
          <Button
            onClick={handle}
            variant="primary"
            className={
              expired
                ? 'cupponCardHome__cupponButton disCursor'
                : 'cupponCardHome__cupponButton'
            }
          >
            {code}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CardCupponHome;
