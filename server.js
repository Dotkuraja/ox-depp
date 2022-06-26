const express = require("express");
flash = require("connect-flash");
mongoose = require("mongoose");
session = require("express-session");
app = express();

const db = require("./config/key").mongoURI;
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology:true});

app.set("view engine", 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extende: true}));

//EXPRESS SESSION MIDDEWARE//
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//CONNNECT FLASH//
   
   app.use(flash());

   //GLOBAL VARS//
   app.use((req, res, next) => {
       res.locals.success = req.flash('success');
       res.locals.er_msg = req.flash('er_msg');
       next()
   });

   //ROUTE SETUP//
   app.use('/', require('./routes/hostroute'));
//    app.use('/', require('./routes/passengerroute'));

   app.listen (process.env.PORT || 4500, () => console.log("server started on 4500")) 
