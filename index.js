// a simple express application that serves app-js and app.html

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.sendFile(path.join(__dirname, 'static', 'app.html'));
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});