const express = require('express');
const router = require('express').Router();
const User = require('../models/User');
const Admin = require('../models/Admin')
const bcrypt = require('bcrypt');


// User Register 
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPass, // Save the hashed password
        });

        const user = await newUser.save();
        res.status(200).json(user);
        res.render('user/register');
        
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//User Login
router.post('/login', async (req, res) => {
    try {   
        const user = await User.findOne({ email: req.body.email });
        console.log('Login attempt with email:', req.body.email);
        console.log('User found:', user);
        if (!user) {
            return res.status(400).json("Wrong credentials");
        }
        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            return res.status(422).json("Incorrect Password");
        }
        const { password, ...others } = user; // Remove password from the user object
        res.status(200).json(others); // Send the remaining user data
    } catch (error) {
        console.log('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// admin Register 
router.post('/adminregister', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);
        const newAdmin = new Admin({
            username: req.body.username,
            email: req.body.email,
            password: hashPass, // Save the hashed password
        });

        const admin = await newAdmin.save();
        res.status(200).json(admin);
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Admin Login
router.post('/adminlogin', async (req, res) => {
    try {   
        const admin = await Admin.findOne({ email: req.body.email });
        console.log('Login attempt with email:', req.body.email);
        console.log('Admin found:', admin);
        if (!admin) {
            return res.status(400).json("Wrong credentials");
        }
        const validated = await bcrypt.compare(req.body.password, admin.password);
        if (!validated) {
            return res.status(422).json("Incorrect Password");
        }
        const { password, ...others } = admin; // Remove password from the user object
        res.status(200).json(others); // Send the remaining user data
    } catch (error) {
        console.log('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;

