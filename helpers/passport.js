const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { Admins } = require('..//models');
const { Sellers } = require('..//models');
const { Customers } = require('..//models');

const validateToken = (payload, done) => {
    Admins.findByPk(payload.id)
        .then(admin => done(null, admin))
        .catch(err => done(err, null));

        Sellers.findByPk(payload.id)
        .then(seller => {
            if (seller) {
                return done(null, seller);
            }
            return done(null, false);
        })
        .catch(err => {
            return done(err, false);
        });
        Customers.findByPk(payload.id)
        .then(customer => done(null, customer))
        .catch(err => done(err, null));
}


passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
    secretOrKey: 'PASSWORD',
}, validateToken));



module.exports = passport;