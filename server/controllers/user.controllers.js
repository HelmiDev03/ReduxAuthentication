const User = require("../models/user");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


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
        res.status(201).json({ message: "User created successfully" });


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

        const token = jwt.sign(
            {
                id: findUser._id,
                name: findUser.name,
                email: findUser.email,
                role: findUser.role,
                tel : findUser.tel,
                address : findUser.address,
                postalcode : findUser.postalcode,
                nationality : findUser.nationality
            },
            process.env.PRIVATE_KEY,
            { expiresIn: '1d' }
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
        await User.create(req.body);
        res.status(201).json({ message: "User created successfully" });


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
            res.status(200).json({user:user , message: "User updated successfully" });
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
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

}


const GetUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
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
        res.status(200).json(users);
    } else {
        res.status(404).json({ message: "User not found" });
    }
}
catch (error) {
    res.status(500).json({ message: error.message });
    
    
}}












module.exports =
{
    Register,
    Login,
    AddUser,
    UpdateUser,
    GetAllUsers,
    GetUser,
    DeleteUser,
}