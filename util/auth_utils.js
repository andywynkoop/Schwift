const bcrypt = require('bcrypt');
const saltRounds = 10;

const hash = password => 
  bcrypt.hash(password,saltRounds)


const check = (password, hash) =>
  bcrypt.compare(password, hash)


module.exports = {
  hash,
  check
}