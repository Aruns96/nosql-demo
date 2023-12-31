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
  User.findById('656b0c3ba7614cef089981f7')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
  
});

 app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.MONGO).then(result=>{
  User.findOne().then(user=>{
    if(!user){
      const user = new User({
        name:'arun',
        email:'arun@email.com',
        cart:{
          items:[]
        }
      });
      user.save();
    }
  })
  
  app.listen(3000)
})
.catch(e=>console.log(e));