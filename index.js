const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3210;
const path = require('path');
const root = path.resolve(__dirname, 'dist', 'root.html');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./db');
const route = require('./routes');
app.use(express.static('dist'));

app.use(cookieParser())
app.use(bodyParser.json())

io.on('connection', socket => {
  socket.emit('connection', "connection successful");
});

db().then(mongoose => {
  // yield to the router
  route(app, mongoose, io);

  // return app for all non-api routes
  app.get('*', (_req, res) => {
    res.sendFile(root);
  });

  server.listen(process.env.port || port, () => {
    console.log(`listening on ${port}`);
  });
});
