const mongoose = require('mongoose');
const { Schema } = mongoose;

const channelSchema = new Schema({
  name: String,
  purpose: String,
  workspace: { type: mongoose.Schema.ObjectId, ref: 'Workspace' },
  members: [{ type: mongoose.Schema.ObjectId, ref: 'User'}]
});

mongoose.model('Channel', channelSchema);

module.exports = channelSchema;
