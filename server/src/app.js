'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();

const summoner = require('./interface/summoner.js');

// hide powered by express
app.disable('x-powered-by');

app.use(cors());

router.get('/summoner/:name', async function(req, res, next) {
  return summoner(req.params.name);
});

router.get('/matches', async function(req, res, next) {
  return matches(req.query && req.query.cursor);
})
