const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
app.use(express.static('./Develop/public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
    
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

// require('./Develop/routes/apiroutes.js')(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));



app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}!`));