import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import MainHome from '../MainHome/MainHome';
import ProductsContainerHome from '../ProductsContainerHome/ProductsContainerHome';
import Locals from '../Locals/Locals';
import CuponContainerHome from '../CuponContainerHome/CuponContainerHome';
import { setLoginState } from '../../Redux/actions/actions';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';

function Home() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, logout } = useAuth0();

  useEffect(() => {
    
    if (isAuthenticated && user && !window.localStorage.getItem('user')) {
      const fetchData = async (payload) => {
        try {
          const res = await axios.post(`/google`, payload);
          if (res.status === 200) {
            const data = { ...res.data.user, token: res.data.data.token };
            window.localStorage.setItem('user', JSON.stringify(data));
            dispatch(setLoginState(data));
          }
        } catch (error) {
          Swal.fire({
            customClass: {
              confirmButton: 'confirmBtnSwal',
            },
            title: 'Opss...',
            text: 'Error al intentar logearse con google!',
            imageUrl:
              'https://res.cloudinary.com/henrysburgers/image/upload/v1659301854/error-henrys_zoxhtl.png',
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'Logo henrys',
          });
          if(isAuthenticated){
            setTimeout(() => logout({ returnTo: window.location.origin }), 2000);
          }
        }
      };

      fetchData({
        firstName: user.given_name,
        email: user.email,
        lastName: user.family_name,
        imgUri: user.picture,
      });
    }
  }, [dispatch, isAuthenticated, user, logout]);

  return (
    <div>
      <MainHome />
      <CuponContainerHome />
      <ProductsContainerHome />
      <Locals />
    </div>
  );
}

export default Home;
