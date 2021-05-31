
//AuthorName:JIBIN B RAJ
//File:logincontroller.js
//Module:Login
//Created Date:09.03.2021
//Purpose:To Save the Details of adding a new Boat in the Database.

const log1 = require('../models/LoginModel');
var loginData = require('../EmailCredentials');
const { gmail: { host, pass } } = loginData;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const async = require('async')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const { Op } = require('sequelize')


//SHOW ALLL
const index = (req, res, next) => {  
    log1.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: error
            })
        })
}
//view using ID
const show = (req, res, next) => {
    let userid = req.body.userid
    log1.findById(userid)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'AN ERROR OCCURED'
            })
        })
}
// Register
const Store = (req, res, next) => {
    bcrypt.hash(req.body.Password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }

        let Add_User = new log1({

            Email: req.body.Email,
            User_Type: req.body.User_Type,
            Password: hashedPass,
            Block: req.body.Block,
            IsActive: req.body.IsActive,
            Current_Time: req.body.Current_Time,
            Updated_time: req.body.Updated_time

        })
        Add_User.save()
            .then(response => {
                res.json({
                    message: 'User Added Successfully',
                    data:Add_User
                })
            })
            .catch(error => {
                res.json({
                    message: error
                })
            })
    })
}

// login 
const Login = (req, res, next) => {
    var username = req.body.Email
    var password = req.body.Password
    
    log1.findOne({ $or: [{ Email: username }, { Email: username }] })
        .then(user => {           
            if (log1) {

               try
               {
                
                bcrypt.compare(password, user.Password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ name: user.Email }, 'verySecretValue', { expiresIn: '1h' })
                        res.json({
                            status:true,
                            message: ' Login Successfully',
                            data:user,
                            token
                        })
                    } else {
                        res.json({
                            status:false,
                            message:'Password doesnot match'
                        })
                    }
                
                    })
                }
            
        
          catch(error)
          {
            res.json({
                status:false,
                message: 'No User Found'
            })
          }          
            
    }

        })
    
    
}

//forget password


const ResetPassword = (req, res, next) => {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, (err, buf) => {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            log1.findOne({ Email: req.body.Email }, (err, user) => {
                if (!user) {
                    res.json({
                        status:false,
                        info: 'No user'
                    })
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save((err) => {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var transporter = nodemailer.createTransport({

              host:'smtp.gmail.com',
              port:465,
               
                auth: {                  
                    // user:host,
                    // pass:pass
                    user:"noreply.smartdata@gmail.com",
                    pass:"Smartdata@data"
                    
                }
                
            });

            var mailOptions = {
                from:"noreply.smartdata@gmail.com",
                to: user.Email,
                subject: 'SmartBoating',
                text: 'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    '<a href="http://localhost:4200/reset' + '">Verify your Account</a>\n\n' +
                    'token'+':' + token +'\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    res.json({
                        status:true,
                        info: 'Successfully send'
                    })
                }
            });           

        }
    ], function (err) {
            if (err)
                return next(err);
            else {
                res.json({
                    message: 'Error'
                })
            }
    });

}

//reset Password

const ChangePassword = function (req, res) {
    bcrypt.hash(req.body.Password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }

    async.waterfall([
        function (done) {
            log1.findOne({ resetPasswordToken: req.body.resetPasswordToken, resetPasswordExpires: { $gt: Date.now() } }, function (err, user, next) {
                if (!user) {
                    res.json({
                        Status:false,
                        message: 'Invalid Token'
                    })
                }
                

                user.Password = hashedPass /*req.body.Password;*/ /*bcrypt.hash(req.body.Password, 10)*/
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                user.save((err) => {
                    done(err, user);
                });
                
                              
            });
        },

        function (user, done) {
            // console.log('got this far 4')
            var smtpTrans = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user:host,
                    pass:pass
                }
            });
            var mailOptions = {
                to: user.Email,
                from: host,
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    ' - This is a confirmation that the password for your account ' + user.Email + ' has just been changed.\n'
            };
            smtpTrans.sendMail(mailOptions, function (err) {
                // req.flash('success', 'Success! Your password has been changed.');
               // done(err);
                res.json({
                    Status:true,
                    message: 'Successfully send'
                })
            });
        }
    ], function (err) {
            res.json({
                message: err
            })
    });
    })
}
module.exports = {index,show, Store, Login, ResetPassword,ChangePassword}