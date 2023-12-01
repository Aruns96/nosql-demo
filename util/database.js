const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (callback)=>{
  MongoClient.connect('mongodb+srv://arun509577:Arun1234@cluster0.nb6jckt.mongodb.net/?retryWrites=true&w=majority')
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
