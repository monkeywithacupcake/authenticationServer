const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const config = require('../config');


// create Local login Strategy
const localOptions = {
    usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    // verify username and password
    User.findOne({ email: email }, function(err, user){
        if(err) { return done(err); } // err
        if(!user) { return done(null, false); } // no user with email
        // here, have a user with email, so need to compare password entered to hashed password
        // use the salt to encrypt the entered password and compare both hashes
        user.comparePassword(password, function(err, isMatch){
            if(err) { return done(err); } // err
            if(!isMatch) { return done(null, false); } // no match
            return done(null, user); // password matches, WE HAVE A USER!
        });
    });
});

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    // payload is decoded JWT (userid, timestamp)
    // done is callback with success of fail
    User.findById(payload.sub, function(err, user){
        if(err) { return done(err, false); } // not authenticated
        if(user) { done(null, user); } // authenticated
        else { done(null, false);} // not authenticated no err
    });
});

// tell passport to use JWT Strategy
passport.use(jwtLogin);
passport.use(localLogin);
