const authRoutes = require('./auth_routes');

module.exports = app => {
  authRoutes(app);
}