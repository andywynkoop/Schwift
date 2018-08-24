module.exports = (app, mongoose, io) => {
  const Message = mongoose.model('Message');
  const Channel = mongoose.model('Channel');

  app.post('/api/messages', async (req, res) => {
    const { message } = req.body;

    const messageModel = new Message(message);
    messageModel.createdAt = Date.now();
    const messageDB = await messageModel.save();
    Channel.findOne({ _id: message.channel }).exec(async (err, channelDB) => {
      if (err) res.status(422).send(err);
      channelDB.messages.push(messageDB._id);
      //consider removing later - add user to channel automatically when they send a message
      channelDB.members.push(message.author);
      channelDB = await channelDB.save();
      io.sockets.emit('newMessage', messageDB);
      res.send(messageDB);
    });
  });
}