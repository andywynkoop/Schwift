const authRoutes = require('./auth_routes');
const workspaceRoutes = require('./workspace_routes');
const channelRoutes = require('./channel_routes');
const messageRoutes = require('./message_routes');

module.exports = (app, db, io) => {
  authRoutes(app, db);
  workspaceRoutes(app, db);
  channelRoutes(app, db);
  messageRoutes(app, db, io);
}