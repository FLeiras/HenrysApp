const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_DIALECT } =
  process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false,
    define: {
      timestamps: false,
      underscored: true,
    },
  },
  production: {
    use_env_variable: "DATABASE_URL",
    logging: false,
    dialect: DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    define: {
      timestamps: false,
      underscored: true,
    },
  },
};
