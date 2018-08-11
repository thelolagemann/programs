const chai = require('chai');
const { getPrograms } = require('../dist/programs');
const expect = chai.expect;
const programs = getPrograms();

chai.use(require('chai-things'));

const programList = getPrograms();

describe("Get Programs", () => {
  it ('should return an array of installed programs', () => {
    expect(programList[50]).have.keys('desc', 'name', 'platform', 'version');
  });
  it ('should return undefined', () => {
    expect(getPrograms('a fake program')).to.be.undefined;
  });
  it ('should return an object containing program information', () => {
    expect(getPrograms(programList[0].name)).have.keys('desc', 'name', 'platform', 'version');
  });
  it ('should return an array of programs', () => {
    getPrograms([programList[0].name, programList[1].name]).every(i => expect(i).to.have.keys('desc', 'name', 'platform', 'version'));
  });
});