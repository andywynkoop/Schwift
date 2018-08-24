require('../models/User');
const { hash, check, random, login, logout, getSession } = require('../util/auth_utils.js');

module.exports = (app, mongoose) => {
  const User = mongoose.model('User');
 
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
    user.workspaces = [];
    const userModel = new User(user);
    userModel.save().then((err, userDB) => {
      if (err) res.status(422).send(err);
      res.send(userDB);
    });
  });

  //get current user
  app.get('/api/session', (req, res) => {
    const { sessionToken } = getSession(req);
    User.findOne({ sessionToken: sessionToken }, (err, userDB) => {
      if (err) res.status(422).send(err);
      res.send(userDB);
    });
  });
  
  //log in
  app.post('/api/session', async (req, res) => {
    const { email, password } = req.body.user;
    User.findOne({ email: email }, async (err, userDB) => {
      if (err) res.status(422).send(err);
      if (!userDB) return res.status(422).send("No User Found");
      const isPassword = await check(password, userDB.passwordDigest);
      if (isPassword) {
        userDB.sessionToken = await random();
        await new User(userDB).save();
        const currentUser = await login(req, res, userDB);
        res.send(currentUser);
      } else {
        res.status(422).send('Invalid password');
      }
    });
  });

  //log out
  app.delete('/api/session', async (req, res) => {
    await logout(req, res);
    res.send('logout');
  });
}