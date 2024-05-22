const express= require('express');
require('dotenv').config({ path: './config/config.env' });
const errorHandler= require('./middleware/errorHandler.js');
var cors=require('cors');

const app=express();

app.use(cors());

const PORT = process.env.PORT || 9000;
console.log(process.env.PORT);

app.use(express.json());

const userRoutes = require('./routers/userRouters.js');
app.use('/api/users',userRoutes);

const productsRoutes = require('./routers/productRouters.js');
app.use('/api/products', productsRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

