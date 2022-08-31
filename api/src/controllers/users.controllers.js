const userRepositories = require("../repositories/user.repositories");
const productRepositories = require("../repositories/product.repositories");
const bcrypt = require("bcrypt");
const { transporter } = require("../config/emailTransporter");

async function getAllSecure(req, res, next) {
  try {
    const all = await userRepositories.getAllSecure();

    if (!all) {
      return res
        .status(404)
        .json("No se pudo enviar el newsletter, no hay usuarios cargados!");
    }

    return res.status(200).json(all);
  } catch (error) {
    next(error);
  }
}

async function getAllAdmin(req, res, next) {
  try {
    let { pag, rol, confirmed, active } = req.query;
    pag = parseInt(pag, 10) || 1;
    rol = rol || "";
    confirmed = confirmed || "";
    active = active || "";
    const users = await userRepositories.getAllAdmin(
      pag,
      rol,
      confirmed,
      active
    );

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

/* las cuentas que crea el admin */
async function create(req, res, next) {
  try {
    const data = req.body;
    const findUser = await userRepositories.getByEmail(data.email);

    if (findUser) {
      return res
        .status(400)
        .json({ error: "Ya existe un usuario con este correo electrónico!" });
    }

    data.password = await bcrypt.hash(data.password, 10);
    const newUser = await userRepositories.create(data);

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

/* registro */
async function register(req, res, next) {
  try {
    const data = req.body;
    const findUser = await userRepositories.getByEmail(data.email);

    if (findUser)
      return res
        .status(400)
        .json({ error: "Ya existe un usuario con este correo electrónico!" });

    data.password = await bcrypt.hash(data.password, 10);
    const newUser = await userRepositories.create(data);

    console.log(process.env.ACTIVATE_ACCOUNT);

    await transporter.sendMail({
      from: '"Confirm account" <henrysBurger2022@gmail.com',
      to: data.email,
      subject: "Confirm account",
      html: `
        <html lang="en-US">
        <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>Henry's Burger</title>
          <meta name="description" content="Henry's Burger" />
          <style type="text/css">
            a:hover {
              text-decoration: underline !important;
            }
          </style>
        </head>
      
        <body
          marginheight="0"
          topmargin="0"
          marginwidth="0"
          style="margin: 0px; background-color: #f2f3f8"
          leftmargin="0"
        >
          <!-- 100% body table -->
          <table
            cellspacing="0"
            border="0"
            cellpadding="0"
            width="100%"
            bgcolor="#f2f3f8"
            style="
              @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
              font-family: 'Open Sans', sans-serif;
            "
          >
            <tr>
              <td>
                <table
                  style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
                  width="100%"
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tr>
                    <td style="height: 80px">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="height: 20px">&nbsp;</td>
                  </tr>
                  <tr>
                    <td>
                      <table
                        width="95%"
                        border="0"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        style="
                          max-width: 670px;
                          background: #fff;
                          border-radius: 3px;
                          text-align: center;
                          -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                          -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                          box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                        "
                      >
                        <tr>
                          <td style="height: 40px">&nbsp;</td>
                        </tr>
                        <tr>
                          <td style="text-align: center">
                            <a
                              href="https://henrys-app.vercel.app/"
                              title="logo"
                              target="_blank"
                            >
                              <img
                                width="60"
                                src="https://i.postimg.cc/Y0T86N5w/logo-henrys300px.png"
                                title="logo"
                                alt="logo"
                              />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 0 35px">
                            <h1
                              style="
                                color: #1e1e2d;
                                font-weight: 500;
                                margin: 0;
                                font-size: 32px;
                                font-family: 'Rubik', sans-serif;
                              "
                            >
                              Ya casi terminamos...
                            </h1>
                            <p
                              style="
                                font-size: 15px;
                                color: #455056;
                                margin: 8px 0 0;
                                line-height: 24px;
                              "
                            >
                              Tu cuenta fué creada correctamente, <br /><strong
                                >Actívala haciendo click en el siguiente botón</strong
                              >:
                            </p>
      
                            <a
                              href="${process.env.ACTIVATE_ACCOUNT}/activateAcount/${newUser.id}"
                              style="
                                background: #ffbe33;
                                text-decoration: none !important;
                                display: inline-block;
                                font-weight: 500;
                                margin-top: 24px;
                                color: #fff;
                                text-transform: uppercase;
                                font-size: 14px;
                                padding: 10px 24px;
                                display: inline-block;
                                border-radius: 50px;
                              "
                              >Activar cuenta</a
                            >
                          </td>
                        </tr>
                        <tr>
                          <td style="height: 40px">&nbsp;</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="height: 20px">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="text-align: center">
                      <p
                        style="
                          font-size: 14px;
                          color: rgba(69, 80, 86, 0.7411764705882353);
                          line-height: 18px;
                          margin: 0 0 0;
                        "
                      >
                        &copy; <strong>Henry's Burger</strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="height: 80px">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!--/100% body table-->
        </body>
      </html>`,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { id } = req.params;
    const deletedUser = await userRepositories.destroy(id);

    if (deletedUser)
      return res
        .status(200)
        .json({ message: "Usuario desactivado correctamente!" });

    return res.status(404).json({
      error: `No hay ningún usuario para ser desactivado con id ${id}!`,
    });
  } catch (error) {
    next(error);
  }
}

async function restore(req, res, next) {
  try {
    const { id } = req.params;
    const restoredUser = await userRepositories.restore(id);

    if (restoredUser)
      return res
        .status(200)
        .json({ message: "Usuario activado corretamente!" });

    return res
      .status(404)
      .json({ error: `No hay ningún usuario para ser activado con id ${id}!` });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const data = req.body;
    const updatedUser = await userRepositories.update(data);
    return res.status(200).json({ message: "Info de usuario actualizada!" });
  } catch (error) {
    next(error);
  }
}

async function updateProfileData(req, res, next) {
  const { firstName, lastName, password, imgUri } = req.body;
  try {
    let data = {};
    data.id = req.params.id;
    if (firstName) {
      data.firstName = firstName;
    }
    if (lastName) {
      data.lastName = lastName;
    }
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }
    if (imgUri) {
      data.imgUri = imgUri;
    }
    const updatedUser = await userRepositories.update(data);
    return res.status(200).json({ message: "Info de usuario actualizada!" });
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const user = await userRepositories.getById(req.params.id);
    return user
      ? res.status(200).json(user)
      : res.status(400).json({ message: "Usuario no encontrado!" });
  } catch (error) {
    next(error);
  }
}

async function setFavorites(req, res, next) {
  try {
    let favorites = [];
    for (id of req.body.favoritesList) {
      const product = await productRepositories.getById(id);
      if (product && !favorites.includes(id)) favorites.push(id);
    }
    const user = await userRepositories.setFavorites(favorites, req.params.id);
    res.status(201).json(user.favoritesList);
  } catch (error) {
    next(error);
  }
}

async function getFavoritesByUserId(req, res, next) {
  try {
    const favorites = (await userRepositories.getById(req.params.id))
      .favoritesList;
    res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllSecure,
  create,
  register,
  destroy,
  restore,
  update,
  updateProfileData,
  getById,
  setFavorites,
  getFavoritesByUserId,
  getAllAdmin,
};
