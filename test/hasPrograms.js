const chai = require('chai');
const { getPrograms, hasPrograms } = require('../dist/programs');
const expect = chai.expect;
const programs = getPrograms()

describe("Has programs", () => {
  it ('should return false', () => {
    expect(hasPrograms('fake program')).to.be.false;
  });
  it ('should return true', () => {
    expect(hasPrograms(programs[0].name)).to.be.true;
  });
  it ('should return false', () => {
    expect(hasPrograms(['fake program', 'fake program 2'])).to.be.false;
  });
  it ('should return true', () => {
    expect(hasPrograms([programs[0].name, programs[1].name])).to.be.true;
  });
});