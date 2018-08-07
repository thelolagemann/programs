'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _child_process = require('child_process');

var _textEncoding = require('text-encoding');

var _textEncoding2 = _interopRequireDefault(_textEncoding);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create global utf8 decoder
var decoder = new _textEncoding2.default.TextDecoder("utf-8");

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

/** @var {Array}
 *  Attempts to load installed applications at runtime. Will return empty array if 
 *  the platform isn't currently supported */
var PROGRAMS = platformSupported() ? uintToStr((0, _child_process.execSync)('' + COMMANDS[_os2.default.platform()])).split('\n').map(function (program) {
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
 * Returns a string from a UIntArray8
 * 
 * @param {UIntArray8} uint 
 */
function uintToStr(uint) {
  return decoder.decode(uint);
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
 * Returns a list of all installed programs.
 * 
 * @return {Array}
 */
function allPrograms() {
  return PROGRAMS;
}

/**
 * Searches installed applications for provided program.
 * 
 * @param {string} programName The program name to search for
 * @returns {object|boolean} Returns an object of program information or false
 */
function getProgram(programName) {
  var program = PROGRAMS.find(function (program) {
    return program.name === programName;
  });
  return program ? program : false;
}

exports.default = {
  allPrograms: allPrograms,
  getProgram: getProgram
};
module.exports = exports['default'];

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFFQTtBQUNBLElBQUksVUFBVSxJQUFJLHVCQUFRLFdBQVosQ0FBd0IsT0FBeEIsQ0FBZDs7QUFFQTs7Ozs7O0FBTUE7O0FBRUEsSUFBTSxXQUFXO0FBQ2YsU0FBTztBQURRLENBQWpCOztBQUlBOzs7QUFHQSxJQUFNLFdBQVcsc0JBQXNCLFVBQVUsa0NBQVksU0FBUyxhQUFHLFFBQUgsRUFBVCxDQUFaLENBQVYsRUFBa0QsS0FBbEQsQ0FBd0QsSUFBeEQsRUFDcEMsR0FEb0MsQ0FDaEMsbUJBQVc7QUFDZCxTQUFPLGFBQWEsT0FBYixDQUFQO0FBQ0QsQ0FIb0MsRUFHbEMsTUFIa0MsQ0FHM0IsbUJBQVc7QUFDbkIsU0FBTyxRQUFRLElBQVIsS0FBaUIsU0FBeEI7QUFDRCxDQUxvQyxDQUF0QixHQUtWLEVBTFA7O0FBT0E7Ozs7Ozs7QUFPQSxTQUFTLE9BQVQsQ0FBa0IsR0FBbEIsRUFBdUIsR0FBdkIsRUFBNEIsS0FBNUIsRUFBbUM7QUFDakMsU0FBTyxJQUFJLEtBQUosQ0FBVSxHQUFWLEVBQWUsS0FBZixDQUFxQixLQUFyQixFQUE0QixJQUE1QixDQUFpQyxHQUFqQyxDQUFQO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsU0FBUyxTQUFULENBQW9CLElBQXBCLEVBQTBCO0FBQ3hCLFNBQU8sUUFBUSxNQUFSLENBQWUsSUFBZixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsU0FBUyxpQkFBVCxHQUE4QjtBQUM1QixTQUFPLFNBQVMsY0FBVCxDQUF3QixhQUFHLFFBQUgsRUFBeEIsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7QUFNQSxTQUFTLFlBQVQsQ0FBdUIsV0FBdkIsRUFBb0M7QUFDbEMsVUFBUSxhQUFHLFFBQUgsRUFBUjtBQUNFLFNBQUssT0FBTDtBQUNFLFVBQUksY0FBYyxZQUFZLEtBQVosQ0FBa0IsS0FBbEIsQ0FBbEI7QUFDQSxhQUFPO0FBQ0wsZ0JBQVEsUUFBUSxXQUFSLEVBQXFCLEtBQXJCLEVBQTRCLENBQTVCLENBREg7QUFFTCxvQkFBWSxZQUFZLENBQVosQ0FGUDtBQUdMLGdCQUFRLFlBQVksQ0FBWixDQUhIO0FBSUwsbUJBQVcsWUFBWSxDQUFaO0FBSk4sT0FBUDtBQU1GLFNBQUssT0FBTDtBQUNFO0FBQ0Y7QUFDRTtBQVpKO0FBY0Q7O0FBRUQ7Ozs7O0FBS0EsU0FBUyxXQUFULEdBQXdCO0FBQ3RCLFNBQU8sUUFBUDtBQUNEOztBQUVEOzs7Ozs7QUFNQSxTQUFTLFVBQVQsQ0FBcUIsV0FBckIsRUFBa0M7QUFDaEMsTUFBSSxVQUFVLFNBQVMsSUFBVCxDQUFjO0FBQUEsV0FBVyxRQUFRLElBQVIsS0FBaUIsV0FBNUI7QUFBQSxHQUFkLENBQWQ7QUFDQSxTQUFPLFVBQVUsT0FBVixHQUFvQixLQUEzQjtBQUNEOztrQkFFYztBQUNiLDBCQURhO0FBRWI7QUFGYSxDIiwiZmlsZSI6InByb2dyYW1zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9zIGZyb20gJ29zJztcbmltcG9ydCB7IGV4ZWNTeW5jIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQgZW5jb2RlciBmcm9tICd0ZXh0LWVuY29kaW5nJztcblxuLy8gQ3JlYXRlIGdsb2JhbCB1dGY4IGRlY29kZXJcbnZhciBkZWNvZGVyID0gbmV3IGVuY29kZXIuVGV4dERlY29kZXIoXCJ1dGYtOFwiKTtcblxuLyoqXG4gKiBBIG1vZHVsZSB0aGF0IGZldGNoZXMgaW5zdGFsbGVkIGFwcGxpY2F0aW9uIGluZm9cbiAqIFxuICogQG1vZHVsZSBwcm9ncmFtc1xuICovXG5cbi8qKiBAdmFyIHtPYmplY3R9XG4gKiAgSG9sZHMgdGhlIHNoZWxsIGNvbW1hbmRzIHRvIGxpc3QgYWxsIGFwcGxpY2F0aW9ucy9wYWNrYWdlcyBmb3IgZWFjaCBzdXBwb3J0ZWQgcGxhdGZvcm0uKi9cbmNvbnN0IENPTU1BTkRTID0ge1xuICBsaW51eDogJ2Rwa2cgLWwnXG59O1xuXG4vKiogQHZhciB7QXJyYXl9XG4gKiAgQXR0ZW1wdHMgdG8gbG9hZCBpbnN0YWxsZWQgYXBwbGljYXRpb25zIGF0IHJ1bnRpbWUuIFdpbGwgcmV0dXJuIGVtcHR5IGFycmF5IGlmIFxuICogIHRoZSBwbGF0Zm9ybSBpc24ndCBjdXJyZW50bHkgc3VwcG9ydGVkICovXG5jb25zdCBQUk9HUkFNUyA9IHBsYXRmb3JtU3VwcG9ydGVkKCkgPyB1aW50VG9TdHIoZXhlY1N5bmMoYCR7Q09NTUFORFNbb3MucGxhdGZvcm0oKV19YCkpLnNwbGl0KCdcXG4nKVxuICAubWFwKHByb2dyYW0gPT4ge1xuICAgIHJldHVybiBzcGxpdFByb2dyYW0ocHJvZ3JhbSk7XG4gIH0pLmZpbHRlcihwcm9ncmFtID0+IHtcbiAgICByZXR1cm4gcHJvZ3JhbS5uYW1lICE9PSB1bmRlZmluZWQ7XG4gIH0pIDogW107XG5cbi8qKlxuICogU3BsaXRzIHRoZSBwcm92aWRlZCBzdHJpbmcgb24gbnRoIG9jY3VyZW5jZSBvZiBkZWxpbWl0ZXIuXG4gKiBcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBzZXBlcmF0ZVxuICogQHBhcmFtIGRlbCBUaGUgZGVsaW1pdGVyIHRvIHNwbGl0IGF0XG4gKiBAcGFyYW0gc3RhcnQgTnRoIG9jY3VyZW5jZSBvZiBkZWwgdG8gc3BsaXQgYXRcbiAqL1xuZnVuY3Rpb24gc3BsaXRBdCAoc3RyLCBkZWwsIHN0YXJ0KSB7XG4gIHJldHVybiBzdHIuc3BsaXQoZGVsKS5zbGljZShzdGFydCkuam9pbihcIiBcIik7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyBmcm9tIGEgVUludEFycmF5OFxuICogXG4gKiBAcGFyYW0ge1VJbnRBcnJheTh9IHVpbnQgXG4gKi9cbmZ1bmN0aW9uIHVpbnRUb1N0ciAodWludCkge1xuICByZXR1cm4gZGVjb2Rlci5kZWNvZGUodWludCk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBwbGF0Zm9ybSBpcyBzdXBwb3J0ZWQuXG4gKiBcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIHBsYXRmb3JtU3VwcG9ydGVkICgpIHtcbiAgcmV0dXJuIENPTU1BTkRTLmhhc093blByb3BlcnR5KG9zLnBsYXRmb3JtKCkpO1xufVxuXG4vKipcbiAqIEF0dGVtcHRzIHRvIHNwbGl0IHByb2dyYW0gc3RyaW5nIGludG8gUHJvZ3JhbSBuYW1lLCB2ZXJzaW9uICYgZGVzYyAoT1MgZGVwZW5kZW50KVxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvZ3JhbU5hbWUgXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBPYmplY3QgcmVwcmVzZW50aW5nIHRoZSBwcm9ncmFtIGluZm9ybWF0aW9uIGZvdW5kXG4gKi9cbmZ1bmN0aW9uIHNwbGl0UHJvZ3JhbSAocHJvZ3JhbU5hbWUpIHtcbiAgc3dpdGNoIChvcy5wbGF0Zm9ybSgpKSB7XG4gICAgY2FzZSAnbGludXgnOlxuICAgICAgbGV0IHByb2dyYW1JbmZvID0gcHJvZ3JhbU5hbWUuc3BsaXQoL1xccysvKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdkZXNjJzogc3BsaXRBdChwcm9ncmFtTmFtZSwgL1xccysvLCA0KSxcbiAgICAgICAgJ3BsYXRmb3JtJzogcHJvZ3JhbUluZm9bM10sXG4gICAgICAgICduYW1lJzogcHJvZ3JhbUluZm9bMV0sXG4gICAgICAgICd2ZXJzaW9uJzogcHJvZ3JhbUluZm9bMl1cbiAgICAgIH07XG4gICAgY2FzZSAnd2luMzInOlxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIGluc3RhbGxlZCBwcm9ncmFtcy5cbiAqIFxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIGFsbFByb2dyYW1zICgpIHtcbiAgcmV0dXJuIFBST0dSQU1TO1xufVxuXG4vKipcbiAqIFNlYXJjaGVzIGluc3RhbGxlZCBhcHBsaWNhdGlvbnMgZm9yIHByb3ZpZGVkIHByb2dyYW0uXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9ncmFtTmFtZSBUaGUgcHJvZ3JhbSBuYW1lIHRvIHNlYXJjaCBmb3JcbiAqIEByZXR1cm5zIHtvYmplY3R8Ym9vbGVhbn0gUmV0dXJucyBhbiBvYmplY3Qgb2YgcHJvZ3JhbSBpbmZvcm1hdGlvbiBvciBmYWxzZVxuICovXG5mdW5jdGlvbiBnZXRQcm9ncmFtIChwcm9ncmFtTmFtZSkge1xuICBsZXQgcHJvZ3JhbSA9IFBST0dSQU1TLmZpbmQocHJvZ3JhbSA9PiBwcm9ncmFtLm5hbWUgPT09IHByb2dyYW1OYW1lKTtcbiAgcmV0dXJuIHByb2dyYW0gPyBwcm9ncmFtIDogZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYWxsUHJvZ3JhbXMsXG4gIGdldFByb2dyYW1cbn07Il19