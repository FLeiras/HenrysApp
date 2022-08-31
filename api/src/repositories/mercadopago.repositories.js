const axios = require("axios");

async function getPaymentById(id) {
  try {
    const payment = await axios.get(
      `https://api.mercadopago.com/v1/payments/${id}`,
      { headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` } }
    );
    return payment.data;
  } catch (error) {
    console.log(error);
  }
}

async function getByPreference(id) {
  const payment = await axios.get(
    `https://api.mercadopago.com/checkout/preferences/${id}`,
    { headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` } }
  );

  return payment.data;
}

module.exports = { getPaymentById, getByPreference };
