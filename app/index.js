const express = require('express');
const db = require('./db');
const { handleDataPost } = require('./handle-incoming');

const port = 3000;

db.init();
const app = express();
app.use(express.json());
app.get('/', (req, res) => res.send('OK'));
app.post('/data', handleDataPost);
app.listen(port, () => console.log('Watching the cluster…'));
