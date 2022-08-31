const beverageRepository = require("../repositories/beverage.repositories");

async function create(req, res, next) {
  try {
    const data = req.body;
    const newBeverage = await beverageRepository.create(data);
    return res.status(201).json(newBeverage);
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { id } = req.params;
    const beverage = await beverageRepository.destroy(id);
    beverage
      ? res.status(200).json({ message: "Producto desactivado correctamente!" })
      : res
          .status(404)
          .json({ error: `No hay ningún producto para ser desactivado con id ${id}!` });
  } catch (error) {
    next(error);
  }
}

async function restore(req, res, next) {
  try {
    const { id } = req.params;

    const beverage = await beverageRepository.restore(id);
    beverage
      ? res.status(200).json({ message: "Producto activado correctamente!" })
      : res
          .status(404)
          .json({ error: `No hay ningún producto para ser activado con id ${id}!` });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const id = req.body.id;
    const data = req.body;
    const beverage = await beverageRepository.update(id, data);
    res.status(201).json({ message: "Producto actualizado!" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  destroy,
  restore,
  update,
};
