const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  body: String,
  createdAt: Date,
  channel: { type: mongoose.Schema.ObjectId, ref: 'Channel' },
  author: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

mongoose.model('Message', messageSchema);

module.exports = messageSchema;
