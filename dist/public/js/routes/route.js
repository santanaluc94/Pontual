import express from 'express';
import path from 'path';
export const app = express();
const settings = require('../../../../settings');
app.get('/', function (request, response) {
    response.sendFile(path.join(settings.baseUrl + '/src/public/index.html'));
});
