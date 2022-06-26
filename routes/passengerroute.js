const express = require('express');
        bcrypt = require("bcryptjs");
        router = express.Router();
        Passenger = require('../models/passenger');

        app.get("/", function(req, res){
                res.render("dashboard");
            })
        
        
        app.get("/signup", function(req, res){
            res.render("register");
        })
        
        app.post("/signup", function(req, res){
            const {fname, lname, sex, email, mobile, destination, password} = req.body;
            //checking if email exists
            Passenger.findOne({email: email}, function(er, pass) {
                    if(pass == null){
                         //user doesnt exist
                        //converts password to hash
                        bcrypt.hash(password, 10, function(er, hash){
                            Passenger.create({
                                fname,
                                lname,
                                sex,
                                email,
                                mobile,
                                destination,
                                password: hash
                            }, function(er, data){
                                req.flash('success', "you have successfully signed up")
                                res.redirect("/")
                            });
                        })
                    }  else {
                        req.flash("er_msg", "email already exists");
                        res.redirect("/signup")
                    }
            })
        })
    
        app.get("/logout", function(req, res){
            req.session.destroy();
            res.redirect("/")
        })
    
        module.exports = router;