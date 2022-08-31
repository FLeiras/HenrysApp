const friesRepository = require("../repositories/fries.repositories");

async function create(req, res, next) {
  try {
    const data = req.body;
    const newFries = await friesRepository.create(data);
    return res.status(201).json(newFries);
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { id } = req.params;
    const fries = await friesRepository.destroy(id);
    fries
      ? res.status(200).json({ message: "Producto desactivado correctamente!" })
      : res
          .status(404)
          .json({ error: `No hay ningún producto para ser desactivado con id ${id}!` });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const id = req.body.id;
    const data = req.body;
    const fries = await friesRepository.update(id, data);
    res.status(201).json({ message: "Producto actualizado!" });
  } catch (error) {
    next(error);
  }
}

async function restore(req, res, next) {
  try {
    const { id } = req.params;

    const fries = await friesRepository.restore(id);
    fries
      ? res.status(200).json({ message: "Producto activado correctamente!" })
      : res
          .status(404)
          .json({ error: `No hay ningún producto para ser activado con id ${id}!` });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  destroy,
  update,
  restore,
};
