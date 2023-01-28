const userDB = {
    users: require("../data/user.json"),
    setUser: function (data) { this.users = data }
}

const fs = require("fs/promises");
const path = require("path");

const userFile = path.join(__dirname, "..", "data", "user.json");

const handleLogOut =  async (req, res) => {

    // TODO: To remove access token from memeory not possible from backend, but possible to operate refresh token

    const cookies = req.cookies;

    if (!cookies?.jwt)
        return res.sendStatus(204); // Ok but no content

    const refreshToken = cookies.jwt;
    const foundUser = userDB.users.find(i => i.refreshToken === refreshToken);

    // cookie present but of different user
    if(!foundUser){
        res.clearCookie("jwt", refreshToken, {httpOnly: true, sameSite: "None", secure: true, maxAge: 24*60*60*1000});
        return res.sendStatus(204); // ok but no content
    }

    /* DELETE REFRESH TOKEN FROM DB */
    const otherUser = userDB.users.filter(i => i.refreshToken !== refreshToken);
    const currentUser = {...foundUser, refreshToken : ''};
    userDB.setUser([...otherUser, currentUser]);

    await fs.writeFile(userFile, JSON.stringify(userDB.users));

    // TODO: Add secure: true -only on servers at https (use while in production, addding or removing cookie)
    res.clearCookie("jwt", refreshToken, {httpOnly: true, sameSite: "None", secure: true, maxAge: 24*60*60*1000});
    res.sendStatus(204);
    
};

module.exports = {handleLogOut};