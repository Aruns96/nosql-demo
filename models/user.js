// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });
const getDb = require("../util/database").getDb;
const mongoDb = require("mongodb");
class User{
  constructor(name,email){
    this.name = name;
    this.email = email;
  }
  save(){
    const db = getDb();
    
    
    return db.collection('users').insertOne(this)
    .then(result=>console.log(result))
    .catch(e=>console.log(e))
  }
  static findById(userId){
    const db = getDb();
    return db.collection('users').find({_id:new mongoDb.ObjectId(userId)}).next()
    .then(user=>{
      return user;
      console.log(user);
    })
    .catch(e=>console.log(e))
  }
}

module.exports = User;
