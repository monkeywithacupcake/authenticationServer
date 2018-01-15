const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// authenticate a user with an email/password
// authenticate a user with a token
const requireAuth = passport.authenticate('jwt', { session: false }); // prevents cookie
const requireSignIn = passport.authenticate('local', { session: false }); // prevents cookie

module.exports = function(app) {
    // any route with requireAuth will be protected
    app.get('/', requireAuth, function(req, res){
        res.send({hi: 'Guten Morgen'});
    });
    app.post('/signin', requireSignIn, Authentication.signin); // requireSignIn middleware
    app.post('/signup', Authentication.signup);
    // app.get('/', function(req, res, next) { // first argument to get is route
    //     // req - represents incoming http request
    //     // res - represents the response to the request
    //     // next - for error handling
    //     res.send(['cupcake', 'summer', 'coffee']);
    // });
}
