const apiRoutes = require("express").Router();
const fs = require("fs");
const path = require("path");
const uuid = require("../helpers/uuid");

// reads the db.json file and return all saved notes as JSON
apiRoutes.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedNotes = JSON.parse(data);
      res.json(parsedNotes);
    }
  });
});

// receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file
apiRoutes.delete("/notes/:id", (req, res) => {
  let idToDelete = req.params.id;

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    let noteList = JSON.parse(data);

    for (let i = 0; i < noteList.length; i++) {
      if (idToDelete === noteList[i].id) {
        noteList.splice(i, 1);
      }
      noteJson = JSON.stringify(noteList);
    }
    fs.writeFile("./db/db.json", noteJson, (err) => {
      if (err) {
        throw err;
      }
      console.log("Note has been successfully deleted");
      res.json(noteJson);
    });
  });
});

// receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
apiRoutes.post("/notes", (req, res) => {
  console.info(`${req.method} request received to add a new note`);

  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuid(),
  };

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let parsedData = JSON.parse(data);
      parsedData.push(newNote);

      parsedData = JSON.stringify(parsedData);

      fs.writeFile("./db/db.json", parsedData, (err) => {
        if (err) {
          console.error(err);
        } else {
          res.json(parsedData);
          console.log("File written successfully");
        }
      });
    }
  });
});

module.exports = apiRoutes;
