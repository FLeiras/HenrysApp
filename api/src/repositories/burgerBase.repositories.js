const { BurgerBase } = require("../models");
const { isUUIDV4 } = require("../utils/utils");

async function create(data) {
  const burgerBase = await BurgerBase.create(data);
  return burgerBase;
}

async function getAll() {
  const burgersBase = await BurgerBase.findAll(
    { paranoid: false },
    { order: [["name", "ASC"]] }
  );
  return burgersBase;
}

async function getByQuery(queries) {
  if (!queries) {
    return await getAll();
  }

  const burgersBase = await BurgerBase.findAll({
    where: queries,
    paranoid: false,
    order: [["name", "ASC"]],
  });
  return burgersBase;
}

async function getById(id) {
  if (!isUUIDV4(id)) return;

  const burgerBase = await BurgerBase.findByPk(id, { paranoid: false });
  return burgerBase;
}

async function getFirst() {
  const burgersBase = await getAll();
  return burgersBase[0];
}

async function update(data) {
  const update = await BurgerBase.update(data, { where: { id: data.id } });
  return update;
}

module.exports = {
  create,
  getAll,
  getById,
  getByQuery,
  getFirst,
  update,
};
