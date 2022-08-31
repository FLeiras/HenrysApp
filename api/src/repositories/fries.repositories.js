const { Fries } = require("../models");
const { Op } = require("sequelize");
const { isUUIDV4 } = require("../utils/utils");

async function create(data) {
  const fries = await Fries.create(data);
  return fries;
}

async function getById(id) {

  if(!isUUIDV4(id)) return;

  const fries = await Fries.findByPk(id, {paranoid: false});
  return fries;
}

async function getAll() {
  const fries = await Fries.findAll({paranoid: false}, {order: [
    ['name', 'ASC'],
]});
  return fries;
}

async function getByQuery(queries) {
  if (!queries) {
    return await getAll();
  }

  const fries = await Fries.findAll({ 
        where: queries,
        paranoid: false, 
        order: [ ['name', 'ASC'] ]
    });
    
    return fries;
}

async function getByName(name) {
  const fries = await Fries.findOne({
    where: { name: { [Op.iLike]: `${name}` } },
  });
  return fries;
}

async function destroy(id) {
  return await Fries.destroy({
    where: {
      id: id,
    },
  });
}

async function update(id, data) {
  return await Fries.update(data, { where: { id: id } });
}

async function restore(id) {
  const fries = await Fries.restore({
    where: {
      id: id,
    },
  });
  return fries;
}

module.exports = {
  create,
  getById,
  getAll,
  getByQuery,
  getByName,
  destroy,
  update,
  restore,
};
