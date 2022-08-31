const { Beverage } = require("../models");
const { Op } = require("sequelize");
const { isUUIDV4 } = require("../utils/utils");

async function create(data) {
  const beverage = await Beverage.create(data);
  return beverage;
}

async function getById(id) {

  if(!isUUIDV4(id)) return;

  const beverage = await Beverage.findByPk(id, {paranoid: false});
  return beverage;
}

async function getAll() {
  const beverages = await Beverage.findAll({paranoid: false}, {order: [
    ['name', 'ASC'],
    ]});
  return beverages;
}

async function getByQuery(queries) {
  if (!queries) {
    return await getAll();
  }

  const beverages = await Beverage.findAll({ 
        where: queries,
        paranoid: false, 
        order: [ ['name', 'ASC'] ]
    });
    
    return beverages;
}

async function getByName(name) {
  const beverage = await Beverage.findOne({
    where: { name: { [Op.iLike]: `${name}` } },
  });
  return beverage;
}

async function destroy(id) {
  return await Beverage.destroy({ where: { id: id } });
}

async function restore(id) {
  const beverage = await Beverage.restore({
    where: {
      id: id,
    },
  });
  return beverage;
}

async function update(id, data) {
  return await Beverage.update(data, { where: { id: id } });
}

module.exports = {
  create,
  getById,
  getAll,
  getByQuery,
  getByName,
  destroy,
  restore,
  update,
};
