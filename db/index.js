const { MongoClient } = require('mongodb');
const { mongoUsername, mongoPassword } = require('../config/mongodb');
const MONGO_URI = `mongodb://${mongoUsername}:${mongoPassword}@ds113942.mlab.com:13942/junefs`;

const connect = () => 
  MongoClient.connect(MONGO_URI)
    .then(client => client.db('junefs'));

module.exports = connect;