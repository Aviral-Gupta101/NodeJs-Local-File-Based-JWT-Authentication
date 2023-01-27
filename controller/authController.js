const userDB = {
    users: require("../data/user.json"),
    setUser: function (data) { this.users = data }
}

const bcrypt = require("bcrypt");

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
        return res.json({"Message" : "Login successful"});

    } catch (error) {
        console.error(error.message);
    }
};

module.exports = {userLogin};