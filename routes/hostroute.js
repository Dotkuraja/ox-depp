const express = require('express');
        bcrypt = require("bcryptjs");
        multer = require("multer");
        router = express.Router();
        // Passenger = require('../models/passenger');
        Host = require('../models/host');


        app.get("/", function(req, res){
                res.render("dashboard");
            })
        
        
        app.get("/register", function(req, res){
            res.render("register");
        })
        
        app.post("/register", function(req, res){
            const {hostname, email, password} = req.body;
            //checking if email exists
            Host.findOne({email: email}, function(er, pass) {
                    if(pass == null){
                         //user doesnt exist
                        //converts password to hash
                        bcrypt.hash(password, 10, function(er, hash){
                            Host.create({
                                hostname,
                                email,
                                password: hash
                            }, function(er, data){
                                req.flash('success', "you have successfully signed up")
                                res.redirect("/")
                            });
                        })
                    }  else {
                        req.flash("er_msg", "email already exists");
                        res.redirect("/register")
                    }
            })
        })
//login//
        app.route("/login")
        .get(function (req, res) {
            res.render("login");
        })

        .post(function( req, res) {
            const {hostname, email, password} = req.body;
            Host.findOne({email: email}, function(er, pass) {
                if(pass == null) {
                    req.flash("er_msg", "email does not exist");
                    res.redirect("/");
                } else {
                    //compare has password
                    bcrypt.compare(password, pass.password, function(er, isverify) {
                        if(!isVerify) {
                            req.flash("er_msg", "password incorrect");
                            res.redirect("/")
                        } else {
                            req.session.u_id = pass._id;
                        req.session.u_email = pass.email;
                        req.flash('success', "welcome");
                        res.redirect("/index");

                        }
                    })
                }
            })
        })

//Index route

        app.get("/index", function(req, res){
            if(!req.session.u_id){
                req.flash("er_msg", "please sign in");
                res.redirect("/login")
            } else {
                Passenger.find(function(er, passenger){
                   res.render("/index", {u_id, passengers:passenger}); 
                })
            }
        })
    //passenger route

        app.get("/passenger", function(req, res){
            if(!req.session.u_id){
                req.flash("er_msg", "please sign in");
                res.redirect("/login")
            } else {

            res.render("/add_passenger"); 
            }
        })

    //logout
        app.get("/logout", function(req, res){
            req.session.destroy();
            res.redirect("/")
        })
    
        module.exports = router;