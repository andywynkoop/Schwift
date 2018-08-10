require('../models/Workspace');

module.exports = (app, mongoose) => {
  const Workspace = mongoose.model('workspaces');
  const User = mongoose.model('users');

  //create a new workspace
  app.post('/api/workspace', (req, res) => {
    const { workspace } = req.body;
    workspace = new Workspace(workspace);
    const { err, dbworkspace } = newUser.save();
    if (err) res.send(err);
    res.send(dbworkspace);
  });

  app.get('/api/workspace/:id', (req, res) => {
    const { id } = req.query;
    Workspace.findOne({ _id: id }, (err, workspace) => {
      if (err) res.send(err);
      res.send(workspace);
    });
  });
}