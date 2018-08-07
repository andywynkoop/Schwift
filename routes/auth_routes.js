const { hash, check } = "../auth/";
const { session } = require('./auth_utils.js')

module.exports = app => {
  app.get('/api/users', (req, res) => {
    req.cookies.junefs = {

    }
    console.log("cookies: ", req.cookies)
  });
}