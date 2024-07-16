const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();

let client;

// MondoDB connection address
const url = process.env.DB_URL;

async function dbConnect() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    client = await MongoClient.connect(url);


    return client.db('todo-app');
  } catch (e) {
    console.error(e);
  }
}

dbConnect()

module.exports = dbConnect;
