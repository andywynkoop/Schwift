// PLAIN OLD MONGO DB CONFIG

// const { MongoClient } = require('mongodb');
// const { mongoUsername, mongoPassword } = require('../config/mongodb');
// const MONGO_URI = `mongodb://${mongoUsername}:${mongoPassword}@ds113942.mlab.com:13942/junefs`;

// const connect = () => 
//   MongoClient.connect(MONGO_URI)
//     .then(client => client.db('junefs'));

// module.exports = connect;

const mongoose = require('mongoose');
const { mongoUsername, mongoPassword } = require('../config/mongodb');
const LOCAL_URI = 'mongodb://localhost:27017/schwift';
const MONGO_URI = `mongodb://${mongoUsername}:${mongoPassword}@ds113942.mlab.com:13942/junefs`;

const connect = () => 
  mongoose.connect(LOCAL_URI, { useNewUrlParser: true });

module.exports = connect;