const { hash, check, random, login, logout, getSession } = require('../util/auth_utils.js');

module.exports = (app, db) => {

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
    db.collection('users').insert(user, (err, user) => {
      if (err) res.send(err);
      res.send(user.ops[0]);
    });
  });

  //get current user
  app.get('/api/session', (req, res) => {
    const { sessionToken } = getSession(req);
    db.collection('users')
      .find({ sessionToken: sessionToken })
      .toArray((err, result) => {
        if (err) res.send(err);
        res.send(result[0]);
      });
  });
  
  //log in
  app.post('/api/session', async (req, res) => {
    const { email, password } = req.body.user;
    db.collection('users')
      .find({ email: email })
      .toArray(async (err, result) => {
        userResult = result[0];
        if (!userResult) return res.send("No User Found");
        const isPassword = await check(password, userResult.passwordDigest);
        if (isPassword) {
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