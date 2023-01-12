const { application } = require('express');
const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/products', require('./routes/productRoutes'));
app.use('/raport', require('./routes/raportRoutes'));
app.use(errorHandler);
app.listen(port, () => { console.log(`Server is running on port ${port}`) });


