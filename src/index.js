import os from 'os';
import { execSync } from 'child_process';
import encoder from 'text-encoding';

// Create global utf8 decoder
var decoder = new encoder.TextDecoder("utf-8");

/**
 * A module that fetches installed application info
 * 
 * @module programs
 */

/** @var {Object}
 *  Holds the shell commands to list all applications/packages for each supported platform.*/
const COMMANDS = {
  linux: 'dpkg -l'
};

/** @var {Array}
 *  Attempts to load installed applications at runtime. Will return empty array if 
 *  the platform isn't currently supported */
const PROGRAMS = platformSupported() ? uintToStr(execSync(`${COMMANDS[os.platform()]}`)).split('\n')
  .map(program => {
    return splitProgram(program);
  }).filter(program => {
    return program.name !== undefined;
  }) : [];

/**
 * Splits the provided string on nth occurence of delimiter.
 * 
 * @param str The string to seperate
 * @param del The delimiter to split at
 * @param start Nth occurence of del to split at
 */
function splitAt (str, del, start) {
  return str.split(del).slice(start).join(" ");
}

/**
 * Returns a string from a UIntArray8
 * 
 * @param {UIntArray8} uint 
 */
function uintToStr (uint) {
  return decoder.decode(uint);
}

/**
 * Returns true if the platform is supported.
 * 
 * @return {Boolean}
 */
function platformSupported () {
  return COMMANDS.hasOwnProperty(os.platform());
}

/**
 * Attempts to split program string into Program name, version & desc (OS dependent)
 * 
 * @param {string} programName 
 * @returns {Object} Object representing the program information found
 */
function splitProgram (programName) {
  switch (os.platform()) {
    case 'linux':
      let programInfo = programName.split(/\s+/);
      return {
        'desc': splitAt(programName, /\s+/, 4),
        'platform': programInfo[3],
        'name': programInfo[1],
        'version': programInfo[2]
      };
    case 'win32':
      break;
    default:
      break;
  }
}

/**
 * Returns a list of all installed programs.
 * 
 * @return {Array}
 */
function allPrograms () {
  return PROGRAMS;
}

/**
 * Searches installed applications for provided program(s).
 * 
 * @param {string|Array.<String>} programName The program name to search for
 * @returns {object|array} Returns a singular object or array of objects
 */
function getProgram (programName) {
  if (Array.isArray(programName)) {
    return PROGRAMS.filter(program => programName.some(programSearch => programSearch == program.name) > 0);
  } else if (programName instanceof String) {
    return PROGRAMS.find(program => program.name === programName);
  }
}

export default {
  allPrograms,
  getProgram
};