const express = require('express');
const path = require('path');
const fs = require("fs");
const api = require('./routes/index.js');
const htmlRoutes = require('./routes/html-routes.js')
const uuid = require('./helpers/uuid');
// const { title } = require('process');

const PORT = process.env.PORT || 8000;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use('/', htmlRoutes );


app.use(express.static("public"));

// read the db.json file and return all saved notes as JSON.
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

// receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a new note`);

    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid(),
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            let parsedData = JSON.parse(data);
            parsedData.push(newNote);
            // console.log(parsedData);

            parsedData = JSON.stringify(parsedData);
        
            fs.writeFile('./db/db.json', parsedData, (err) => {
                if (err) {
                    console.error(err)
                } else {
                    res.json(parsedData)
                    console.log(parsedData)
                    console.log("File written successfully"); 
                }
            })
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