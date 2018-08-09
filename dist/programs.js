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

var ERRORS = {
  UNSUPPORTED_PLATFORM: 'The ' + _os2.default.platform() + ' platform isn\'t currently supported'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQUEsT0FBZCxDQUFQO0FBQ0QsS0FGTSxDQUFQO0FBR0QsR0FKRCxNQUlPLElBQUksT0FBTyxRQUFQLEtBQW9CLFFBQXhCLEVBQWtDO0FBQ3ZDLFdBQU8sU0FBUyxJQUFULENBQWM7QUFBQSxhQUFLLEVBQUUsSUFBRixLQUFXLFFBQWhCO0FBQUEsS0FBZCxDQUFQO0FBQ0Q7QUFDRCxTQUFPLEtBQVA7QUFDRDs7a0JBRWM7QUFDYiwwQkFEYTtBQUViO0FBRmEsQyIsImZpbGUiOiJwcm9ncmFtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvcyBmcm9tICdvcyc7XG5pbXBvcnQgeyBleGVjU3luYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IGVuY29kZXIgZnJvbSAndGV4dC1lbmNvZGluZyc7XG5cbi8vIENyZWF0ZSBnbG9iYWwgdXRmOCBkZWNvZGVyXG52YXIgZGVjb2RlciA9IG5ldyBlbmNvZGVyLlRleHREZWNvZGVyKFwidXRmLThcIik7XG5cbi8qKlxuICogQSBtb2R1bGUgdGhhdCBmZXRjaGVzIGluc3RhbGxlZCBhcHBsaWNhdGlvbiBpbmZvXG4gKiBcbiAqIEBtb2R1bGUgcHJvZ3JhbXNcbiAqL1xuXG4vKiogQHZhciB7T2JqZWN0fVxuICogIEhvbGRzIHRoZSBzaGVsbCBjb21tYW5kcyB0byBsaXN0IGFsbCBhcHBsaWNhdGlvbnMvcGFja2FnZXMgZm9yIGVhY2ggc3VwcG9ydGVkIHBsYXRmb3JtLiovXG5jb25zdCBDT01NQU5EUyA9IHtcbiAgbGludXg6ICdkcGtnIC1sJ1xufTtcblxuY29uc3QgRVJST1JTID0ge1xuICBVTlNVUFBPUlRFRF9QTEFURk9STTogYFRoZSAke29zLnBsYXRmb3JtKCl9IHBsYXRmb3JtIGlzbid0IGN1cnJlbnRseSBzdXBwb3J0ZWRgXG59O1xuXG4vKiogQHZhciB7QXJyYXl9XG4gKiAgQXR0ZW1wdHMgdG8gbG9hZCBpbnN0YWxsZWQgYXBwbGljYXRpb25zIGF0IHJ1bnRpbWUuIFdpbGwgcmV0dXJuIGVtcHR5IGFycmF5IGlmIFxuICogIHRoZSBwbGF0Zm9ybSBpc24ndCBjdXJyZW50bHkgc3VwcG9ydGVkICovXG5jb25zdCBQUk9HUkFNUyA9IHBsYXRmb3JtU3VwcG9ydGVkKCkgPyB1aW50VG9TdHIoZXhlY1N5bmMoYCR7Q09NTUFORFNbb3MucGxhdGZvcm0oKV19YCkpLnNwbGl0KCdcXG4nKVxuICAubWFwKHByb2dyYW0gPT4ge1xuICAgIHJldHVybiBzcGxpdFByb2dyYW0ocHJvZ3JhbSk7XG4gIH0pLmZpbHRlcihwcm9ncmFtID0+IHtcbiAgICByZXR1cm4gcHJvZ3JhbS5uYW1lICE9PSB1bmRlZmluZWQ7XG4gIH0pIDogW107XG5cbi8qKlxuICogU3BsaXRzIHRoZSBwcm92aWRlZCBzdHJpbmcgb24gbnRoIG9jY3VyZW5jZSBvZiBkZWxpbWl0ZXIuXG4gKiBcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBzZXBlcmF0ZVxuICogQHBhcmFtIGRlbCBUaGUgZGVsaW1pdGVyIHRvIHNwbGl0IGF0XG4gKiBAcGFyYW0gc3RhcnQgTnRoIG9jY3VyZW5jZSBvZiBkZWwgdG8gc3BsaXQgYXRcbiAqL1xuZnVuY3Rpb24gc3BsaXRBdCAoc3RyLCBkZWwsIHN0YXJ0KSB7XG4gIHJldHVybiBzdHIuc3BsaXQoZGVsKS5zbGljZShzdGFydCkuam9pbihcIiBcIik7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyBmcm9tIGEgVUludEFycmF5OFxuICogXG4gKiBAcGFyYW0ge1VJbnRBcnJheTh9IHVpbnQgXG4gKi9cbmZ1bmN0aW9uIHVpbnRUb1N0ciAodWludCkge1xuICByZXR1cm4gZGVjb2Rlci5kZWNvZGUodWludCk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBwbGF0Zm9ybSBpcyBzdXBwb3J0ZWQuXG4gKiBcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIHBsYXRmb3JtU3VwcG9ydGVkICgpIHtcbiAgcmV0dXJuIENPTU1BTkRTLmhhc093blByb3BlcnR5KG9zLnBsYXRmb3JtKCkpO1xufVxuXG4vKipcbiAqIEF0dGVtcHRzIHRvIHNwbGl0IHByb2dyYW0gc3RyaW5nIGludG8gUHJvZ3JhbSBuYW1lLCB2ZXJzaW9uICYgZGVzYyAoT1MgZGVwZW5kZW50KVxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvZ3JhbU5hbWUgXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBPYmplY3QgcmVwcmVzZW50aW5nIHRoZSBwcm9ncmFtIGluZm9ybWF0aW9uIGZvdW5kXG4gKi9cbmZ1bmN0aW9uIHNwbGl0UHJvZ3JhbSAocHJvZ3JhbU5hbWUpIHtcbiAgc3dpdGNoIChvcy5wbGF0Zm9ybSgpKSB7XG4gICAgY2FzZSAnbGludXgnOlxuICAgICAgbGV0IHByb2dyYW1JbmZvID0gcHJvZ3JhbU5hbWUuc3BsaXQoL1xccysvKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdkZXNjJzogc3BsaXRBdChwcm9ncmFtTmFtZSwgL1xccysvLCA0KSxcbiAgICAgICAgJ3BsYXRmb3JtJzogcHJvZ3JhbUluZm9bM10sXG4gICAgICAgICduYW1lJzogcHJvZ3JhbUluZm9bMV0sXG4gICAgICAgICd2ZXJzaW9uJzogcHJvZ3JhbUluZm9bMl1cbiAgICAgIH07XG4gICAgY2FzZSAnd2luMzInOlxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbi8qKlxuICogU2VhcmNoZXMgaW5zdGFsbGVkIGFwcGxpY2F0aW9ucyBmb3IgcHJvdmlkZWQgcHJvZ3JhbShzKS5cbiAqIFxuICogQHBhcmFtIHtzdHJpbmd8QXJyYXkuPFN0cmluZz59IHByb2dyYW1OYW1lIFRoZSBwcm9ncmFtIG5hbWUocykgdG8gc2VhcmNoIGZvclxuICogQHJldHVybnMge29iamVjdHxhcnJheXx1bmRlZmluZWR9IFJldHVybnMgYSBzaW5ndWxhciBvYmplY3QsIGFycmF5IG9mIG9iamVjdHMsIG9yIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBnZXRQcm9ncmFtcyAocHJvZ3JhbU5hbWUpIHtcbiAgLy8gQ2hlY2sgcGxhdGZvcm0gc3VwcG9ydGVkXG4gIGlmICghcGxhdGZvcm1TdXBwb3J0ZWQoKSkgcmV0dXJuIEVSUk9SUy5VTlNVUFBPUlRFRF9QTEFURk9STTtcblxuICAvLyBEZXRlcm1pbmUgd2hhdCB0byBmaW5kXG4gIGlmIChBcnJheS5pc0FycmF5KHByb2dyYW1OYW1lKSkge1xuICAgIHJldHVybiBQUk9HUkFNUy5maWx0ZXIocHJvZ3JhbSA9PiBwcm9ncmFtTmFtZS5zb21lKHByb2dyYW1TZWFyY2ggPT4gcHJvZ3JhbVNlYXJjaCA9PSBwcm9ncmFtLm5hbWUpID4gMCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2dyYW1OYW1lID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBQUk9HUkFNUy5maW5kKHByb2dyYW0gPT4gcHJvZ3JhbS5uYW1lID09PSBwcm9ncmFtTmFtZSk7XG4gIH0gZWxzZSBpZiAocHJvZ3JhbU5hbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIFBST0dSQU1TO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyBmYWxzZSBpZiBtb3JlIHRoYW4gb25lIHByb2dyYW0gaXNuJ3QgaW5zdGFsbGVkLlxuICogXG4gKiBAcGFyYW0ge3N0cmluZ3xBcnJheTxzdHJpbmc+fSBwcm9ncmFtcyBcbiAqL1xuZnVuY3Rpb24gaGFzUHJvZ3JhbXMgKHByb2dyYW1zKSB7XG4gIC8vIENoZWNrIHBsYXRmb3JtIHN1cHBvcnRlZFxuICBpZiAoIXBsYXRmb3JtU3VwcG9ydGVkKCkpIHJldHVybiBFUlJPUlMuVU5TVVBQT1JURURfUExBVEZPUk07XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvZ3JhbXMpKSB7XG4gICAgcmV0dXJuIHByb2dyYW1zLmV2ZXJ5KHByb2dyYW0gPT4ge1xuICAgICAgcmV0dXJuIFBST0dSQU1TLnNvbWUocCA9PiBwLm5hbWUgPT09IHByb2dyYW0pO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9ncmFtcyA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gUFJPR1JBTVMuc29tZShwID0+IHAubmFtZSA9PT0gcHJvZ3JhbXMpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRQcm9ncmFtcyxcbiAgaGFzUHJvZ3JhbXNcbn07Il19