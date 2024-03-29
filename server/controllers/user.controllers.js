const User = require("../models/user");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const sendVerificationMail = require('../controllers/authverification/registerverification/sendverificationmail');
const VerificationToken = require('../models/authverification/VerificationToken');

const Register = async (req, res) => {


    try {
        const { name, email, password } = req.body;
        const findUser = await User.findOne({ email });
        if (findUser) {
            const errors = { email: "Email already exists" }
            
            return res.status(400).json(errors);
        }
        const hash = await bcrypt.hashSync(password, 10)
        const user = await User.create({name, email, password: hash });
        sendVerificationMail(user);
        
        res.status(201).json({ message: "Account creted Suceesfuly , please verify your email "  });


    } catch (error) {
       
        res.status(404).json(error.message);
    }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const findUser = await User.findOne({ email });

        if (!findUser) {
            return res.status(400).json({ message: "Email not found" });
        }

        // Check if user's password is not undefined before comparing
        
        const comparePassword = await bcrypt.compare(password, findUser.password);

        if (!comparePassword) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        if ( ! findUser.isVerified){
               sendVerificationMail(findUser);

            return res.status(400).json({ message: "Please verify your email" });
        }

        const token = jwt.sign(
            {
                _id: findUser._id,
                name: findUser.name,
                email: findUser.email,
                role: findUser.role,
                tel : findUser.tel,
                address : findUser.address,
                postalcode : findUser.postalcode,
                nationality : findUser.nationality
            },
            process.env.PRIVATE_KEY,
            { expiresIn: '1h' }
        );

        

        res.status(200).json({
            message: "Success",
            token: "Bearer " + token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const AddUser = async (req, res) => {
   
    try{
        // we will create new user
     
        
        req.body.password = await bcrypt.hashSync(req.body.password, 10);
        const user = await User.create(req.body);
        user.password = undefined;
        const users = await User.find()
        //that mean password will not be returned in the response , we just
        //return the user object without the password
        res.status(201).json({ message: "User created successfully" , user:user  , users:users});


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
    
}


const UpdateUser = async (req, res) => {

    try{
        const user = await User.findOneAndUpdate({ _id: req.user.id },
            req.body,
            { new: true }
        );
        if (user) {
            //remove password from the user object
            const token = jwt.sign(
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    tel : user.tel,
                    address : user.address,
                    postalcode : user.postalcode,
                    nationality : user.nationality
                },
                process.env.PRIVATE_KEY,
                { expiresIn: '1h' }
            );
            user.password = undefined;
            res.status(200).json({token: "Bearer " + token ,user:user , message: "User updated successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
       
     
    }

    catch (error) {
        res.status(500).json({ message: error.message });
    }
}





const GetAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        //remove password from the user object
        users.forEach(user => {
            user.password = undefined;
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

}


const GetUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        //remove password from the user object
        user.password = undefined;
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
}

const DeleteUser = async (req, res) => {
    try{
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (user) {
        const users = await User.find()
        //remove password from the users object
        users.forEach(user => {
            user.password = undefined;
        });
        res.status(200).json(users);
    } else {
        res.status(404).json({ message: "User not found" });
    }
}
catch (error) {
    res.status(500).json({ message: error.message });
    
    
}}



const VerifyMail = async (req, res) => {
    try {
        
        
        const finduser = await User.findById(req.params.id);
        
        if (!finduser) {
            return res.status(404).json({ message: "Invalid link" });
        }
        
        const token = await VerificationToken.findOne({ userId: req.params.id, token: req.params.token });
        
        if ( finduser.isVerified) {
            return res.status(404).json({ message: "Email verified successfully" });
        }
      
        if (!token) {
            return res.status(404).json({ message: "Invalid link" });
        }
        if (token.expiresIn < Date.now()) {
            return res.status(404).json({ message: "Link expired" });
        }
        
        await User.findByIdAndUpdate(req.params.id, { isVerified: true });
        
        await VerificationToken.findOneAndDelete({ userId: req.params.id });
        return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



















module.exports =
{
    Register,
    Login,
    AddUser,
    UpdateUser,
    GetAllUsers,
    GetUser,
    DeleteUser,
    VerifyMail
}