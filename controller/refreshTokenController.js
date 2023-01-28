 const userDB = {
    users: require("../data/user.json"),
    setUser: function (data) { this.users = data }
}

const jwt = require("jsonwebtoken");


const handleRefreshToken =  (req, res) => {

    const cookies = req.cookies;

    if (!cookies?.jwt)
        return res.sendStatus(401);
    console.log("Cookies JWT: " ,cookies.jwt);

    const refreshToken = cookies.jwt;

    const foundUser = userDB.users.find(i => i.refreshToken === refreshToken);

    if(!foundUser)
        return res.sendStatus(403); // Forbidden

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded)=>{

        if(err)
            console.error(err);
        
        if(err || decoded.username !== foundUser.username) return res.sendStatus(401)// forbidden
        const accessToken = jwt.sign(
            {"username" : decoded.username},
            process.env.ACCESS_TOKEN, 
            {expiresIn: "30s"},
        );
        res.json({accessToken});
    })
};

module.exports = {handleRefreshToken };