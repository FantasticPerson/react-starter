'use strict';

const express = require('express');
const path = require('path');
const app = express();

app.use('/', express.static(path.join(__dirname, '../dist/public')));
app.use('/', express.static(path.join(__dirname, '../assets/.public')));

app.listen(process.env.PORT || 80, function () {
  console.log('web server listening on port 3000!');
});
