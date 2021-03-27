const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
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
    let db = require('./Develop/db/db.json');
    res.json(db);
});

app.post('/api/notes', (req, res) => {
    let db = require('./Develop/db/db.json');
    let data = req.body;
    let randomID = new Date();
    data.id = randomID;
    db.push(data);
    fs.writeFile('./Develop/db/db.json',JSON.stringify(db), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    
    res.json(db);
});

app.delete("/api/notes/:id", function(req, res) {
    let db = require('./Develop/db/db.json');
    let id = req.params.id;
    // console.log('prefilter', db);
    let data = db.filter(obj => obj.id !== id)
    console.log('Data Consts:',data)
    db.push(data);
    filePath = path.join(__dirname, './Develop/db/db.json');
    console.log(filePath)
    fs.writeFile(filePath, JSON.stringify(data),  function(err) {
            if(err) {
                return console.log(err);
            }
            
        });
        res.json(data);
  });


app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}!`));