import {app} from './src/public/js/routes/route';

const express = require('express');

app.use('/src/public', express.static(__dirname + '/src/public'));

app.listen(3000, function() {
    console.log('Server started.');
});