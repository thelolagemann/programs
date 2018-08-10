import os from 'os';
import { execSync } from 'child_process';

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

/** @var {Object}
 * Errors object */
const ERRORS = {
  UNSUPPORTED_PLATFORM: `The ${os.platform()} platform isn't currently supported`
};

/** @var {Array}
 *  Attempts to load installed applications at runtime. Will return empty array if 
 *  the platform isn't currently supported */
const PROGRAMS = platformSupported() ? execSync(`${COMMANDS[os.platform()]}`, {encoding: 'utf8'}).split('\n')
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
 * Searches installed applications for provided program(s).
 * 
 * @param {string|Array.<String>} programName The program name(s) to search for
 * @returns {object|array|undefined} Returns a singular object, array of objects, or undefined
 */
function getPrograms (programName) {
  // Check platform supported
  if (!platformSupported()) return ERRORS.UNSUPPORTED_PLATFORM;

  // Determine what to find
  if (Array.isArray(programName)) {
    return PROGRAMS.filter(program => programName.some(programSearch => programSearch == program.name) > 0);
  } else if (typeof programName === 'string') {
    return PROGRAMS.find(program => program.name === programName);
  } else if (programName == undefined) {
    return PROGRAMS;
  }
}

/**
 * Returns false if more than one program isn't installed.
 * 
 * @param {string|Array<string>} programs 
 */
function hasPrograms (programs) {
  // Check platform supported
  if (!platformSupported()) return ERRORS.UNSUPPORTED_PLATFORM;

  if (Array.isArray(programs)) {
    return programs.every(program => {
      return PROGRAMS.some(p => p.name === program);
    });
  } else if (typeof programs === 'string') {
    return PROGRAMS.some(p => p.name === programs);
  }
  return false;
}

export default {
  getPrograms,
  hasPrograms
};