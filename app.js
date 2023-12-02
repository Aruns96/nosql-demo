const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // User.findById('65699d0c5bbe97f1795c13e9')
  //   .then(user => {
  //     req.user = new User(user.name,user.email,user.cart,user._id);
  //     next();
  //   })
  //   .catch(err => console.log(err));
  next()
});

 app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.MONGO).then(result=>{
  app.listen(3000)
})
.catch(e=>console.log(e));