const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/test(.html)?|^/$", (req, res) => {
    res.sendFile(path.join(__dirname, '..' , 'views', 'subdir', 'test.html'));
});

router.get("/secret(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, '..' , 'views', 'subdir', 'secret.html'));
});

module.exports = router;