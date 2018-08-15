const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = require('./User');

const workspaceSchema = new Schema({
  name: String,
  members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  channels: [{ type: mongoose.Schema.ObjectId, ref: 'Channel' }]
});

mongoose.model('Workspace', workspaceSchema);

module.exports = workspaceSchema;