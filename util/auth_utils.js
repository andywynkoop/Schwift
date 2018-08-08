const bcrypt = require('bcrypt');
const saltRounds = 10;

const hash = password => 
  bcrypt.hash(password, saltRounds);


const check = (password, hash) =>
  bcrypt.compare(password, hash);

const random = next => {
  require('crypto').randomBytes(48, (err, buffer) => {
    if (err) console.log(err);
    next(buffer.toString('hex'))
  });
}

const getSession = req => {
  if (!req.cookies.junefs) return {};
  return JSON.parse(req.cookies.junefs).session;
}

const setSession = (res, newSession) => {
  res.cookie('junefs', JSON.stringify({ session: newSession }))
}

const login = (req, res, user, next) => {
  const session = getSession(req);
  session['sessionToken'] = user.sessionToken;
  setSession(res, session);
  next(user);
}

const logout = (req, res, next) => {
  const session = getSession(req);
  session['sessionToken'] = null;
  setSession(res, session);
  next();
}

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