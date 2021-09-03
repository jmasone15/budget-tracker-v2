const jwt = require("jsonwebtoken");
const key = "8fUM+bAxexjhyBqRxQywXcAAmh4&NHVDA987A&A##HFDny=&Sm";

function auth(req, res, next) {
    try {
        // Grab cookie from request
        const token = req.cookies.token;

        // If there is not cookie, the user is not logged in.
        if (!token) {
            return res.status(401).json({ errorMessage: "Unauthorized" });
        }

        // Verify the token
        const verified = jwt.verify(token, key);
        req.user = verified.user;
        // If the token is not verified, jwt will throw an error


        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ errorMessage: "Unauthorized" });
    };
};

module.exports = auth;