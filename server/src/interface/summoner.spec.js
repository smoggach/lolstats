const sinon = require('sinon');
const { expect } = require('chai');
const summoner = require('./summoner.js');

describe('summoner', function() {
  const pageLength = 10;
  const name = 'Test';
  it('gets summoner with name', async function() {
    let response = await summoner(name);
    expect(response.name).to.equal(name);
  });

  it('handles summoner 404', async function() {
    let response = await summoner('notreallysummonerthisisfakename');
    expect(response.statusCode).to.equal(404);
  })
});
