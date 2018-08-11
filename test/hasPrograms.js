const chai = require('chai');
const { getPrograms, hasPrograms } = require('../dist/programs');
const expect = chai.expect;
const programs = getPrograms()

describe("Has programs", () => {
  it ('Check if the program(s) is installed', () => {
    let fakeProgram = hasPrograms('fake program');
    let fakePrograms = hasPrograms(['fake program 1', 'fake program 2']);
    let realProgram = hasPrograms(programs[0].name);
    let realPrograms = hasPrograms([programs[0].name, programs[1].name]);

    expect(fakeProgram).to.be.false;
    expect(fakePrograms).to.be.false;
    expect(realProgram).to.be.true;
    expect(realPrograms).to.be.true;
  })
});