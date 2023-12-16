const apiRoutes = require('express').Router();
const fs = require("fs");
const path = require("path");

// apiRoutes.get("/api/notes", (req, res) => {
//     fs.readFile('../db/db.json', 'utf8', (err, data) => {
//         if (err) {
//             console.error(err);
//         } else {
//             const parsedNotes = JSON.parse(data);
//             res.json(parsedNotes);
//             console.log(parsedNotes);
//         }
//     })
// });



module.exports = apiRoutes;