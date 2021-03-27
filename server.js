const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const db = require(path.join(__dirname, './Develop/db/db.json'));
const fs = require('fs')
app.use(express.static('./Develop/public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/api/notes', (req, res) => {
    res.json(db);
});

app.post('/api/notes', (req, res) => {
    let data = req.body;
    let randomID = new Date();
    data.id = randomID;
    db.push(data);
    fs.writeFile('./Develop/db/db.json',JSON.stringify(db), async function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    res.json(db);
});

app.delete("/api/notes/:id", function(req, res) {
    let id = req.params.id;
    let data = db.filter(obj => obj.id !== id)
    fs.writeFile('./Develop/db/db.json', JSON.stringify(data), async function(err) {
            if(err) {
                return console.log(err);
            } 
            console.log("The file was saved!");
            res.statusCode
        });
        let newdb = require('./Develop/db/db.json');
        res.json(newdb);
  });
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}!`));