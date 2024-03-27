// const passport = require("passport");
// const JwtStrategy = require("passport-jwt").Strategy;
// const { ExtractJwt } = require("passport-jwt");
// const { Member, sequelize } = require("../models");

// const opts = {};

// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env?.JWT_SECRET;

// passport.use(
//   new JwtStrategy(opts, async (jwtPayload, done) => {
//     try {
//       const member = await Member.findOne({
//         where: { id: jwtPayload?.id },
//       });

//       if (!member) {
//         return done(new Error("User Not Found"), null);
//       }

//       return done(null, member);
//     } catch (error) {
//       done(error);
//     }
//   })
// );

// module.exports = {
//   isLogin: passport.authenticate("jwt", { session: false }),
// };
