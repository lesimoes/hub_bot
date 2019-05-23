const jwt = require('jsonwebtoken');
require('dotenv').config();

const EXPIRE = process.env.TOKEN_EXPIRE;
const HASH = process.env.AUTH_HASH;

const create = async (client) => {
  return jwt.sign({ _id: client._id, alias: client.api_token }, HASH);
};

const validate = async (token) => {
  const result = await jwt.verify(token, process.env.AUTH_HASH);
  return result;
};

module.exports = {
  create,
  validate,
};
