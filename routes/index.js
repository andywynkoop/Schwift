const authRoutes = require('./auth_routes');

module.exports = (app, db) => {
  authRoutes(app, db);
}