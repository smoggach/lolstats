'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();

const summoner = require('./interface/summoner.js');
const matches = require('./interface/matches.js');

// hide powered by express
app.disable('x-powered-by');

app.use(cors());

router.get('/summoner/:name', async function(req, res, next) {
  console.log(`Getting summoner ${req.params.name}`);
  try {
    const response = await summoner(req.params.name);
    res.status(200).json(response);
  } catch(err) {
    res.status(500).send(err);
  }
});

router.get('/matches/:accountId', async function(req, res, next) {
  console.log(`Getting matches for ${req.params.accountId} cursor=${req.query && req.query.cursor}`);
  try {
    const response = await matches(req.params.accountId, req.query && req.query.cursor);
    res.status(200).json(response);
  } catch(err) {
    res.status(500).send(err);
  }
})

app.use(router);

module.exports = app;
