const { Op } = require("sequelize");
const { User } = require("../models");

async function create(data) {
  const user = await User.create(data);
  return user;
}

async function getByEmail(email) {
  const user = await User.findOne({ where: { email: email } });
  return user;
}

async function getById(id) {
  const user = await User.findByPk(id, {
    include: { all: true, nested: true },
  });
  return user;
}

async function getAllSecure() {
  let user = await User.findAll();
  user = user.map((e) => {
    e.password = undefined;
    return e;
  });
  return user;
}

async function getAllAdmin(pag, rol, confirmed, active) {
  const where = {};
  if (rol) {
    where.role = {
      [Op.eq]: rol,
    };
  }

  if (confirmed === "true") {
    where.isConfirmed = {
      [Op.eq]: true,
    };
  } else if (confirmed === "false") {
    where.isConfirmed = {
      [Op.eq]: false,
    };
  }

  if (active === "true") {
    console.log(active);
    where.deletedAt = {
      [Op.is]: null,
    };
  } else if (active === "false") {
    where.deletedAt = {
      [Op.not]: null,
    };
  }

  let { count, rows } = await User.findAndCountAll({
    where,
    paranoid: false,
    // limit: 10,
    // offset: (pag - 1) * 10,
  });
  rows = rows.map((e) => {
    e.password = undefined;
    return e;
  });
  return { count, pages: Math.ceil(count / 10), pag, rows };
}

async function getById(id) {
  const user = await User.findByPk(id);
  return user;
}

async function activateAccount(id) {
  return await User.update(
    {
      isConfirmed: true,
    },
    { where: { id: id } }
  );
}

async function createGoogleAccount(data) {
  data.isConfirmed = true;
  data.isGoogle = true;
  data.password = "contraseña?";
  return await User.create(data);
}

async function updatePassword(email, newPassword) {
  return await User.update(
    { password: newPassword },
    { where: { email: email } }
  );
}

async function destroy(id) {
  const deletedUser = await User.destroy({
    where: {
      id: id,
    },
  });

  return deletedUser;
}

async function restore(id) {
  const restoredUser = await User.restore({
    where: {
      id: id,
    },
  });

  return restoredUser;
}

async function update(data) {
  const updatedUser = await User.update(data, { where: { id: data.id } });
  return updatedUser;
}

async function setFavorites(favoritesList, id) {
  const user = await User.findByPk(id);
  user.update({
    favoritesList: favoritesList,
  });
  return user;
}

module.exports = {
  create,
  getByEmail,
  getById,
  activateAccount,
  createGoogleAccount,
  updatePassword,
  destroy,
  restore,
  update,
  getAllSecure,
  getById,
  setFavorites,
  getAllAdmin,
};
