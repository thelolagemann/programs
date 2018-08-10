'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A module that fetches installed application info
 * 
 * @module programs
 */

/** @var {Object}
 *  Holds the shell commands to list all applications/packages for each supported platform.*/
var COMMANDS = {
  linux: 'dpkg -l'
};

/** @var {Object}
 * Errors object */
var ERRORS = {
  UNSUPPORTED_PLATFORM: 'The ' + _os2.default.platform() + ' platform isn\'t currently supported'
};

/** @var {Array}
 *  Attempts to load installed applications at runtime. Will return empty array if 
 *  the platform isn't currently supported */
var PROGRAMS = platformSupported() ? (0, _child_process.execSync)('' + COMMANDS[_os2.default.platform()], { encoding: 'utf8' }).split('\n').map(function (program) {
  return splitProgram(program);
}).filter(function (program) {
  return program.name !== undefined;
}) : [];

/**
 * Splits the provided string on nth occurence of delimiter.
 * 
 * @param str The string to seperate
 * @param del The delimiter to split at
 * @param start Nth occurence of del to split at
 */
function splitAt(str, del, start) {
  return str.split(del).slice(start).join(" ");
}

/**
 * Returns true if the platform is supported.
 * 
 * @return {Boolean}
 */
function platformSupported() {
  return COMMANDS.hasOwnProperty(_os2.default.platform());
}

/**
 * Attempts to split program string into Program name, version & desc (OS dependent)
 * 
 * @param {string} programName 
 * @returns {Object} Object representing the program information found
 */
function splitProgram(programName) {
  switch (_os2.default.platform()) {
    case 'linux':
      var programInfo = programName.split(/\s+/);
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
function getPrograms(programName) {
  // Check platform supported
  if (!platformSupported()) return ERRORS.UNSUPPORTED_PLATFORM;

  // Determine what to find
  if (Array.isArray(programName)) {
    return PROGRAMS.filter(function (program) {
      return programName.some(function (programSearch) {
        return programSearch == program.name;
      }) > 0;
    });
  } else if (typeof programName === 'string') {
    return PROGRAMS.find(function (program) {
      return program.name === programName;
    });
  } else if (programName == undefined) {
    return PROGRAMS;
  }
}

/**
 * Returns false if more than one program isn't installed.
 * 
 * @param {string|Array<string>} programs 
 */
function hasPrograms(programs) {
  // Check platform supported
  if (!platformSupported()) return ERRORS.UNSUPPORTED_PLATFORM;

  if (Array.isArray(programs)) {
    return programs.every(function (program) {
      return PROGRAMS.some(function (p) {
        return p.name === program;
      });
    });
  } else if (typeof programs === 'string') {
    return PROGRAMS.some(function (p) {
      return p.name === programs;
    });
  }
  return false;
}

exports.default = {
  getPrograms: getPrograms,
  hasPrograms: hasPrograms
};
module.exports = exports['default'];

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RixLQUFXLFFBQWhCO0FBQUEsS0FBZCxDQUFQO0FBQ0Q7QUFDRCxTQUFPLEtBQVA7QUFDRDs7a0JBRWM7QUFDYiwwQkFEYTtBQUViO0FBRmEsQyIsImZpbGUiOiJwcm9ncmFtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvcyBmcm9tICdvcyc7XG5pbXBvcnQgeyBleGVjU3luYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuXG4vKipcbiAqIEEgbW9kdWxlIHRoYXQgZmV0Y2hlcyBpbnN0YWxsZWQgYXBwbGljYXRpb24gaW5mb1xuICogXG4gKiBAbW9kdWxlIHByb2dyYW1zXG4gKi9cblxuLyoqIEB2YXIge09iamVjdH1cbiAqICBIb2xkcyB0aGUgc2hlbGwgY29tbWFuZHMgdG8gbGlzdCBhbGwgYXBwbGljYXRpb25zL3BhY2thZ2VzIGZvciBlYWNoIHN1cHBvcnRlZCBwbGF0Zm9ybS4qL1xuY29uc3QgQ09NTUFORFMgPSB7XG4gIGxpbnV4OiAnZHBrZyAtbCdcbn07XG5cbi8qKiBAdmFyIHtPYmplY3R9XG4gKiBFcnJvcnMgb2JqZWN0ICovXG5jb25zdCBFUlJPUlMgPSB7XG4gIFVOU1VQUE9SVEVEX1BMQVRGT1JNOiBgVGhlICR7b3MucGxhdGZvcm0oKX0gcGxhdGZvcm0gaXNuJ3QgY3VycmVudGx5IHN1cHBvcnRlZGBcbn07XG5cbi8qKiBAdmFyIHtBcnJheX1cbiAqICBBdHRlbXB0cyB0byBsb2FkIGluc3RhbGxlZCBhcHBsaWNhdGlvbnMgYXQgcnVudGltZS4gV2lsbCByZXR1cm4gZW1wdHkgYXJyYXkgaWYgXG4gKiAgdGhlIHBsYXRmb3JtIGlzbid0IGN1cnJlbnRseSBzdXBwb3J0ZWQgKi9cbmNvbnN0IFBST0dSQU1TID0gcGxhdGZvcm1TdXBwb3J0ZWQoKSA/IGV4ZWNTeW5jKGAke0NPTU1BTkRTW29zLnBsYXRmb3JtKCldfWAsIHtlbmNvZGluZzogJ3V0ZjgnfSkuc3BsaXQoJ1xcbicpXG4gIC5tYXAocHJvZ3JhbSA9PiB7XG4gICAgcmV0dXJuIHNwbGl0UHJvZ3JhbShwcm9ncmFtKTtcbiAgfSkuZmlsdGVyKHByb2dyYW0gPT4ge1xuICAgIHJldHVybiBwcm9ncmFtLm5hbWUgIT09IHVuZGVmaW5lZDtcbiAgfSkgOiBbXTtcblxuLyoqXG4gKiBTcGxpdHMgdGhlIHByb3ZpZGVkIHN0cmluZyBvbiBudGggb2NjdXJlbmNlIG9mIGRlbGltaXRlci5cbiAqIFxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIHNlcGVyYXRlXG4gKiBAcGFyYW0gZGVsIFRoZSBkZWxpbWl0ZXIgdG8gc3BsaXQgYXRcbiAqIEBwYXJhbSBzdGFydCBOdGggb2NjdXJlbmNlIG9mIGRlbCB0byBzcGxpdCBhdFxuICovXG5mdW5jdGlvbiBzcGxpdEF0IChzdHIsIGRlbCwgc3RhcnQpIHtcbiAgcmV0dXJuIHN0ci5zcGxpdChkZWwpLnNsaWNlKHN0YXJ0KS5qb2luKFwiIFwiKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBsYXRmb3JtIGlzIHN1cHBvcnRlZC5cbiAqIFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gcGxhdGZvcm1TdXBwb3J0ZWQgKCkge1xuICByZXR1cm4gQ09NTUFORFMuaGFzT3duUHJvcGVydHkob3MucGxhdGZvcm0oKSk7XG59XG5cbi8qKlxuICogQXR0ZW1wdHMgdG8gc3BsaXQgcHJvZ3JhbSBzdHJpbmcgaW50byBQcm9ncmFtIG5hbWUsIHZlcnNpb24gJiBkZXNjIChPUyBkZXBlbmRlbnQpXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9ncmFtTmFtZSBcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCByZXByZXNlbnRpbmcgdGhlIHByb2dyYW0gaW5mb3JtYXRpb24gZm91bmRcbiAqL1xuZnVuY3Rpb24gc3BsaXRQcm9ncmFtIChwcm9ncmFtTmFtZSkge1xuICBzd2l0Y2ggKG9zLnBsYXRmb3JtKCkpIHtcbiAgICBjYXNlICdsaW51eCc6XG4gICAgICBsZXQgcHJvZ3JhbUluZm8gPSBwcm9ncmFtTmFtZS5zcGxpdCgvXFxzKy8pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ2Rlc2MnOiBzcGxpdEF0KHByb2dyYW1OYW1lLCAvXFxzKy8sIDQpLFxuICAgICAgICAncGxhdGZvcm0nOiBwcm9ncmFtSW5mb1szXSxcbiAgICAgICAgJ25hbWUnOiBwcm9ncmFtSW5mb1sxXSxcbiAgICAgICAgJ3ZlcnNpb24nOiBwcm9ncmFtSW5mb1syXVxuICAgICAgfTtcbiAgICBjYXNlICd3aW4zMic6XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuLyoqXG4gKiBTZWFyY2hlcyBpbnN0YWxsZWQgYXBwbGljYXRpb25zIGZvciBwcm92aWRlZCBwcm9ncmFtKHMpLlxuICogXG4gKiBAcGFyYW0ge3N0cmluZ3xBcnJheS48U3RyaW5nPn0gcHJvZ3JhbU5hbWUgVGhlIHByb2dyYW0gbmFtZShzKSB0byBzZWFyY2ggZm9yXG4gKiBAcmV0dXJucyB7b2JqZWN0fGFycmF5fHVuZGVmaW5lZH0gUmV0dXJucyBhIHNpbmd1bGFyIG9iamVjdCwgYXJyYXkgb2Ygb2JqZWN0cywgb3IgdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGdldFByb2dyYW1zIChwcm9ncmFtTmFtZSkge1xuICAvLyBDaGVjayBwbGF0Zm9ybSBzdXBwb3J0ZWRcbiAgaWYgKCFwbGF0Zm9ybVN1cHBvcnRlZCgpKSByZXR1cm4gRVJST1JTLlVOU1VQUE9SVEVEX1BMQVRGT1JNO1xuXG4gIC8vIERldGVybWluZSB3aGF0IHRvIGZpbmRcbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvZ3JhbU5hbWUpKSB7XG4gICAgcmV0dXJuIFBST0dSQU1TLmZpbHRlcihwcm9ncmFtID0+IHByb2dyYW1OYW1lLnNvbWUocHJvZ3JhbVNlYXJjaCA9PiBwcm9ncmFtU2VhcmNoID09IHByb2dyYW0ubmFtZSkgPiAwKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvZ3JhbU5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIFBST0dSQU1TLmZpbmQocHJvZ3JhbSA9PiBwcm9ncmFtLm5hbWUgPT09IHByb2dyYW1OYW1lKTtcbiAgfSBlbHNlIGlmIChwcm9ncmFtTmFtZSA9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gUFJPR1JBTVM7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGZhbHNlIGlmIG1vcmUgdGhhbiBvbmUgcHJvZ3JhbSBpc24ndCBpbnN0YWxsZWQuXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfEFycmF5PHN0cmluZz59IHByb2dyYW1zIFxuICovXG5mdW5jdGlvbiBoYXNQcm9ncmFtcyAocHJvZ3JhbXMpIHtcbiAgLy8gQ2hlY2sgcGxhdGZvcm0gc3VwcG9ydGVkXG4gIGlmICghcGxhdGZvcm1TdXBwb3J0ZWQoKSkgcmV0dXJuIEVSUk9SUy5VTlNVUFBPUlRFRF9QTEFURk9STTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShwcm9ncmFtcykpIHtcbiAgICByZXR1cm4gcHJvZ3JhbXMuZXZlcnkocHJvZ3JhbSA9PiB7XG4gICAgICByZXR1cm4gUFJPR1JBTVMuc29tZShwID0+IHAubmFtZSA9PT0gcHJvZ3JhbSk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2dyYW1zID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBQUk9HUkFNUy5zb21lKHAgPT4gcC5uYW1lID09PSBwcm9ncmFtcyk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldFByb2dyYW1zLFxuICBoYXNQcm9ncmFtc1xufTsiXX0=