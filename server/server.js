'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 80;

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(express.static(path.resolve(__dirname, '..', '.')));


app.use(express.json());
//app.use(cors());
app.use(cors({
  origin: ['http://127.0.0.1', 'http://37.139.40.252'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));



app.get('*', (req, res) => {
    if (req.accepts('html')) {
      res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
    } else {
      res.status(200).send('');
    }
  });

app.use(bodyParser.json());





app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
