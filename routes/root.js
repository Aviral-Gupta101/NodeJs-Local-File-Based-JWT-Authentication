const express = require("express");
const router = express.Router();
const path = require("path");

/* Default Routes */
router.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('^/$|home(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home.html'));
});

module.exports = router;