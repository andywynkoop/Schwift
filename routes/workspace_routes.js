require('../models/Workspace');

module.exports = (app, mongoose) => {
  const Workspace = mongoose.model('Workspace');
  const User = mongoose.model('User');

  //create a new workspace (with currentUser)
  app.post('/api/workspaces', (req, res) => {
    const { workspace, user } = req.body;
    const workspaceModel = new Workspace(workspace);
    User.findOne({ _id: user._id }, async (err, userDB) => {
      if (err) res.send(err);
      workspaceModel.members.push(userDB._id);
      const workspaceDB = await workspaceModel.save();
      if (err) res.send(err);
      const userModel = new User(userDB);
      userModel.workspaces.push(workspaceDB._id);
      await userModel.save();
      res.send(workspaceDB);
    });
  });

  //check if a workspace exists by name
  app.get('/api/workspaceExists', (req, res) => {
    const { name } = req.query;
    Workspace.find({ name: name })
      .exec((err, workspaces) => {
        if (err) res.send(err);
        const workspaceExists = (workspaces.length !== 0);
        let foundWorkspaceId;
        if (workspaceExists) foundWorkspaceId = workspaces[0]._id;
        res.send({ workspaceExists, foundWorkspaceId });
      });
  });

  //fetch all workspaces for current user (_id passed as query string)
  app.get('/api/workspaces', (req, res) => {
    const { userId } = req.query;
    User.findOne({ _id: userId })
      .populate('workspaces')
      .exec((err, userDB) => {
        if (err) res.send(err);
        res.send(userDB);
      });
  });

  //fetch a single workspace by _id
  app.get('/api/workspace/:workspaceId', (req, res) => {
    const { workspaceId } = req.params;
    Workspace.findOne({ _id: workspaceId }).exec((err, workspaceDB) => {
      if (err) res.send(err);
      res.send(workspaceDB);
    });
  });

  //join a user to workspace
  app.patch('/api/workspace/:workspaceId', (req, res) => {
    const { workspaceId } = req.params;
    const { user } = req.body;
    Workspace.findOne({ _id: workspaceId }).exec(async (err, workspaceDB) => {
      if (err) res.send(err);
      workspaceDB.members.push(user._id);
      workspaceDB = await workspaceDB.save();
      User.findOne({ _id: user._id }).exec(async (err, userDB) => {
        if (err) res.send(err);
        userDB.workspaces.push(workspaceDB._id);
        userDB = await userDB.save();
        res.send(workspaceDB);
      });
    });
  });
}