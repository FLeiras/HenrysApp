import axios from "axios";
import Swal from "sweetalert2";

  export async function createProduct(product, data) {

    if(!product || 
        !product === "burgers" || 
        !product === "fries" || 
        !product === "combos" || 
        !product === "beverages" || 
        !product === "burgerBase" ||
        !product === "ingredients"
    ){
        throw new Error("Error al crear el producto!")
    }

    data = {...data, id: undefined};

    await axios.post(`${product}`, data, {
        headers: {
        'auth-token': JSON.parse(localStorage.getItem('user')).token,
        },
    });
}

export async function updateProduct(product, data) {

    if(!product || 
        !product === "burgers" || 
        !product === "fries" || 
        !product === "combos" || 
        !product === "beverages" ||
        !product === "ingredients"
    ){
        throw new Error("Error al modificar el producto!")
    }

    await axios.put(`${product}`, data, {
        headers: {
        'auth-token': JSON.parse(localStorage.getItem('user')).token,
        },
    });
}

  export function alertCustom(title, text, imageUrl){
    Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title,
        text,
        imageUrl,
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
}

export async function setStateOrder(id, data){
    await axios.put(`/orders/${id}`, data, {
        headers: {
        'auth-token': JSON.parse(localStorage.getItem('user')).token,
        },
    });
}
