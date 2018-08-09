const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = require('./Workspace');

const workspaceSchema = new Schema({
  name: String,
  members: [UserSchema]
});

mongoose.model('workspaces', workspaceSchema);

module.exports = workspaceSchema;