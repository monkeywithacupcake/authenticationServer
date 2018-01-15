const jwt = require('jwt-simple');
const config = require('../config');

const User = require('../models/user');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
    // user has authed email and password, need to give token
    res.send({ token: tokenForUser(req.user)});
}

exports.signup = function(req, res, next) {
    //res.send({ success: 'true' });
    // req.body contains anything in the post request
    const email = req.body.email
    const password = req.body.password

    // make sure that have email and password
    if (!email || !password){
        return res.status(422).send({ error: 'email and password required'});
    }
    // could also do validation here to make sure that email looks like an Email

    // see if a user with a given email exists
    User.findOne({ email: email}, function(err, existingUser){
        // if there is an error with request
        if (err){
            return next(err);
        }
        // if email does exist, return error
        if (existingUser){
            return res.status(422).send({ error: 'Email is in use'});
        }
        // if new, create new user
        const user = new User({
            email: email,
            password: password
        });

        user.save(function(err){
            if(err) { return next(err); }
            // respond to request
            res.json({ token:tokenForUser(user) });
        });
    });
}
