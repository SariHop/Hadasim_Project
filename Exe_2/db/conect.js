const mongoose = require('mongoose');
require('dotenv').config();

// default conction string for mongoDB
let dbConnectionString = 'mongodb://127.0.0.1/Hadasim_Project';

// check for conction string in the env file
const srv = process.env.DB_CONNECTION_STRING;
if (srv){
  dbConnectionString = srv;
}

// handle error from the Promies conecct
main().catch(err => console.log(err));

// connect mongoDB
async function main() {
  await mongoose.connect(dbConnectionString);
  console.log("db conecct")
}
