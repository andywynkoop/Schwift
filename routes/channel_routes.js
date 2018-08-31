require('../models/Channel');
require('../models/Message');

module.exports = (app, mongoose) => {
  const Channel = mongoose.model('Channel');
  const Workspace = mongoose.model('Workspace');
  const User = mongoose.model('User');
  const Message = mongoose.model('Message');

  // create a channel for a workspace
  app.post('/api/channels', async (req, res) => {
    const { userId, workspaceId, channel } = req.body;
    channelModel = new Channel(channel);
    const workspaceDB = await Workspace.findOne({ _id: workspaceId }).exec();
    channelModel.workspace = workspaceDB._id;
    let channelDB = await channelModel.save();
    workspaceDB.channels.push(channelDB._id);
    workspaceDB = await workspaceDB.save();
    const userDB = await User.findOne({ _id: userId }).exec();
    userDB.channels.push(channelDB._id);
    channelDB.members.push(userDB._id);
    await userDB.save();
    channelDB = await channelDB.save();
    const populatedWorkspaceDB = await Workspace.findOne({ _id: workspaceId }).populate('channels').exec();
    res.send(populatedWorkspaceDB);
  });

  // fetch a channel with its messages
  app.get('/api/channels/:channelId', async (req, res) => {
    const { channelId } = req.params;
    const channelDB = await Channel.findOne({ _id: channelId}).populate('members').populate('messages').exec()
    res.send(channelDB);
  });
}