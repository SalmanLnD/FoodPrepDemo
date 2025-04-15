const userModel = require('../models/userModel')
const fsPromises = require('fs').promises
const path = require('path')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY)
    return token
}

const googleLogin = async (req, res) => {
    const { credential } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { name, email } = payload;

        let user = await userModel.findOne({ email });

        if (!user) {
            // If user doesn't exist, create one with a dummy password
            const password = email + process.env.JWT_SECRET_KEY;
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await userModel.create({
                name,
                email,
                password: hashedPassword,
            });
        }

        const token = createToken(user._id);
        res.status(200).json({ message: 'Logged in with Google', token, role: user.role });

    } catch (error) {
        console.error('Google login error:', error);
        res.status(401).json({ message: 'Invalid Google token' });
    }
};

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if(!user)
            return res.status(400).json({ message: 'Invalid email or password' })
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)
            return res.status(400).json({ message: 'Invalid email or password' })

        const role=user.role;
        const token = createToken(user._id)
        res.status(200).json({ message: 'User logged in successfully', token ,role})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

// register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.status(400).json({ message: 'Email already exists' })
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({ message: 'Invalid email' })
        }
        if(password.length < 8){
            return res.status(400).json({ message: 'Password should be at least 8 characters long' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = userModel.create({ name, email, password: hashedPassword })
        const role=user.role;
        const token = createToken(user._id)

        res.status(201).json({ message: 'User created successfully', token,role })

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
        
    }

}

module.exports = {
    loginUser,
    registerUser,
    googleLogin
}