const express = require("express");
const path = require("path");
const cors = require("cors");
const corsOption = require("./config/cors");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/jwtVerify");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

require("dotenv").config();


// custom middleware
app.use(logger);


/* Cross origign resource sharing */
app.use(cors(corsOption));

/* Cokie Parser */
app.use(cookieParser());


/* BUILT IN MIDDLEWAREN */
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

 
/* Routes */
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/employee", require("./routes/api/employee"));


// uses all methods
app.all("*", (req, res) => {
    res.status(404)

    if(req.accepts("html"))
        res.sendFile(path.join(__dirname, 'views/404.html'));
    else if(req.accepts("json"))
        res.json({error: "404 Not Found"});
    else
        res.type("text").send("404 Not Found");
});


/* custom middle ware errorHandler */
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
});

// 4:38