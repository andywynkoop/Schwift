require('../models/Workspace');

module.exports = (app, mongoose) => {
  const Workspace = mongoose.model('Workspace');
  const User = mongoose.model('User');

  //create a new workspace (with currentUser)
  app.post('/api/workspaces', async (req, res) => {
    const { workspace, user } = req.body;
    const workspaceModel = new Workspace(workspace);
    const userDB = User.findOne({ _id: user._id }).exec();
    workspaceModel.members.push(userDB._id);
    const workspaceDB = await workspaceModel.save();
    const userModel = new User(userDB);
    userModel.workspaces.push(workspaceDB._id);
    await userModel.save();
    res.send(workspaceDB);
  });

  //check if a workspace exists by name
  app.get('/api/workspaceExists', async (req, res) => {
    const { name } = req.query;
    const workspaces = await Workspace.find({ name: name }).exec();
    const workspaceExists = (workspaces.length !== 0);
    let foundWorkspaceId;
    if (workspaceExists) foundWorkspaceId = workspaces[0]._id;
    res.send({ workspaceExists, foundWorkspaceId });
  });

  //fetch all workspaces for current user (_id passed as query string)
  app.get('/api/workspaces', async (req, res) => {
    const { userId } = req.query;
    const userDB = await User.findOne({ _id: userId }).populate('workspaces').exec();
    res.send(userDB);
  });

  //fetch a single workspace by _id
  app.get('/api/workspace/:workspaceId', async (req, res) => {
    const { workspaceId } = req.params;
    const workspaceDB = await Workspace.findOne({ _id: workspaceId }).populate('channels').exec();
    res.send(workspaceDB);
  });

  //join a user to workspace
  app.patch('/api/workspace/:workspaceId', async (req, res) => {
    const { workspaceId } = req.params;
    const { user } = req.body;
    const workspaceDB = await Workspace.findOne({ _id: workspaceId }).exec();
    workspaceDB.members.push(user._id);
    workspaceDB = await workspaceDB.save();
    const userDB = await User.findOne({ _id: user._id }).exec();
    userDB.workspaces.push(workspaceDB._id);
    userDB = await userDB.save();
    res.send(workspaceDB);
  });
}