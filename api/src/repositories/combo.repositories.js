const { Combo } = require("../models");
const { Op } = require("sequelize");
const { isUUIDV4 } = require("../utils/utils");

async function create(data) {
  const combo = await Combo.create(data);
  await combo.addBurger(data.burgers);
  await combo.addBeverage(data.beverages);
  await combo.addFries(data.fries);
  const withRelation = await getById(combo.id);

  return withRelation;
}

async function getById(id) {

  if(!isUUIDV4(id)) return;

  const combo = await Combo.findByPk(id, {
    paranoid: false,
    include: [
      {
        association: "burger",
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
      {
        association: "beverage",
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
      {
        association: "fries",
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  return combo;
}

async function getAll() {
  const combos = await Combo.findAll({paranoid: false}, {order: [
    ['name', 'ASC'],
    ]});
  return combos;
}

async function getByQuery(queries) {
  if (!queries) {
    return await getAll();
  }

  const combos = await Combo.findAll({ 
        where: queries,
        paranoid: false, 
        order: [ ['name', 'ASC'] ]
    });
    
    return combos;
}

async function getByName(name) {
  const combo = await Combo.findOne({
    where: { name: { [Op.iLike]: `${name}` } },
  });
  return combo;
}

async function destroy(id) {
  const deletedCombo = await Combo.destroy({
    where: {
      id: id,
    },
  });

  return deletedCombo;
}

async function restore(id) {
  const restoredCombo = await Combo.restore({
    where: {
      id: id,
    },
  });

  return restoredCombo;
}

async function update(data) {

  // actualizo la data
  await Combo.update(data, { where: { id: data.id } });
  // lo busco
  const updateado = await Combo.findByPk(data.id);
  console.log(updateado.__proto__)
        
  // lo relaciono
  await updateado.setBurger(data.burger ? data.burger : []); // set, que pise todo y lo reemplace
  await updateado.setBeverage(data.beverage ? data.beverage : []); // set, que pise todo y lo reemplace
  await updateado.setFries(data.fries ? data.fries : []); // set, que pise todo y lo reemplace
  const withRelation = await Combo.findByPk(updateado.id, {
    paranoid: false,
    include: [
      {
        association: "burger",
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
      {
        association: "beverage",
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
      {
        association: "fries",
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  return withRelation;
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
