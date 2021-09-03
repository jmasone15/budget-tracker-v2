const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = "8fUM+bAxexjhyBqRxQywXcAAmh4&NHVDA987A&A##HFDny=&Sm";

// Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //Validation
        if (password.length < 6) {
            return res.status(400).send("Please enter a password that is at least 6 characters long.");
        };

        // Check for existing users
        const existingEmail = await User.findOne({ email });
        const existingUser = await User.findOne({ username });
        if (existingEmail) {
            return res.status(400).send("An account with this email already exists");
        };
        if (existingUser) {
            return res.status(400).send("An account with this username already exists");
        };


        // Encrypt password
        const salt = await bcrypt.genSalt();
        const passHash = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({ username, email, passHash });
        const savedUser = await newUser.save();

        // Login User
        const token = jwt.sign({
            user: savedUser._id
        }, key);
        res.cookie("token", token, {
            httpOnly: false,
        }).send(`Welcome: ${savedUser.username}`);

    } catch (err) {
        console.error(err);
        res.status(500).send(savedUser);
    };
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check that the user exists
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(401).send("Wrong username or password");
        };

        // Verify password
        const correctPass = await bcrypt.compare(password, existingUser.passHash);
        if (!correctPass) {
            return res.status(401).send("Wrong username or password");
        };

        // Log in the existing user
        const token = jwt.sign({
            user: existingUser._id
        }, key);
        res.cookie("token", token, {
            httpOnly: false,
        }).send(existingUser);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    };
});

// Logout Route
router.get("/logout", (req, res) => {

    // Delete JWT cookie
    res.cookie("token", "", {
        httpOnly: false,
        expires: new Date(0)
    }).send("Successfully logged out");
});

// Logged In check route
router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json(false);
        } else {
            return res.send(true);
        }
    } catch (err) {
        res.json(false);
    };
});

// User Data Route
router.get("/profile/:id", async (req, res) => {
    try {
        console.log(req.params.id)
        const userInfo = await User.findById(req.params.id);
        res.json(userInfo);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    };
});

module.exports = router;

//60be8d9fd22dd52de87c7bcc