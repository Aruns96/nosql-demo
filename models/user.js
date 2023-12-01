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
  constructor(name,email,cart,id){
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
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
  addToCart(product){
     const cartProductIndex = this.cart.items.findIndex(i=>{
      return i.productId.toString() === product._id.toString()
     })
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items]
     if(cartProductIndex >=0){
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
     }else{
      updatedCartItems.push({productId:new mongoDb.ObjectId(product._id),quantity:newQuantity})
     }
    const updatedCart = {
      items:updatedCartItems
    }
    const db = getDb();
    return db.collection('users').updateOne({_id:new mongoDb.ObjectId(this._id)},{$set:{cart:updatedCart}})
  }




}

module.exports = User;
