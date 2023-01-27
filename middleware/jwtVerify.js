const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();

const verifyJWT = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401); // unauthorized
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if(err) return res.sendStatus(401);
            req.user = decoded.user;
            next();
        }
    )
};

module.exports = verifyJWT;
