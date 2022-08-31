const { Burger } = require("../models");
const { Op } = require("sequelize");
const { isUUIDV4 } = require("../utils/utils");

async function create(data) {
  const burger = await Burger.create(data);
  await burger.addIngredient(data.ingredients);
  const withRelation = await getById(burger.id);

  return withRelation;
}

async function getById(id) {

  if(!isUUIDV4(id)) return;

  const burger = await Burger.findByPk(id, {
    paranoid: false,
    include: [
      {
        association: "ingredient",
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  return burger;
}

async function getAll() {
  const burgers = await Burger.findAll({paranoid: false}, {order: [
        ['name', 'ASC'],
    ]});
  return burgers;
}

async function getByQuery(queries) {
  if (!queries) {
    return await getAll();
  }

  const burgers = await Burger.findAll({ 
        where: queries,
        paranoid: false, 
        order: [ ['name', 'ASC'] ]
    });
    
    return burgers;
}

async function getByName(name) {
  const burger = await Burger.findOne({
    where: { name: { [Op.iLike]: `${name}` } },
  });
  return burger;
}

async function destroy(id) {
  const deletedBurger = await Burger.destroy({
    where: {
      id: id,
    },
  });

  return deletedBurger;
}

async function restore(id) {
  const restoredBurger = await Burger.restore({
    where: {
      id: id,
    },
  });

  return restoredBurger;
}

async function update(data) {
    
  // actualizo la data
  await Burger.update(data, { where: { id: data.id } });
  // lo busco
  const updateado = await Burger.findByPk(data.id);
        
  // lo relaciono
  await updateado.setIngredient(data.ingredient ? data.ingredient : []); // set, que pise todo y lo reemplace
  const withRelation = await Burger.findByPk(updateado.id, {
    paranoid: false,
    include: [
      {
        association: "ingredient",
        attributes: ["name"],
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
