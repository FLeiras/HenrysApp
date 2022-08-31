import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import ActivateImg from '../../../Assets/Images/combos/combo2-dobles.png';
import { Link, useParams } from 'react-router-dom';
import { FcAdvertising, FcHighPriority, FcOk } from 'react-icons/fc';

import './UserActivateAccount.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function UserActivateAccount() {
  const [mount, setMount] = useState(false);
  const [isSuccess, setSucess] = useState(-1);

  const { id } = useParams();
  useEffect(() => {
    if (!mount) {
      setMount(true);
    } else {
      const fetchData = async (id) => {
        try {
          await axios.put(`/activateAccount/${id}`);
          setSucess(1);
        } catch (error) {
            let imgUrl = "https://res.cloudinary.com/henrysburgers/image/upload/v1659301854/error-henrys_zoxhtl.png";
            const msg = error.response.data.error;
            let title = "Oops..."
            
            if(typeof(msg) === "string" && msg === "La cuenta ya fue activada!"){
                imgUrl = "https://res.cloudinary.com/henrysburgers/image/upload/v1659800373/warning-henrys_saeddx.png";
                title = "";
                setSucess(0);
            }else{
                setSucess(-1);
            }

            Swal.fire({
                customClass: {
                  confirmButton: 'confirmBtnSwal',
                },
                title,
                text: typeof(msg) !== "string" ? "Error al activar la cuenta!" : msg,
                imageUrl: imgUrl,
                imageWidth: 170,
                imageHeight: 170,
                imageAlt: 'Logo henrys',
              });
        }
      };
      fetchData(id);
    }
  }, [mount, id]);

  return (
    <>
      <Container>
        <div className="userActivate__container">
          <div>
            <h1>{isSuccess !== 0 ? "¡Bienvenido!" : ""}</h1>
            <h2 className="userActivate__subtittle"> 
              {isSuccess === 1 && <FcOk />}
              {isSuccess === 0 && <FcAdvertising />}
              {isSuccess === -1 && <FcHighPriority />}               
              {isSuccess === 1 && " Cuenta activada con éxito"}
              {isSuccess === 0 && " La cuenta ya fue activada!"}
              {isSuccess === -1 && " Error al activar la cuenta!"}
            </h2>
            <p>{isSuccess === 1 ? "Empezá a disfrutar de las más deliciosas hamburguesas" : ""}</p> 
            <Button as={Link} to="/">
                {isSuccess === 1 ? "Iniciar la experiencia" : "Volver al menú"}
            </Button>
          </div>
          <img
            src={ActivateImg}
            alt="foto de un combo de dos hamburguesas"
            className="img-fluid userActivate__img"
          />
        </div>
      </Container>
    </>
  );
}

export default UserActivateAccount;
