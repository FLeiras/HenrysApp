import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserFavoritesCard from '../UserFavoritesCard/UserFavoritesCard';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { getFavorites } from '../../../Redux/actions/actions';

import './UserFavorites.css';
import Loading from '../../Loading/Loading';
import Container from 'react-bootstrap/esm/Container';

function UserFavorites() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const favoritosId = useSelector((state) => state.favorites);

  useEffect(() => {
    setScrollToTop();
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      setLoading(true);
      dispatch(getFavorites(user.id, setLoading));
    }
  }, [dispatch]);

  function setScrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
  
  return (
    <Container>
      <div className="userFav__container mb-5">
        <h1 className="mt-5">Mis favoritos</h1>
        <hr />
        {favoritosId && favoritosId?.length === 0 ? (
          <>
            <div>
              <p className="emptyFav__text">
                Todavia no tenés ningún producto en favoritos, date una vuelta
                por menú, dejate tentar y guardalo si te gustó así está lo mejor
                siempre cerca.
              </p>
            </div>
            <Link to="/menu" className="mt-4">
              <Button>Ir al Menú</Button>
            </Link>
          </>
        ) : (
          favoritosId?.map((id) => (
            <UserFavoritesCard id={id} key={id} favoritosId={favoritosId} />
          ))
        )}
      </div>
    </Container>
  );
}

export default UserFavorites;
