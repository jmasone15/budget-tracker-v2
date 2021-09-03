const router = require("express").Router();
const Goal = require("../models/goalModel");
const User = require("../models/userModel");
const auth = require("../middleware/auth");

// Create a Goal
router.post("/", auth, async (req, res) => {
    try {

        // Grab data from body
        const { user, title, targetAmount, currentAmount } = req.body;

        // Validation
        const userExists = await User.findOne({ username: user });
        if (!userExists) {
            return res.status(400).send("User does not exist.")
        }

        // Create the new Goal
        const newGoal = new Goal({ user, title, targetAmount, currentAmount });
        const savedGoal = await newGoal.save();

        res.json(savedGoal);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

// Get All Goals
router.get("/:user", auth, async (req, res) => {
    try {

        const { user } = req.params;
        const goal = await Goal.find({ user });
        res.json(goal);

    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong with getting goals.")
    }
});

// Get One Goal
router.get("/:id", auth, async (req, res) => {
    try {

        const { id } = req.params;
        const goal = await Goal.find({ id });
        res.json(goal);

    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong with getting goals.");
    }
});

module.exports = router;