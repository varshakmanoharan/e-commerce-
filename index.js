
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/admin_products');
const categoryRoute = require('./routes/admin_category');
var path = require('path');
const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Specify the views directory
app.set('views', path.join(__dirname, 'views'))

mongoose.connect(process.env.MONGO_DB_URL)
  .then(() => console.log("connected to mongodb"))
  .catch((error) => {
    console.log(error);
  });

// API routes
app.use(express.json());
app.use('/auth', authRoute);
app.use('/auth/', authRoute);
app.use('/user', userRoute);
app.use('/products', productRoute);
app.use('/category',categoryRoute);


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
