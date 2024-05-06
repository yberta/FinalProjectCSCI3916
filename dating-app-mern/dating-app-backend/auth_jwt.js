import passport from'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
//var ExtractJwt = require('passport-jwt').ExtractJwt;
import User from './Users.js'
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload.id, function (err, user) {
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));

const isAuthenticated = passport.authenticate('jwt', { session : false });
const secret = opts.secretOrKey ;
export default {isAuthenticated, secret};