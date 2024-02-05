//create web server
const express = require('express');
const app = express();
const port = 3000;
//create file system
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
// Path: comments.txt
//This is a sample comment
//This is another sample comment
//This is a third sample comment
//This is a fourth sample comment
//This is a fifth sample comment
//This is a sixth sample comment
//This is a seventh sample comment
//This is an eighth sample comment
//This is a ninth sample comment
//This is a tenth sample comment

// Path: index.html
// <!DOCTYPE html>
// <html>
//     <head>
//         <title>Comments</title>
//     </head>
//     <body>
//         <h1>Comments</h1>
//         <form id="commentForm">
//             <input type="text" name="comment" id="comment" required>
//             <button type="submit">Add Comment</button>
//         </form>
//         <ul id="comments"></ul>
//         <script>
//             document.getElementById('commentForm').addEventListener('submit', (event) => {
//                 event.preventDefault();
//                 let comment = document.getElementById('comment').value;
//                 fetch('http://localhost:3000/comments', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({comment: comment})
//                 })
//                 .then(response =>