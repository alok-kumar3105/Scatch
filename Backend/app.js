const express = require('express');
const app=express();
const cors = require('cors');
app.use(cors());

if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const path=require('path');
const cookieParser=require('cookie-parser');

const db=require('./config/mongoose-connection');

const ownersRouter=require('./routes/ownersRouter');
const usersRouter=require('./routes/usersRouter');
const productsRouter=require('./routes/productsRouter');
const index=require('./routes/index');
const cartsRouter=require('./routes/cartsRouter');

const expressSession=require('express-session');
const flash=require("connect-flash");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
    resave: false,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}));

app.use(flash()); 

app.use('/', index);
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartsRouter);

app.listen(3000);