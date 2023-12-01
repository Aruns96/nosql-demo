

const getDb = require("../util/database").getDb;
const mongoDb = require("mongodb");

class Product{
  constructor(title,price,description,imageUrl,id,userId){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id= id ? new mongoDb.ObjectId(id): null;
    this.userId = userId;
  }
  save(){
    const db = getDb();
    let dbOp;
    console.log("id",this._id)
    if(this._id){
        dbOp =db.collection('products').updateOne({_id:this._id},{$set:this})
    }else {
          dbOp =db.collection('products').insertOne(this)
    }
    return  dbOp
    .then(result=>console.log("saved product",result))
    .catch(e=>console.log(e))

  }
  static fetchAll(){
    const db = getDb();
    return db.collection('products').find().toArray()
    .then(products=>{
      return products;
      console.log(products)
    })
    .catch(e=>console.log(e))
  }
  
  static findById(prodId){
    const db = getDb();
    return db.collection('products').find({_id:new mongoDb.ObjectId(prodId)}).next()
    .then(product=>{
      return product;
      console.log(product);
    })
    .catch(e=>console.log(e))
  }
  
  static destroy(prodId){
    const db = getDb();
    return db.collection('products').deleteOne({_id:new mongoDb.ObjectId(prodId)})
    .then(product=>{
      console.log("deleted");
      
    })
    .catch(e=>console.log(e))
  }


}



module.exports = Product;
