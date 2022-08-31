import Swal from 'sweetalert2';

/* payload es el id, array de products, y el array de carrito */
export const addItem = (id, allProducts, cart) => {
  /* busco en "todos" (que en realidad es lo filtrado)"
    /* sino */
  /* busco en el carrito */
  const newProduct =
    allProducts.find((p) => p.id === id) || cart.find((p) => p.id === id);

  if (!newProduct) {
    return [...cart];
  }

  const productExist = cart.find((item) => item.id === newProduct.id);

  if (!productExist) {
    return [...cart, { ...newProduct, cantidad: 1 }];
  } else {
    return cart.map((e) =>
      e.id === newProduct.id ? { ...e, cantidad: e.cantidad + 1 } : e
    );
  }
};

export const deleteItem = (cart, id) => {
  const itemToDelete = cart.find((item) => item.id === id);
  return itemToDelete.cantidad > 1
    ? cart.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
      )
    : cart.filter((item) => item.id !== id);
};

export const deleteAllItem = (cart, id) => {
  return cart.filter((item) => item.id !== id);
};

export const addItemCustom = (cart, burgerCustom) => {
  if (!burgerCustom) {
    return [...cart];
  }

  return [...cart, burgerCustom];
};

export const addFav = (id, allProducts, favorites) => {
  const newFavorite = allProducts.find((p) => p.id === id);

  if (!favorites.map((item) => item.id).includes(newFavorite.id)) {
    return [...favorites, newFavorite];
  }

  if (favorites.map((item) => item.id).includes(id)) {
    Swal.fire({
      customClass: {
        confirmButton: 'confirmBtnSwal',
      },
      title: 'Oops...',
      text: `${newFavorite.name} ya existe en tus favoritos`,
      imageUrl:
        'https://res.cloudinary.com/henrysburgers/image/upload/v1659301854/error-henrys_zoxhtl.png',
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: 'Logo henrys',
    });
  }

  return favorites;
};

export const subsFav = (id, favorites) => {
  return favorites.filter((item) => item.id !== id);
};
