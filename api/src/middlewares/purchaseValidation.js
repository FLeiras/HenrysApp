const productRepository = require("../repositories/product.repositories");
const ingredientRepository = require("../repositories/ingredient.repositories");
const burgerBaseRepository = require("../repositories/burgerBase.repositories");
const couponRepository = require("../repositories/coupon.repositories");

async function validateDbProduct(res, id, quantity) {
  const product = await productRepository.getById(id);

  if (!product) {
    return {
      error: `No se encontro ningun producto con este id: ${id}`,
      status: 404,
    };
  }

  return {
    id,
    title: product.name,
    currency_id: process.env.CURRENCY_ID,
    picture_url: product.imgUri,
    quantity,
    unit_price: product.price,
  };
}

async function validateCreatedBurger(
  id,
  quantity,
  ingredients,
  title,
  picture_url
) {
  if (ingredients.length > 6)
    return {
      status: 400,
      error: "La hamburguesa personalizada debe tener menos de 6 ingredientes",
    };

  const burgerBase = await burgerBaseRepository.getFirst();
  if (!burgerBase || burgerBase < 1)
    return { error: "No se encontro ninguna BurgerBase", status: 404 };

  let totalPrice = burgerBase.price;

  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = await ingredientRepository.getById(ingredients[i].id);
    if (!ingredient) {
      return {
        error: `No se encontro ningun ingrediente con este id: ${id}`,
        status: 404,
      };
    }

    totalPrice += ingredient.price * ingredients[i].cantidad;
  }

  return {
    id,
    title,
    currency_id: process.env.CURRENCY_ID,
    picture_url,
    quantity,
    unit_price: totalPrice,
  };
}

async function validateCoupons(coupons) {
  try {
    let couponsValidated = [];
    for (let i = 0; i < coupons.length; i++) {
      const coupon = await couponRepository.getById(coupons[i]);

      if (!coupon) {
        return {
          error: `No se encontro ningun cupon con este id: ${coupons[i]}`,
          status: 404,
        };
      }

      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
      const yyyy = today.getFullYear();
      const todayDate = new Date(`${yyyy}-${mm}-${dd}`);
      const expDate = new Date(coupon.expirationDate);

      if (todayDate > expDate) {
        return {
          error: "El cupon esta vencido.",
          status: 400,
        };
      }

      const usedCoupon = couponsValidated.find((f) => f.code === coupon.code);

      if (usedCoupon) {
        return {
          error: "Cupon duplicado",
          status: 400,
        };
      }

      couponsValidated.push(coupon);
    }

    return couponsValidated;
  } catch (error) {
    next(error);
  }
}

async function validatePurchase(req, res, next) {
  try {
    const items = [];
    const { cart, coupons } = req.body;

    if (!cart || cart.length < 1) {
      return res.status(400).json({ error: "El carrito esta vacio" });
    }

    for (let i = 0; i < cart.length; i++) {
      const { id, ingredients, createdAt, cantidad, name, imgUri } = cart[i];

      if (createdAt) {
        const validated = await validateDbProduct(res, id, cantidad);
        if (!validated.error) {
          items.push(validated);
        } else {
          return res.status(validated.status).json({ error: validated.error });
        }
      } else {
        const validated = await validateCreatedBurger(
          id,
          cantidad,
          ingredients,
          name,
          imgUri
        );
        if (!validated.error) {
          items.push(validated);
        } else {
          return res.status(validated.status).json({ error: validated.error });
        }
      }
    }

    let couponsValidated = [];

    if (coupons && coupons.length > 0) {
      couponsValidated = await validateCoupons(coupons);
    }

    if (couponsValidated.error) {
      return res
        .status(couponsValidated.status)
        .json({ error: couponsValidated.error });
    }

    req.body.items = items;
    req.body.coupons = couponsValidated;
    next();
  } catch (error) {
    next(error);
  }
}

async function applyCupons(req, res, next) {
  try {
    const { coupons, items } = req.body;

    items.map((item) => {
      for (let i = 0; i < coupons.length; i++) {
        if (coupons[i].productsId.includes(item.id)) {
          console.log(item.id);
          item.unit_price =
            (item.unit_price / 100) * (100 - coupons[i].discountPorcentage);
          item.title = `${item.title} (${coupons[i].discountPorcentage}%OFF)`;
        }
      }
    });
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { validatePurchase, applyCupons };
