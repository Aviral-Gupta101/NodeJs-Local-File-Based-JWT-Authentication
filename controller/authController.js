const userDB = {
    users: require("../data/user.json"),
    setUser: function (data) { this.users = data }
}

const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs/promises");
const jwt = require("jsonwebtoken");

const userFile = path.join(__dirname, "..", "data", "user.json");


const userLogin = async (req, res) => {

    const { user, password } = req.body;

    if (!user || !password)
        return res.status(400).json({ "message": "user and password is required." });

    const foundUser = userDB.users.find(i => i.username === user);

    if(!foundUser)
        return res.sendStatus(401); // unauthorized

    try {
        const match = await bcrypt.compare(password,foundUser.password);

        if(!match)
            return res.status(401).json({"Message" : "Invalid username or password"});
        
        // TODO:Create JWT in future

        const accessToken = jwt.sign(
            {"username" : foundUser.username},
            process.env.ACCESS_TOKEN,
            {expiresIn : "30s"}
        );

        const refreshToken = jwt.sign(
            {"username" : foundUser.username},
            process.env.ACCESS_TOKEN,
            {expiresIn : "1d"}
        );

        /* Saving token in file */
        const otherUser = userDB.users.filter(i => i.username !== foundUser.username);
        const currentUser = {...foundUser, refreshToken};
        userDB.setUser([...otherUser, currentUser]);

        await fs.writeFile(userFile, JSON.stringify(userDB.users));
        res.cookie("jwt", refreshToken, {httpOnly: true, maxAge: 24*60*60*1000})
        return res.json({accessToken});

    } catch (error) {
        console.error(error.message);
    }
};

module.exports = {userLogin};