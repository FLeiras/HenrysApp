import axios from 'axios';

export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_BURGERS = 'GET_BURGERS';
export const GET_COMBOS = 'GET_COMBOS';
export const GET_BEVERAGES = 'GET_BEVERAGES';
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_FRIES = 'GET_FRIES';
export const GET_VEGGIE = 'GET_VEGGIE';
export const SET_CATEGORY = 'SET_CATEGORY';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const ADD_TO_CART = 'ADD_TO_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const CLEAR_STATE = 'CLEAR_STATE';
export const DELETE_ONE_PRODUCT_CART = 'DELETE_ONE_PRODUCT_CART';
export const DELETE_PRODUCT_CART = 'DELETE_PRODUCT_CART';
export const LOCAL_STORAGE = 'LOCAL_STORAGE';
export const GET_BURGER_BASE = 'GET_BURGER_BASE';
export const ADD_FAVORITES = 'ADD_FAVORITES';
export const REMOVE_FAVORITES = 'REMOVE_FAVORITES';
export const ADD_TO_LOCAL = 'ADD_TO_LOCAL';
export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
export const ADD_BURGER_CUSTOM_TO_CART = 'ADD_BURGER_CUSTOM_TO_CART';
export const POST_MP = 'POST_MP';
export const GET_FAVORITES = 'GET_FAVORITES';
export const GET_REVIEWS = 'GET_REVIEWS';
export const GET_COUPONS = 'GET_COUPONS';
export const GET_USERS = 'GET_USERS';
export const GET_PURCHASE = 'GET_PURCHASE';
export const POST_PURCHASE = 'POST_PURCHASE';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const RESTORE_PRODUCT = 'RESTORE_PRODUCT';
export const SET_ORDERS = 'SET_ORDERS';

export function getUser(token, query = '/') {
  return async function (dispatch) {
    try {
      const json = await axios('/users/admin' + query, {
        headers: {
          'auth-token': token,
        },
      });
      return dispatch({
        type: GET_USERS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getProduct(
  category = '',
  order = '',
  name = '',
  isVeggie = '',
  isDeleted = '',
  addBase = '',
  addIngredient = ''
) {
  return async function (dispatch) {
    const json = await axios(
      `/products?category=${category}&order=${order}&name=${name}&isVeggie=${isVeggie}&isDeleted=${isDeleted}&addBase=${addBase}&addIngredient=${addIngredient}`
    );
    try {
      return dispatch({
        type: GET_PRODUCT,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setCategory(category) {
  return {
    type: SET_CATEGORY,
    payload: category,
  };
}

export function addCartProduct(id) {
  return {
    type: ADD_TO_CART,
    payload: id,
  };
}

export function clearState(payload) {
  return {
    type: CLEAR_STATE,
    payload,
  };
}

export function addCartProductCustom(burgerCustom) {
  return {
    type: ADD_BURGER_CUSTOM_TO_CART,
    payload: burgerCustom,
  };
}

export function deleteCart() {
  return {
    type: CLEAR_CART,
  };
}

export function productDelete(id) {
  return {
    type: DELETE_ONE_PRODUCT_CART,
    payload: id,
  };
}

export function allProductsDelete(id) {
  return {
    type: DELETE_PRODUCT_CART,
    payload: id,
  };
}

export function setLocalStorage(payload) {
  return {
    type: LOCAL_STORAGE,
    payload,
  };
}

export function getFavorites(userId, setLoading) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/users/favorites/${userId}`);
      dispatch({
        type: GET_FAVORITES,
        payload: response.data,
      });
      if (setLoading) return setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
}

export function addFavorites(userId, favorites, id) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/users/favorites/${userId}`, {
        favoritesList: [...favorites, id],
      });
      return dispatch({
        type: ADD_FAVORITES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function removeFavorites(userId, favorites, id) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/users/favorites/${userId}`, {
        favoritesList: [...favorites.filter((e) => e !== id)],
      });
      return dispatch({
        type: REMOVE_FAVORITES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addLocalAState(payload) {
  return {
    type: ADD_TO_LOCAL,
    payload,
  };
}

export function getIngredients() {
  return async function (dispatch) {
    const json = await axios('/ingredients');
    try {
      return dispatch({
        type: GET_INGREDIENTS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getProductById(id, setloading) {
  return async function (dispatch) {
    const json = await axios('/products/' + id);
    try {
      return dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
}

export function getBurgerBase() {
  return async function (dispatch) {
    const json = await axios(`/burgerBase`);
    try {
      return dispatch({
        type: GET_BURGER_BASE,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getFries(payload) {
  return async function (dispatch) {
    const response = await axios.get(`/products?category=${payload}`);
    try {
      return dispatch({
        type: GET_FRIES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getBurgers(payload) {
  return async function (dispatch) {
    const response = await axios.get(`/products?category=${payload}`);
    try {
      return dispatch({
        type: GET_BURGERS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getBeverages(payload) {
  return async function (dispatch) {
    const response = await axios.get(`/products?category=${payload}`);
    try {
      return dispatch({
        type: GET_BEVERAGES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCoupons() {
  return async function (dispatch) {
    try {
      const coupons = await axios('/coupons');
      dispatch({ type: GET_COUPONS, payload: coupons.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateCoupons(data) {
  return async function () {
    try {
      const res = await axios.put('/coupons', data, {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('user')).token,
        },
      });

      return res;
    } catch (error) {
      console.log(error);
    }
  };
}

export function postReview(payload, token) {
  return async function () {
    const json = await axios.post('/reviews', payload, {
      headers: {
        'auth-token': token,
      },
    });
    return json;
  };
}

export function getPurchase(id, token) {
  return async function (dispatch) {
    try {
      const purchase = await axios(`/pay/mercadopago/${id}`, {
        headers: { 'auth-token': token },
      });
      dispatch({ type: GET_PURCHASE, payload: purchase.data });
    } catch (error) {
      console.log(error);
    }
  };
}

// ACCIONES POST
export function createBurger(payload) {
  return async function () {
    const json = await axios.post('https://pending...', payload);
    return json;
  };
}

export function createCombo(payload) {
  return async function () {
    const json = await axios.post('https://pending...', payload);
    return json;
  };
}

export function createBeverage(payload) {
  return async function () {
    const json = await axios.post('https://pending...', payload);
    return json;
  };
}

export function createUser(payload) {
  return async function () {
    const json = await axios.post(`/register`, payload);
    return { json };
  };
}

export function suscriptionNewsLetterEmail(payload) {
  return async function () {
    const json = await axios.post(`/newsletter`, payload);
    return json;
  };
}

export function setLoginState(payload) {
  return async function (dispatch) {
    return dispatch({
      type: SET_LOGIN_STATE,
      payload,
    });
  };
}

export function postMP(data, token) {
  return async function (dispatch) {
    const json = await axios.post(
      '/pay/mercadopago',
      {
        cart: data,
      },
      { headers: { 'auth-token': token } }
    );
    return dispatch({
      type: POST_MP,
      payload: json.data,
    });
  };
}

export function getReviews() {
  return async function (dispatch) {
    const json = await axios.get('/reviews');
    try {
      return dispatch({
        type: 'GET_REVIEWS',
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postPurchase(purchaseId, token) {
  return async function () {
    try {
      axios.post(
        '/orders',
        {
          purchaseId,
        },
        { headers: { 'auth-token': token } }
      );
    } catch (error) {
      return error;
    }
  };
}

export function deleteProduct(id, producto) {
  return async function (dispatch) {
    try {
      await axios.delete(`/${producto}/${id}`, {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('user')).token,
        },
      });
      return dispatch({
        type: DELETE_PRODUCT,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function restoreProduct(id, producto) {
  return async function (dispatch) {
    try {
      await axios.post(
        `/${producto}/${id}`,
        {},
        {
          headers: {
            'auth-token': JSON.parse(localStorage.getItem('user')).token,
          },
        }
      );
      return dispatch({
        type: RESTORE_PRODUCT,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setOrders() {
  return async function (dispatch) {
    try {
      const orders = await axios.get('/orders', {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('user')).token,
        },
      });

      return dispatch({
        type: SET_ORDERS,
        payload: orders.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
