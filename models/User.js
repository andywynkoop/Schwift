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
  workspaces: [{ type: mongoose.Schema.ObjectId, ref: 'Workspace' }]
});

mongoose.model('User', userSchema);

module.exports = userSchema;
