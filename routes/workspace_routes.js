require('../models/Workspace');

module.exports = (app, db) => {

  //create a new workspace
  app.post('/api/workspace', (req, res) => {
    const { workspace } = req.body;
    db.collection('workspace').insert(workspace, (err, workspace) => {
      if(err) res.send(err);
      res.send(workspace);
    });
  });

  app.get('/api/workspace/:id', (req, res) => {
    const { id } = req.query;
    db.collection('workspace')
      .find({ _id: id })
      .toArray((err, res) => {
        const workspace = res[0];

      })
  });
}