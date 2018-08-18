const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  passwordDigest: String,
  sessionToken: String,
  workspaces: [{ type: mongoose.Schema.ObjectId, ref: 'Workspace' }],
  channels: [{ type: mongoose.Schema.ObjectId, ref: 'Channel' }]
});

mongoose.model('User', userSchema);

module.exports = userSchema;
