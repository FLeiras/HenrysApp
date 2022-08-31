const burgerRepository = require("../repositories/burger.repositories");

async function create(req, res, next) {
  try {
    const data = req.body;
    const newBurger = await burgerRepository.create(data);
    return res.status(201).json(newBurger);
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { id } = req.params;
    const deletedBurger = await burgerRepository.destroy(id);

    if (deletedBurger)
      return res.status(200).json({ message: "Producto desactivado correctamente!" });

    return res
      .status(404)
      .json({ error: `No hay ningún producto para ser desactivado con id ${id}!` });
  } catch (error) {
    next(error);
  }
}

async function restore(req, res, next) {
  try {
    const { id } = req.params;
    const restoredBurger = await burgerRepository.restore(id);

    if (restoredBurger)
      return res.status(200).json({ message: "Producto activado correctamente!" });

    return res
      .status(404)
      .json({ error: `No hay ningún producto para ser activado con id ${id}!` });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const data = req.body;
    const updatedBurger = await burgerRepository.update(data);
    return res.status(200).json({ message: "Producto actualizado!" });
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
