import React from 'react';
import Card from 'react-bootstrap/Card';
import './ReviewCard.css';

function ReviewCard({ author, description, rating }) {
  return (
    <div>
      <Card className="reviews__mainCard">
        <div className="reviews__mainCard__headerContainer">
          <Card.Header className="reviews__mainCard__title">
            <h2>
              {rating} <span>★</span>{' '}
            </h2>
          </Card.Header>
        </div>
        <Card.Body className="reviews__mainCard__body">
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <p className="divider__reviewCard">________________________</p>
        <Card.Footer
          className="reviews__mainCard__footer"
          style={{ borderRadius: '18px' }}
        >
          - {author}
        </Card.Footer>
      </Card>
    </div>
  );
}

export default ReviewCard;
