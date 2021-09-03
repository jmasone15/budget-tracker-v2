const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// Express setup
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budgetTracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
});

// Routes
// Todo - Add budget route.
app.use("/user", require("./routes/userRoutes"));

// Start Server
app.listen(PORT, () => console.log(`Running on port: ${PORT}🌎`))