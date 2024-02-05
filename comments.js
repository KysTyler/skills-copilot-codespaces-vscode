//create web server
const express = require('express');
const app = express();
const port = 3000;
//create file system
//Hello, this is a comment
const fs = require('fs');
//create body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//create comments array
let comments = [];
//get comments
app.get('/comments', (req, res) => {
    res.send(comments);
});
//post comments
app.post('/comments', (req, res) => {
    let comment = req.body.comment;
    if (comment) {
        comments.push(comment);
        res.send('Comment added');
        fs.appendFile('comments.txt', comment + '\n', (err) => {
            if (err) {
                console.log(err);
            }
        });
    } else {
        res.status(400).send('Invalid comment');
    }
});
//listen on port 3000
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
