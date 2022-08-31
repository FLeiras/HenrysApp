const express = require("express");
const cookieParser = require("cookie-parser");
// const bodyParser = require('body-parser');
const morgan = require("morgan");
const routes = require("../routes");

const server = express();

server.name = "API";

// view engine setup
server.use(express.json());
// server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, auth-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// catch 404 and forward to error handler
server.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// error handler
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  //console.error("ERROR HANDLER CUSTOM: ", err);
  res.status(status).send({ message, status, error: err.errors });
});

module.exports = server;
