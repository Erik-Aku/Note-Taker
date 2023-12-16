const express = require('express');
const path = require('path');
const fs = require("fs");
const api = require('./routes/index.js');
const htmlRoutes = require('./routes/html-routes.js')
const noteData = require('./db/db.json');

const PORT = process.env.PORT || 8000;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use('/', htmlRoutes );


app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);
            res.json(parsedNotes);
            console.log(parsedNotes)
        }
    })
});

// Get route for homepage
app.get('*', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);