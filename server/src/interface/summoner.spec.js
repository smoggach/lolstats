const sinon = require('sinon');
const { expect } = require('chai');
const summoner = require('./summoner.js');

describe('summoner', function() {
  const pageLength = 10;
  it('gets summoner and matches with name', async function() {
    let response = await summoner('test');
    expect(response.matches.length).to.equal(pageLength);
  });

  it('gets summoner and matches with start index', async function() {
    let response = await summoner('test', pageLength);
    expect(response.matches.length).to.equal(pageLength);
  });

  it('handles summoner 404', async function() {
    let response = await summoner('notreallysummonerthisisfakename');
    expect(response.statusCode).to.equal(404);
  })
});
