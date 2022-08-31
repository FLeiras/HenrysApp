const userRepository = require("../repositories/user.repositories");

async function activateAccount(req, res, next) {
  try {
    const user = await userRepository.getById(req.params.id);
    if (!user || user.isGoogle) return res.status(404).json({ error: "Error al activar, usuario inválido!" });
    if (user.isConfirmed) return res.status(400).json({ error: "La cuenta ya fue activada!" });

    await userRepository.activateAccount(user.id);
    return res.status(200).json("La cuenta ha sido activada!");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  activateAccount,
};
