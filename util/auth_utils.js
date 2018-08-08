const bcrypt = require('bcrypt');
const saltRounds = 10;

const hash = password => 
  bcrypt.hash(password, saltRounds);


const check = (password, hash) =>
  bcrypt.compare(password, hash);

const random = () => new Promise((resolve, _reject) => {
  require('crypto').randomBytes(48, (err, buffer) => {
    if (err) console.log(err);
    resolve(buffer.toString('hex'))
  });
});

const getSession = req => {
  if (!req.cookies.junefs) return {};
  return JSON.parse(req.cookies.junefs).session;
}

const setSession = (res, newSession) => {
  res.cookie('junefs', JSON.stringify({ session: newSession }))
}

const login = (req, res, user) => new Promise((resolve, _reject) => {
  const session = getSession(req);
  session['sessionToken'] = user.sessionToken;
  setSession(res, session);
  resolve(user);
});

// const logout = (req, res, next) => {
//   const session = getSession(req);
//   session['sessionToken'] = null;
//   setSession(res, session);
//   next();
// }

const logout = (req, res) => new Promise((resolve, _reject) => {
  const session = getSession(req);
  session['sessionToken'] = null;
  setSession(res, session);
  resolve();
});

const loggedIn = (req, _res, user) => {
  return getSession(req)['sessionToken'] === user.sessionToken;
}

module.exports = {
  hash,
  check,
  random,
  getSession,
  login,
  logout,
  loggedIn
}