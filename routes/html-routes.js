const html = require('express').Router();
const path = require("path");


// Get Route for notes.html page
html.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '../public/notes.html'))
);


module.exports = html;