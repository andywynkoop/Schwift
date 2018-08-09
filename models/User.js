const mongoose = require('mongoose');
const { Schema } = mongoose;
const WorkspaceSchema = require('./Workspace');

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  passwordDigest: String,
  sessionToken: String,
  workspaces: [WorkspaceSchema]
});

mongoose.model('users', userSchema);

module.exports = userSchema;