const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
    user: { type: String, required: true },
    title: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, required: true },
});

const Goal = mongoose.model("goal", goalSchema);

module.exports = Goal;