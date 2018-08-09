const authRoutes = require('./auth_routes');
const workspaceRoutes = require('./workspace_routes');

module.exports = (app, db) => {
  authRoutes(app, db);
  workspaceRoutes(app, db);
}