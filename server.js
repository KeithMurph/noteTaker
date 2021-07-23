const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

const notes = require('express').express();
const PORT = process.env.PORT || 4000;


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


notes.use(express.urlencoded({ extended : true}));
notes.use(express.json());

notes.use(express.static("./Develop/public"));


notes.get("/api/notes", function(req, res) {
    readFileAsync("./Develop/db/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

notes.post("/api/notes", function(req, res) {
    const note = req.body;
    readFileAsync("./Develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length =1
        notes.push(note);
        return notes
       
    }).then(function(notes) {
        writeFileAsync("./Develop/db/db.json", JSON.stringify(notes))
        res.join(note);
    })
});

notes.delete("/api/notes/:id", function(req, res) {
    const idToDelete = parseInt(req.params.id);
    readFileAsync("./Develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        const newNoteData = []
        for (let i = 0; i<notes.length; i++) {
            if(idToDelete !==notes[i].id) {
                newNoteData.push(notes[i])
                
            }
        }
        return newNoteData
           
        }).then(function(notes) {
            writeFileAsync("./Develop/db/db.json", JSON.stringify(notes))
            res.send("saved")

        })
    })



    // html
    notes.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));

    });

    notes.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
    });

    notes.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
        
    });

    // listen

    notes.listen(PORT, function() {
        console.log("listening on port" + PORT);
        
    });
express();
    

