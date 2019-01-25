'use strict';

const sinon = require('sinon');
const { expect } = require('chai');
const matches = require('./matches.js');

describe('matches', function() {
  const pageLength = 10;
  it('gets matches without cursor', async function() {
    let response = await matches('TFXQhqInBvlTsMUlhPiiihZD7d6kHVTUl-uRMI7O_F6LH00');
    expect(response.matches.length).to.equal(pageLength);
  });

  it('gets matches with cursor', async function() {
    let response = await matches('TFXQhqInBvlTsMUlhPiiihZD7d6kHVTUl-uRMI7O_F6LH00', pageLength);
    expect(response.matches.length).to.equal(pageLength);
  });
});
