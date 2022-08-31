import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../Redux/actions/actions';
import Carousel from 'react-bootstrap/Carousel';
import ReviewCard from './ReviewCard/ReviewCard';
import DefaultReviewCard from './DefaultReviewCard/DefaultReviewCard';
import CarouselItem from 'react-bootstrap/esm/CarouselItem';
import Container from 'react-bootstrap/esm/Container';

import './ReviewsContainer.css';

function ReviewsContainer() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  return (
    <Container className="mt-5 mb-5 reviews__container">
      <h2>Los clientes andan diciendo...</h2>
      <hr />
      <Carousel variant="dark" activeIndex={index} onSelect={handleSelect}>
        {allReviews.length > 0 ? (
          allReviews.map((e) => {
            return (
              <CarouselItem key={e.id}>
                <ReviewCard
                  rating={e.rating}
                  description={e.description}
                  author={e.author}
                />
              </CarouselItem>
            );
          })
        ) : (
          <DefaultReviewCard></DefaultReviewCard>
        )}
      </Carousel>
    </Container>
  );
}

export default ReviewsContainer;
