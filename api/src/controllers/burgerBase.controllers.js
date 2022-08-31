const burgerBaseRepository = require("../repositories/burgerBase.repositories");

async function create(req, res, next) {
    try {
      const data = req.body;
      const newBurger = await burgerBaseRepository.create(data);
      return res.status(201).json(newBurger);
    } catch (error) {
      next(error);
    }
  }

async function get(req, res, next) {
    try {
      const all = await burgerBaseRepository.getAll();

      if(!all || !all.length){
        return res.status(404).json({error: "No se han encontrado hamburguesas base!"});
      }

      return res.status(200).json(all);
    } catch (error) {
      next(error);
    }
}

async function getFirst(req, res, next) {
    try {
      const one = await burgerBaseRepository.getFirst();

      if(!one){
        return res.status(404).json({error: "No se han encontrado la hamburguesa base!"});
      }

      return res.status(200).json(one);
    } catch (error) {
      next(error);
    }
}

async function update(req, res, next) {
  try {
    const data = req.body;
    const updatedBurge = await burgerBaseRepository.update(data);
    return res.status(200).json({ message: "Hamburguesa base actualizada!" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  get,
  getFirst,
  update,
};
