const { validationResult } = require('express-validator');
const createError = require('http-errors');

const validationResultHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw createError(400, 'Error', { errors: errors.array() });
  }
  next();
};

module.exports = validationResultHandler;