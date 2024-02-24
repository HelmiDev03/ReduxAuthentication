const express = require('express');
const { Register , Login , AddUser , GetAllUsers , GetUser , DeleteUser , UpdateUser   } = require('../controllers/user.controllers');
const router = express.Router();
const passport = require('passport');
const { inRole , ROLES } = require('../protection/Rolemiddleware');


router.post('/register',  Register) 
router.post('/login',  Login)
router.post('/adduser' ,  passport.authenticate('jwt' , {session : false}) , inRole('admin')           , AddUser)
router.put('/updateuser/:id' ,  passport.authenticate('jwt' , {session : false})  , UpdateUser)
router.get('/users' ,  passport.authenticate('jwt' , {session : false}) ,inRole('admin') , GetAllUsers)
router.get('/user/:id' ,  passport.authenticate('jwt' , {session : false}) ,inRole('admin') , GetUser)
router.delete('/deleteuser/:id' ,  passport.authenticate('jwt' , {session : false}) ,inRole('admin') , DeleteUser)


module.exports = router;