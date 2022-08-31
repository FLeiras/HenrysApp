const { Newsletter } = require("../models");

async function create(data) {
  const add = await Newsletter.create(data);
  return add;
}

async function get() {
    const find = await Newsletter.findAll();
    return find;
  }

async function getByEmail(email) {
  const find = await Newsletter.findOne({ where: { email: email } });
  return find;
}

async function getById(id) {
  const find = await Newsletter.findByPk(id);
  return find;
}

async function destroy(id) {
  const deleted = await Newsletter.destroy({
    where: {
      id: id,
    },
  });

  return deleted;
}

async function restore(id) {
  const restored = await Newsletter.restore({
    where: {
      id: id,
    },
  });

  return restored;
}

module.exports = {
  create,
  get,
  getByEmail,
  getById,
  destroy,
  restore
};
