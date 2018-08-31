require('../models/User');
const { hash, check, random, login, logout, getSession } = require('../util/auth_utils');

module.exports = (app, mongoose) => {
  const User = mongoose.model('User');
 
  // create a new user and log them in
  app.post('/api/users', async (req, res) => {
    const { user } = req.body;
    const userDB = await User.findOne({ email: user.email }).exec();
      // someone already registered with the same email
    if (userDB) {
      res.status(422).send("email taken");
    } else {
      // replace password with password digest
      const passwordDigest = await hash(user.password);
      user.passwordDigest = passwordDigest;
      delete user.password;
      const token = await random();
      user.sessionToken = token;
      await login(req, res, user);
      user.workspaces = [];
      const userModel = new User(user);
      const userDB = await userModel.save();
      res.send(userDB);
    }
  });

  //get current user
  app.get('/api/session', async (req, res) => {
    const { sessionToken } = getSession(req);
    const userDB = await User.findOne({ sessionToken: sessionToken }).exec();
    res.send(userDB);
  });
  
  //log in
  app.post('/api/session', async (req, res) => {
    const { email, password } = req.body.user;
    const userDB = await User.findOne({ email: email }).exec();
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

  //log out
  app.delete('/api/session', async (req, res) => {
    await logout(req, res);
    res.send('logout');
  });
}