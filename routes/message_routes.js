module.exports = (app, mongoose) => {
  const Message = mongoose.model('Message');
  const Channel = mongoose.model('Channel');

  app.post('/api/messages', async (req, res) => {
    const { message } = req.body;

    const messageModel = new Message(message);
    messageModel.createdAt = Date.now();
    const messageDB = await messageModel.save();
    Channel.findOne({ _id: message.channel }).exec(async (err, channelDB) => {
      if (err) res.send(err);
      channelDB.messages.push(messageDB._id);
      channelDB = await channelDB.save();
      res.send(messageDB);
    });
  });
}