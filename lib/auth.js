const jwt = require('jsonwebtoken');

const EXPIRE = process.env.TOKEN_EXPIRE;
const HASH = process.env.AUTH_HASH;

const create = async (client) => {
  return jwt.sign({ _id: client._id }, HASH, {
    expiresIn: EXPIRE,
  });
};

const validate = async (token) => {
  const result = await jwt.verify(token, process.env.AUTH_HASH);
  return result;
};

module.exports = {
  create,
  validate,
}
