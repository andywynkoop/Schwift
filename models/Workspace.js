const mongoose = require('mongoose');
const { Schema } = mongoose;

const workspaceSchema = new Schema({
  name: String,
  purpose: String,
  members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  channels: [{ type: mongoose.Schema.ObjectId, ref: 'Channel' }]
});

mongoose.model('Workspace', workspaceSchema);

module.exports = workspaceSchema;