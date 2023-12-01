const mongodb = require("mongodb");
const dotenv = require("dotenv")
dotenv.config();
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (callback)=>{
  MongoClient.connect(process.env.MONGO)
  .then(client=>{
    console.log("conncected");
    _db = client.db();
    callback();
  })
  .catch(e=>{
    console.log(e);
    throw e;
  })
}

const getDb = ()=>{
  if(_db){
    return _db;
  }
  throw 'NO database found'
}

module.exports = {
  mongoConnect,
  getDb
}
  ;
