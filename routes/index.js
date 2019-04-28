// Initialize express
const express = require('express');
const router  = express.Router();

// Import logic
const util = require('./util');

// Route to shorten URL
router.post('/shorten', (req,res) => {
    let { url } = req.body;
    util.shorten(url, res);
});

// Route to use the shortened URL
router.get('/:hash', (req,res) => {
    let { hash } = req.params;
    util.unshorten(hash, res);
})

module.exports = router;
