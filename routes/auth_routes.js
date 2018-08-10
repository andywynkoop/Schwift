require('../models/User');
const { hash, check, random, login, logout, getSession } = require('../util/auth_utils.js');

module.exports = (app, mongoose) => {
  const User = mongoose.model('users');
 
  // create a new user and log them in
  app.post('/api/users', async (req, res) => {
    const { user } = req.body;
    // replace password with password digest
    const passwordDigest = await hash(user.password);
    user.passwordDigest = passwordDigest;
    delete user.password;
    const token = await random();
    user.sessionToken = token;
    await login(req, res, user);
    user.workspaceIds = [];
    const newUser = new User(user);
    newUser.save().then((err, dbresult) => {
      if (err) res.send(err);
      res.send(dbresult);
    });
  });

  //get current user
  app.get('/api/session', (req, res) => {
    const { sessionToken } = getSession(req);
    User.findOne({ sessionToken: sessionToken }, (err, user) => {
      if (err) res.send(err);
      res.send(user);
    });
  });
  
  //log in
  app.post('/api/session', async (req, res) => {
    const { email, password } = req.body.user;
    User.findOne({ email: email }, async (err, userResult) => {
      if (err) res.send(err);
      if (!userResult) return res.send("No User Found");
      const isPassword = await check(password, userResult.passwordDigest);
      if (isPassword) {
        userResult.sessionToken = await random();
        await new User(userResult).save();
        const user = await login(req, res, userResult);
        res.send(user);
      } else {
        res.send('Invalid password')
      }
    });
  });

  //log out
  app.delete('/api/session', async (req, res) => {
    await logout(req, res);

    res.send('logout');
  });
}