require('../models/Channel');

module.exports = (app, mongoose) => {
  const Channel = mongoose.model('Channel');
  const Workspace = mongoose.model('Workspace');
  const User = mongoose.model('User');

  //create a channel for a workspace
  app.post('/api/channels', (req, res) => {
    const { userId, workspaceId, channel } = req.body;
    channelModel = new Channel(channel);
    Workspace.findOne({ _id: workspaceId }).exec(async (err, workspaceDB) => {
      if (err) res.send(err);
      channelModel.workspace = workspaceDB._id;
      let channelDB = await channelModel.save();
      workspaceDB.channels.push(channelDB._id);
      workspaceDB = await workspaceDB.save();
      User.findOne({ _id: userId }).exec(async (err, userDB) => {
        if (err) res.send(err);
        userDB.channels.push(channelDB._id);
        channelDB.members.push(userDB._id);
        await userDB.save();
        channelDB = await channelDB.save();
        res.send(channelDB);
      });
    });
  });
  //fetch all channels by workspace id
  app.get('/api/channels', (req, res) => {
    console.log('================================================')
    const { workspaceId, userId } = req.params;

    Channel.find({ workspace: workspaceId }).where({ members: userId }).exec((err, channelsDB) => {
      if (err) res.send(err);
      res.send(channelsDB);
    });
  });
}