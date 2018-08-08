const { hash, check, random, login, logout, getSession } = require('../util/auth_utils.js');

module.exports = (app, db) => {

  // create a new user and log them in
  app.post('/api/users', (req, res) => {
    const { user } = req.body;
    // replace password with password digest
    hash(user.password).then(passwordDigest => {
      user.passwordDigest = passwordDigest;
      delete user.password;
      //generate session token and set on user and session
      random(token => {
        user.sessionToken = token;
        login(req, res, user, () => {
          db.collection('users').insert(user, (err, user) => {
            if (err) res.send(err);
            res.send(user.ops[0]);
          });
        });
      });
    });
  });

  //get current user
  app.get('/api/session', (req, res) => {
    const session = getSession(req);
    const { sessionToken: token } = session;
    db.collection('users').find({ sessionToken: token }).toArray((err, result) => {
      if (err) res.send(err);
      res.send(result[0]);
    });
  });
  
  //log in
  app.post('/api/session', (req, res) => {
    const { user } = req.body;
    const { email, password } = user;
    db.collection('users').find({ email: email }).toArray((err, result) => {
      userResult = result[0];
      if (!userResult) return res.send("No User Found");
      check(password, userResult.passwordDigest).then(result => {
        if (result) {
          login(req, res, userResult, user => {
            console.log(user)
            console.log('logging in')
            res.send(user);
          });
        } else {
          res.send('Invalid password')
        }
      })
      
    })
  });

  //log out
  app.delete('/api/session', (req, res) => {
    logout(req, res, () => {
      res.send("Logged out");
    });
  })
}