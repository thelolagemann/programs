const chai = require('chai');
const { getPrograms } = require('../dist/programs');
const expect = chai.expect;
const programs = getPrograms();

chai.use(require('chai-things'));

describe("Get Programs", () => {
  it ('Get installed programs(s) information', () => {
    let fakeProgram = getPrograms('a fake program');
    let fakePrograms = getPrograms(['fake program 1', 'fake program 2']);
    let realProgram = getPrograms(programs[0].name);
    let realPrograms = getPrograms([programs[0].name, programs[1].name]);

    expect(fakeProgram).to.be.undefined;
    expect(realProgram).have.keys('desc', 'name', 'platform', 'version');
    expect(fakePrograms).to.be.empty;
    
    realPrograms.every(i => expect(i).to.have.keys('desc', 'name', 'platform', 'version'));
  });
});