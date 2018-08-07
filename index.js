const express = require('express');
const app = express();
const port = 3210;
const path = require('path');
const root = path.resolve(__dirname, 'dist', 'root.html');
const cookieParser = require('cookie-parser');
const db = require('./db');
const route = require('./routes');
app.use(express.static('dist'));

app.use(cookieParser())
// yield to the router
route(app);
// return app for all non-api routes
app.get('*', (req, res) => {
  res.sendFile(root);
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});