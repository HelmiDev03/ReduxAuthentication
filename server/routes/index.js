const express = require('express');
const { Register , Login , AddUser , GetAllUsers , GetUser , DeleteUser , UpdateUser   } = require('../controllers/user.controllers');
const router = express.Router();
const passport = require('passport');
const { inRole , ROLES } = require('../protection/Rolemiddleware');
const jwt = require('jsonwebtoken')

router.post('/register',  Register) 
router.post('/login',  Login)
router.post('/adduser' ,  passport.authenticate('jwt' , {session : false}) , inRole('admin')           , AddUser)
router.put('/updateuser/:id' ,  passport.authenticate('jwt' , {session : false})  , UpdateUser)
router.get('/users' ,  passport.authenticate('jwt' , {session : false}) ,inRole('admin') , GetAllUsers)
router.get('/user/:id' ,  passport.authenticate('jwt' , {session : false}) ,inRole('admin') , GetUser)
router.delete('/deleteuser/:id' ,  passport.authenticate('jwt' , {session : false}) ,inRole('admin') , DeleteUser)
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile' , 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
  function(req, res) {
    const token = jwt.sign(
      {
          _id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role ? req.user.role : '' ,
          tel : req.user.tel ? req.user.tel : '',
          googleId : req.user.googleId ? req.user.googleId : '',
          address : req.user.addresss ? req.userr.address : '',
          postalcode : req.user.postalcode ? req.user.postalcode : '',
          nationality : req.user.nationality ? req.user.nationality : ''
      },
      process.env.PRIVATE_KEY,
      { expiresIn: '1d' }
  );

    // Successful authentication, redirect home.
    res.redirect(`http://localhost:3000?token=Bearer ${token}`);
  });

module.exports = router;