const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

module.exports = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GoogleClientID,
        clientSecret: process.env.GoogleCllientSecret,
        callbackURL: "http://localhost:5000/api/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, cb) {
        try {
          const existingUser = await User.findOne({ googleId: profile.id });

          if (existingUser) {
             const updatedUser={
              name: profile.displayName,
              email: profile.emails[0].value,
              secre: accessToken ,
             }
             await User.findByIdAndUpdate(
                { _id: existingUser._id},
               { $set: updatedUser},
              { new: true },

             ).then((user) => {
              return cb(null, user);
             })

              
             
          }
          else{
            const newUser = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              secret: accessToken,
            });
            await newUser.save().then((user) => {
              return cb(null, user);
            });
          }
            
           
          }
        
         catch (err) {
          return cb(err, null);
        }
      }
    )
  );
};
