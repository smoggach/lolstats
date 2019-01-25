'use strict';

const express = require('express');
const app = express();
const router = express.Router();

const summoner = require('./interface/summoner.js');

// hide powered by express
app.disable('x-powered-by');

router.get('/summoner/:name', async function(req, res, next) {
  return summoner(req.params.name, req.query.cursor);
});
