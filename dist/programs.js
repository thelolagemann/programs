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

// Check if platform is supported
if (!COMMANDS.hasOwnProperty(_os2.default.platform())) throw Error(ERRORS.UNSUPPORTED_PLATFORM);

/** @var {Array}
 *  Attempts to load installed applications at runtime. Will return empty array if 
 *  the platform isn't currently supported */
var PROGRAMS = (0, _child_process.execSync)('' + COMMANDS[_os2.default.platform()], { encoding: 'utf8' }).split('\n').map(function (program) {
  return splitProgram(program);
}).filter(function (program) {
  return program.name !== undefined;
});

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
function getPrograms(programs) {
  // Determine what to find
  if (Array.isArray(programs)) {
    return PROGRAMS.filter(function (program) {
      return programs.some(function (programSearch) {
        return programSearch == program.name;
      }) > 0;
    });
  } else if (typeof programs === 'string') {
    return PROGRAMS.find(function (program) {
      return program.name === programs;
    });
  }
  return PROGRAMS;
}

/**
 * Returns false if more than one program isn't installed.
 * 
 * @param {string|Array<string>} programs
 * @returns {boolean}
 */
function hasPrograms(programs) {
  if (Array.isArray(programs)) {
    return programs.every(function (p) {
      return PROGRAMS.some(function (p2) {
        return p2.name === p;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQU1BOztBQUVBLElBQU0sV0FBVztBQUNmLFNBQU87QUFEUSxDQUFqQjs7QUFJQTs7QUFFQSxJQUFNLFNBQVM7QUFDYixpQ0FBNkIsYUFBRyxRQUFILEVBQTdCO0FBRGEsQ0FBZjs7QUFJQTtBQUNBLElBQUksQ0FBQyxTQUFTLGNBQVQsQ0FBd0IsYUFBRyxRQUFILEVBQXhCLENBQUwsRUFBNkMsTUFBTSxNQUFNLE9BQU8sb0JBQWIsQ0FBTjs7QUFFN0M7OztBQUdBLElBQU0sV0FBVyxrQ0FBWSxTQUFTLGFBQUcsUUFBSCxFQUFULENBQVosRUFBdUMsRUFBQyxVQUFVLE1BQVgsRUFBdkMsRUFBMkQsS0FBM0QsQ0FBaUUsSUFBakUsRUFDZCxHQURjLENBQ1YsbUJBQVc7QUFDZCxTQUFPLGFBQWEsT0FBYixDQUFQO0FBQ0QsQ0FIYyxFQUdaLE1BSFksQ0FHTCxtQkFBVztBQUNuQixTQUFPLFFBQVEsSUFBUixLQUFpQixTQUF4QjtBQUNELENBTGMsQ0FBakI7O0FBT0E7Ozs7Ozs7QUFPQSxTQUFTLE9BQVQsQ0FBa0IsR0FBbEIsRUFBdUIsR0FBdkIsRUFBNEIsS0FBNUIsRUFBbUM7QUFDakMsU0FBTyxJQUFJLEtBQUosQ0FBVSxHQUFWLEVBQWUsS0FBZixDQUFxQixLQUFyQixFQUE0QixJQUE1QixDQUFpQyxHQUFqQyxDQUFQO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BLFNBQVMsWUFBVCxDQUF1QixXQUF2QixFQUFvQztBQUNsQyxVQUFRLGFBQUcsUUFBSCxFQUFSO0FBQ0UsU0FBSyxPQUFMO0FBQ0UsVUFBSSxjQUFjLFlBQVksS0FBWixDQUFrQixLQUFsQixDQUFsQjtBQUNBLGFBQU87QUFDTCxnQkFBUSxRQUFRLFdBQVIsRUFBcUIsS0FBckIsRUFBNEIsQ0FBNUIsQ0FESDtBQUVMLG9CQUFZLFlBQVksQ0FBWixDQUZQO0FBR0wsZ0JBQVEsWUFBWSxDQUFaLENBSEg7QUFJTCxtQkFBVyxZQUFZLENBQVo7QUFKTixPQUFQO0FBTUY7QUFDRTtBQVZKO0FBWUQ7O0FBRUQ7Ozs7OztBQU1BLFNBQVMsV0FBVCxDQUFzQixRQUF0QixFQUFnQztBQUM5QjtBQUNBLE1BQUksTUFBTSxPQUFOLENBQWMsUUFBZCxDQUFKLEVBQTZCO0FBQzNCLFdBQU8sU0FBUyxNQUFULENBQWdCO0FBQUEsYUFBVyxTQUFTLElBQVQsQ0FBYztBQUFBLGVBQWlCLGlCQUFpQixRQUFRLElBQTFDO0FBQUEsT0FBZCxJQUFnRSxDQUEzRTtBQUFBLEtBQWhCLENBQVA7QUFDRCxHQUZELE1BRU8sSUFBSSxPQUFPLFFBQVAsS0FBb0IsUUFBeEIsRUFBa0M7QUFDdkMsV0FBTyxTQUFTLElBQVQsQ0FBYztBQUFBLGFBQVcsUUFBUSxJQUFSLEtBQWlCLFFBQTVCO0FBQUEsS0FBZCxDQUFQO0FBQ0Q7QUFDRCxTQUFPLFFBQVA7QUFDRDs7QUFFRDs7Ozs7O0FBTUEsU0FBUyxXQUFULENBQXNCLFFBQXRCLEVBQWdDO0FBQzlCLE1BQUksTUFBTSxPQUFOLENBQWMsUUFBZCxDQUFKLEVBQTZCO0FBQzNCLFdBQU8sU0FBUyxLQUFULENBQWU7QUFBQSxhQUFLLFNBQVMsSUFBVCxDQUFjO0FBQUEsZUFBTSxHQUFHLElBQUgsS0FBWSxDQUFsQjtBQUFBLE9BQWQsQ0FBTDtBQUFBLEtBQWYsQ0FBUDtBQUNELEdBRkQsTUFFTyxJQUFJLE9BQU8sUUFBUCxLQUFvQixRQUF4QixFQUFrQztBQUN2QyxXQUFPLFNBQVMsSUFBVCxDQUFjO0FBQUEsYUFBSyxFQUFFLElBQUYsS0FBVyxRQUFoQjtBQUFBLEtBQWQsQ0FBUDtBQUNEO0FBQ0QsU0FBTyxLQUFQO0FBQ0Q7O2tCQUVjO0FBQ2IsMEJBRGE7QUFFYjtBQUZhLEMiLCJmaWxlIjoicHJvZ3JhbXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IHsgZXhlY1N5bmMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcblxuLyoqXG4gKiBBIG1vZHVsZSB0aGF0IGZldGNoZXMgaW5zdGFsbGVkIGFwcGxpY2F0aW9uIGluZm9cbiAqIFxuICogQG1vZHVsZSBwcm9ncmFtc1xuICovXG5cbi8qKiBAdmFyIHtPYmplY3R9XG4gKiAgSG9sZHMgdGhlIHNoZWxsIGNvbW1hbmRzIHRvIGxpc3QgYWxsIGFwcGxpY2F0aW9ucy9wYWNrYWdlcyBmb3IgZWFjaCBzdXBwb3J0ZWQgcGxhdGZvcm0uKi9cbmNvbnN0IENPTU1BTkRTID0ge1xuICBsaW51eDogJ2Rwa2cgLWwnXG59O1xuXG4vKiogQHZhciB7T2JqZWN0fVxuICogRXJyb3JzIG9iamVjdCAqL1xuY29uc3QgRVJST1JTID0ge1xuICBVTlNVUFBPUlRFRF9QTEFURk9STTogYFRoZSAke29zLnBsYXRmb3JtKCl9IHBsYXRmb3JtIGlzbid0IGN1cnJlbnRseSBzdXBwb3J0ZWRgXG59O1xuXG4vLyBDaGVjayBpZiBwbGF0Zm9ybSBpcyBzdXBwb3J0ZWRcbmlmICghQ09NTUFORFMuaGFzT3duUHJvcGVydHkob3MucGxhdGZvcm0oKSkpIHRocm93IEVycm9yKEVSUk9SUy5VTlNVUFBPUlRFRF9QTEFURk9STSk7XG5cbi8qKiBAdmFyIHtBcnJheX1cbiAqICBBdHRlbXB0cyB0byBsb2FkIGluc3RhbGxlZCBhcHBsaWNhdGlvbnMgYXQgcnVudGltZS4gV2lsbCByZXR1cm4gZW1wdHkgYXJyYXkgaWYgXG4gKiAgdGhlIHBsYXRmb3JtIGlzbid0IGN1cnJlbnRseSBzdXBwb3J0ZWQgKi9cbmNvbnN0IFBST0dSQU1TID0gZXhlY1N5bmMoYCR7Q09NTUFORFNbb3MucGxhdGZvcm0oKV19YCwge2VuY29kaW5nOiAndXRmOCd9KS5zcGxpdCgnXFxuJylcbiAgLm1hcChwcm9ncmFtID0+IHtcbiAgICByZXR1cm4gc3BsaXRQcm9ncmFtKHByb2dyYW0pO1xuICB9KS5maWx0ZXIocHJvZ3JhbSA9PiB7XG4gICAgcmV0dXJuIHByb2dyYW0ubmFtZSAhPT0gdW5kZWZpbmVkO1xuICB9KTtcblxuLyoqXG4gKiBTcGxpdHMgdGhlIHByb3ZpZGVkIHN0cmluZyBvbiBudGggb2NjdXJlbmNlIG9mIGRlbGltaXRlci5cbiAqIFxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIHNlcGVyYXRlXG4gKiBAcGFyYW0gZGVsIFRoZSBkZWxpbWl0ZXIgdG8gc3BsaXQgYXRcbiAqIEBwYXJhbSBzdGFydCBOdGggb2NjdXJlbmNlIG9mIGRlbCB0byBzcGxpdCBhdFxuICovXG5mdW5jdGlvbiBzcGxpdEF0IChzdHIsIGRlbCwgc3RhcnQpIHtcbiAgcmV0dXJuIHN0ci5zcGxpdChkZWwpLnNsaWNlKHN0YXJ0KS5qb2luKFwiIFwiKTtcbn1cblxuLyoqXG4gKiBBdHRlbXB0cyB0byBzcGxpdCBwcm9ncmFtIHN0cmluZyBpbnRvIFByb2dyYW0gbmFtZSwgdmVyc2lvbiAmIGRlc2MgKE9TIGRlcGVuZGVudClcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IHByb2dyYW1OYW1lIFxuICogQHJldHVybnMge09iamVjdH0gT2JqZWN0IHJlcHJlc2VudGluZyB0aGUgcHJvZ3JhbSBpbmZvcm1hdGlvbiBmb3VuZFxuICovXG5mdW5jdGlvbiBzcGxpdFByb2dyYW0gKHByb2dyYW1OYW1lKSB7XG4gIHN3aXRjaCAob3MucGxhdGZvcm0oKSkge1xuICAgIGNhc2UgJ2xpbnV4JzpcbiAgICAgIGxldCBwcm9ncmFtSW5mbyA9IHByb2dyYW1OYW1lLnNwbGl0KC9cXHMrLyk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAnZGVzYyc6IHNwbGl0QXQocHJvZ3JhbU5hbWUsIC9cXHMrLywgNCksXG4gICAgICAgICdwbGF0Zm9ybSc6IHByb2dyYW1JbmZvWzNdLFxuICAgICAgICAnbmFtZSc6IHByb2dyYW1JbmZvWzFdLFxuICAgICAgICAndmVyc2lvbic6IHByb2dyYW1JbmZvWzJdXG4gICAgICB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxufVxuXG4vKipcbiAqIFNlYXJjaGVzIGluc3RhbGxlZCBhcHBsaWNhdGlvbnMgZm9yIHByb3ZpZGVkIHByb2dyYW0ocykuXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfEFycmF5LjxTdHJpbmc+fSBwcm9ncmFtTmFtZSBUaGUgcHJvZ3JhbSBuYW1lKHMpIHRvIHNlYXJjaCBmb3JcbiAqIEByZXR1cm5zIHtvYmplY3R8YXJyYXl8dW5kZWZpbmVkfSBSZXR1cm5zIGEgc2luZ3VsYXIgb2JqZWN0LCBhcnJheSBvZiBvYmplY3RzLCBvciB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gZ2V0UHJvZ3JhbXMgKHByb2dyYW1zKSB7XG4gIC8vIERldGVybWluZSB3aGF0IHRvIGZpbmRcbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvZ3JhbXMpKSB7XG4gICAgcmV0dXJuIFBST0dSQU1TLmZpbHRlcihwcm9ncmFtID0+IHByb2dyYW1zLnNvbWUocHJvZ3JhbVNlYXJjaCA9PiBwcm9ncmFtU2VhcmNoID09IHByb2dyYW0ubmFtZSkgPiAwKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvZ3JhbXMgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIFBST0dSQU1TLmZpbmQocHJvZ3JhbSA9PiBwcm9ncmFtLm5hbWUgPT09IHByb2dyYW1zKTtcbiAgfVxuICByZXR1cm4gUFJPR1JBTVM7XG59XG5cbi8qKlxuICogUmV0dXJucyBmYWxzZSBpZiBtb3JlIHRoYW4gb25lIHByb2dyYW0gaXNuJ3QgaW5zdGFsbGVkLlxuICogXG4gKiBAcGFyYW0ge3N0cmluZ3xBcnJheTxzdHJpbmc+fSBwcm9ncmFtc1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGhhc1Byb2dyYW1zIChwcm9ncmFtcykge1xuICBpZiAoQXJyYXkuaXNBcnJheShwcm9ncmFtcykpIHtcbiAgICByZXR1cm4gcHJvZ3JhbXMuZXZlcnkocCA9PiBQUk9HUkFNUy5zb21lKHAyID0+IHAyLm5hbWUgPT09IHApKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvZ3JhbXMgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIFBST0dSQU1TLnNvbWUocCA9PiBwLm5hbWUgPT09IHByb2dyYW1zKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0UHJvZ3JhbXMsXG4gIGhhc1Byb2dyYW1zXG59OyJdfQ==