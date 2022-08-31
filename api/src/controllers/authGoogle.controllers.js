const userRepositories = require("../repositories/user.repositories");
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    const data = req.body;
    let user = await userRepositories.getByEmail(data.email);
    if (!user) {
      user = await userRepositories.createGoogleAccount(data);
      if (!user)
        return res.status(400).json({ error: "Error al crear la cuenta!" });
    }

    const token = jwt.sign(
      {
        name: user.firstName,
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

module.exports = { auth };
