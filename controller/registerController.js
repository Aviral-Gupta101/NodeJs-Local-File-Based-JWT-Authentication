const userDB = {
    users: require("../data/user.json"),
    setUser: function (data) { this.users = data }
}

const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");

const userFile = path.join(__dirname, "..", "data", "user.json");

const handleNewUser = async (req, res) => {

    const { user, password } = req.body;

    if (!user || !password)
        return res.status(400).json({ "message": "user and password is required." });

    const duplicate = userDB.users.find(i => i.username === user);

    if (duplicate)
        return res.sendStatus(409); // confict


    try {
        // hash the password 
        const hashedPwd = await bcrypt.hash(password, 10);
        // store new user
        const newUser = { "username": user, "password": hashedPwd };
        userDB.setUser([...userDB.users, newUser]);

        await fs.writeFile(userFile, JSON.stringify(userDB.users));
        console.log(userDB.users);
        res.status(201).json({ "message": "User created" });

    } catch (error) {
        res.status(500).json({ "Message": error.message });
    }
};

module.exports = { handleNewUser };