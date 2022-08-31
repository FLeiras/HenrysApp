const couponRepository = require("../repositories/coupon.repositories");

async function createCoupon(req, res, next) {
  try {
    const { coupon } = req.body;

    if (!coupon)
      return res
        .status(400)
        .json({ error: "There is no coupon to be created" });
    console.log(coupon);
    const createdCoupon = await couponRepository.createCoupon(coupon);
    return res.status(201).json(createdCoupon);
  } catch (error) {
    next(error);
  }
}

async function getAll(req, res, next) {
  try {
    const coupons = await couponRepository.getAll();

    return res.status(200).json(coupons);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const code = req.body.code;
    const data = req.body;
    const coupon = await couponRepository.update(code, data);
    res.status(201).json({ message: "Cupon actualizado" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createCoupon,
  getAll,
  update,
};
