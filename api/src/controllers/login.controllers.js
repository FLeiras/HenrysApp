const userRepositories = require("../repositories/user.repositories");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res, next) {
  try {
    const user = await userRepositories.getByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({ error: "Credenciales inválidas!" });
    }

    if (!user.isConfirmed)
      return res.status(400).json({ error: "La cuenta no esta activada!" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({ error: "Credenciales inválidas!" });
    }

    const token = jwt.sign(
      {
        name: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user.id,
      },
      process.env.TOKEN_SECRET
    );

    user.password = undefined;

    res.header("auth-token", token).json({
      error: null,
      user: user,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { login };
