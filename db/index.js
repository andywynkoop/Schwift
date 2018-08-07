const { MongoClient } = require('mongodb');
const { mongoUsername, mongoPassword } = require('../config/mongodb');
const MONGO_URI = `mong
odb://${mongoUsername}:${mongoPassword}@ds113942.mlab.com:13942/junefs`;

module.exports = () => MongoClient.connect(MONGO_URI);