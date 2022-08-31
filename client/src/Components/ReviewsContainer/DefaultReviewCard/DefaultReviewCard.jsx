import React from 'react';
import Card from 'react-bootstrap/Card';
import './DefaultReviewcard.css';

function DefaultReviewCard() {
  return (
    <div>
      <Card className="defaultreviews__mainCardAlternative">
        <div className="defaultreviews__mainCard__headerContainer">
          <Card.Header className="defaultreviews__mainCard__title">
            <h2>
              5 <span>★</span>{' '}
            </h2>
          </Card.Header>
        </div>
        <Card.Body className="defaultreviews__mainCard__body">
          <Card.Text>
            Excelente servicio y productos!!! La comida ríquisima, la página es
            muy sencilla y expeditiva en su uso. Volvería a pedir. Excelente
            servicio y productos!!.
          </Card.Text>
        </Card.Body>
        <p className="divider__reviewCard">________________________</p>
        <Card.Footer
          className="defaultreviews__mainCard__footer"
          style={{ borderRadius: '18px' }}
        >
          - Washington Gutierrez
        </Card.Footer>
      </Card>
    </div>
  );
}

export default DefaultReviewCard;
