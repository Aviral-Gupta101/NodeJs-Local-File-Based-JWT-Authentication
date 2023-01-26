const express = require("express");
const path = require("path");
const cors = require("cors");
const corsOption = require("./config/cors");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// custom middleware
app.use(logger);


/* Cross origign resource sharing */
app.use(cors(corsOption));


/* BUILT IN MIDDLEWAREN */
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

 
/* Routes */
app.use("/", require("./routes/root"));
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