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
 * Searches installed applications for provided program(s).
 * 
 * @param {string|Array.<String>} programName The program name to search for
 * @returns {object|array|undefined} Returns a singular object, array of objects, or undefined
 */
function getProgram(programName) {
  if (Array.isArray(programName)) {
    return PROGRAMS.filter(function (program) {
      return programName.some(function (programSearch) {
        return programSearch == program.name;
      }) > 0;
    });
  } else if (programName instanceof String) {
    return PROGRAMS.find(function (program) {
      return program.name === programName;
    });
  }
}

exports.default = {
  allPrograms: allPrograms,
  getProgram: getProgram
};
module.exports = exports['default'];

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFFQTtBQUNBLElBQUksVUFBVSxJQUFJLHVCQUFRLFdBQVosQ0FBd0IsT0FBeEIsQ0FBZDs7QUFFQTs7Ozs7O0FBTUE7O0FBRUEsSUFBTSxXQUFXO0FBQ2YsU0FBTztBQURRLENBQWpCOztBQUlBOzs7QUFHQSxJQUFNLFdBQVcsc0JBQXNCLFVBQVUsa0NBQVksU0FBUyxhQUFHLFFBQUgsRUFBVCxDQUFaLENBQVYsRUFBa0QsS0FBbEQsQ0FBd0QsSUFBeEQsRUFDcEMsR0FEb0MsQ0FDaEMsbUJBQVc7QUFDZCxTQUFPLGFBQWEsT0FBYixDQUFQO0FBQ0QsQ0FIb0MsRUFHbEMsTUFIa0MsQ0FHM0IsbUJBQVc7QUFDbkIsU0FBTyxRQUFRLElBQVIsS0FBaUIsU0FBeEI7QUFDRCxDQUxvQyxDQUF0QixHQUtWLEVBTFA7O0FBT0E7Ozs7Ozs7QUFPQSxTQUFTLE9BQVQsQ0FBa0IsR0FBbEIsRUFBdUIsR0FBdkIsRUFBNEIsS0FBNUIsRUFBbUM7QUFDakMsU0FBTyxJQUFJLEtBQUosQ0FBVSxHQUFWLEVBQWUsS0FBZixDQUFxQixLQUFyQixFQUE0QixJQUE1QixDQUFpQyxHQUFqQyxDQUFQO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsU0FBUyxTQUFULENBQW9CLElBQXBCLEVBQTBCO0FBQ3hCLFNBQU8sUUFBUSxNQUFSLENBQWUsSUFBZixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsU0FBUyxpQkFBVCxHQUE4QjtBQUM1QixTQUFPLFNBQVMsY0FBVCxDQUF3QixhQUFHLFFBQUgsRUFBeEIsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7QUFNQSxTQUFTLFlBQVQsQ0FBdUIsV0FBdkIsRUFBb0M7QUFDbEMsVUFBUSxhQUFHLFFBQUgsRUFBUjtBQUNFLFNBQUssT0FBTDtBQUNFLFVBQUksY0FBYyxZQUFZLEtBQVosQ0FBa0IsS0FBbEIsQ0FBbEI7QUFDQSxhQUFPO0FBQ0wsZ0JBQVEsUUFBUSxXQUFSLEVBQXFCLEtBQXJCLEVBQTRCLENBQTVCLENBREg7QUFFTCxvQkFBWSxZQUFZLENBQVosQ0FGUDtBQUdMLGdCQUFRLFlBQVksQ0FBWixDQUhIO0FBSUwsbUJBQVcsWUFBWSxDQUFaO0FBSk4sT0FBUDtBQU1GLFNBQUssT0FBTDtBQUNFO0FBQ0Y7QUFDRTtBQVpKO0FBY0Q7O0FBRUQ7Ozs7O0FBS0EsU0FBUyxXQUFULEdBQXdCO0FBQ3RCLFNBQU8sUUFBUDtBQUNEOztBQUVEOzs7Ozs7QUFNQSxTQUFTLFVBQVQsQ0FBcUIsV0FBckIsRUFBa0M7QUFDaEMsTUFBSSxNQUFNLE9BQU4sQ0FBYyxXQUFkLENBQUosRUFBZ0M7QUFDOUIsV0FBTyxTQUFTLE1BQVQsQ0FBZ0I7QUFBQSxhQUFXLFlBQVksSUFBWixDQUFpQjtBQUFBLGVBQWlCLGlCQUFpQixRQUFRLElBQTFDO0FBQUEsT0FBakIsSUFBbUUsQ0FBOUU7QUFBQSxLQUFoQixDQUFQO0FBQ0QsR0FGRCxNQUVPLElBQUksdUJBQXVCLE1BQTNCLEVBQW1DO0FBQ3hDLFdBQU8sU0FBUyxJQUFULENBQWM7QUFBQSxhQUFXLFFBQVEsSUFBUixLQUFpQixXQUE1QjtBQUFBLEtBQWQsQ0FBUDtBQUNEO0FBQ0Y7O2tCQUVjO0FBQ2IsMEJBRGE7QUFFYjtBQUZhLEMiLCJmaWxlIjoicHJvZ3JhbXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IHsgZXhlY1N5bmMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCBlbmNvZGVyIGZyb20gJ3RleHQtZW5jb2RpbmcnO1xuXG4vLyBDcmVhdGUgZ2xvYmFsIHV0ZjggZGVjb2RlclxudmFyIGRlY29kZXIgPSBuZXcgZW5jb2Rlci5UZXh0RGVjb2RlcihcInV0Zi04XCIpO1xuXG4vKipcbiAqIEEgbW9kdWxlIHRoYXQgZmV0Y2hlcyBpbnN0YWxsZWQgYXBwbGljYXRpb24gaW5mb1xuICogXG4gKiBAbW9kdWxlIHByb2dyYW1zXG4gKi9cblxuLyoqIEB2YXIge09iamVjdH1cbiAqICBIb2xkcyB0aGUgc2hlbGwgY29tbWFuZHMgdG8gbGlzdCBhbGwgYXBwbGljYXRpb25zL3BhY2thZ2VzIGZvciBlYWNoIHN1cHBvcnRlZCBwbGF0Zm9ybS4qL1xuY29uc3QgQ09NTUFORFMgPSB7XG4gIGxpbnV4OiAnZHBrZyAtbCdcbn07XG5cbi8qKiBAdmFyIHtBcnJheX1cbiAqICBBdHRlbXB0cyB0byBsb2FkIGluc3RhbGxlZCBhcHBsaWNhdGlvbnMgYXQgcnVudGltZS4gV2lsbCByZXR1cm4gZW1wdHkgYXJyYXkgaWYgXG4gKiAgdGhlIHBsYXRmb3JtIGlzbid0IGN1cnJlbnRseSBzdXBwb3J0ZWQgKi9cbmNvbnN0IFBST0dSQU1TID0gcGxhdGZvcm1TdXBwb3J0ZWQoKSA/IHVpbnRUb1N0cihleGVjU3luYyhgJHtDT01NQU5EU1tvcy5wbGF0Zm9ybSgpXX1gKSkuc3BsaXQoJ1xcbicpXG4gIC5tYXAocHJvZ3JhbSA9PiB7XG4gICAgcmV0dXJuIHNwbGl0UHJvZ3JhbShwcm9ncmFtKTtcbiAgfSkuZmlsdGVyKHByb2dyYW0gPT4ge1xuICAgIHJldHVybiBwcm9ncmFtLm5hbWUgIT09IHVuZGVmaW5lZDtcbiAgfSkgOiBbXTtcblxuLyoqXG4gKiBTcGxpdHMgdGhlIHByb3ZpZGVkIHN0cmluZyBvbiBudGggb2NjdXJlbmNlIG9mIGRlbGltaXRlci5cbiAqIFxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIHNlcGVyYXRlXG4gKiBAcGFyYW0gZGVsIFRoZSBkZWxpbWl0ZXIgdG8gc3BsaXQgYXRcbiAqIEBwYXJhbSBzdGFydCBOdGggb2NjdXJlbmNlIG9mIGRlbCB0byBzcGxpdCBhdFxuICovXG5mdW5jdGlvbiBzcGxpdEF0IChzdHIsIGRlbCwgc3RhcnQpIHtcbiAgcmV0dXJuIHN0ci5zcGxpdChkZWwpLnNsaWNlKHN0YXJ0KS5qb2luKFwiIFwiKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIGZyb20gYSBVSW50QXJyYXk4XG4gKiBcbiAqIEBwYXJhbSB7VUludEFycmF5OH0gdWludCBcbiAqL1xuZnVuY3Rpb24gdWludFRvU3RyICh1aW50KSB7XG4gIHJldHVybiBkZWNvZGVyLmRlY29kZSh1aW50KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBsYXRmb3JtIGlzIHN1cHBvcnRlZC5cbiAqIFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gcGxhdGZvcm1TdXBwb3J0ZWQgKCkge1xuICByZXR1cm4gQ09NTUFORFMuaGFzT3duUHJvcGVydHkob3MucGxhdGZvcm0oKSk7XG59XG5cbi8qKlxuICogQXR0ZW1wdHMgdG8gc3BsaXQgcHJvZ3JhbSBzdHJpbmcgaW50byBQcm9ncmFtIG5hbWUsIHZlcnNpb24gJiBkZXNjIChPUyBkZXBlbmRlbnQpXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9ncmFtTmFtZSBcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCByZXByZXNlbnRpbmcgdGhlIHByb2dyYW0gaW5mb3JtYXRpb24gZm91bmRcbiAqL1xuZnVuY3Rpb24gc3BsaXRQcm9ncmFtIChwcm9ncmFtTmFtZSkge1xuICBzd2l0Y2ggKG9zLnBsYXRmb3JtKCkpIHtcbiAgICBjYXNlICdsaW51eCc6XG4gICAgICBsZXQgcHJvZ3JhbUluZm8gPSBwcm9ncmFtTmFtZS5zcGxpdCgvXFxzKy8pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ2Rlc2MnOiBzcGxpdEF0KHByb2dyYW1OYW1lLCAvXFxzKy8sIDQpLFxuICAgICAgICAncGxhdGZvcm0nOiBwcm9ncmFtSW5mb1szXSxcbiAgICAgICAgJ25hbWUnOiBwcm9ncmFtSW5mb1sxXSxcbiAgICAgICAgJ3ZlcnNpb24nOiBwcm9ncmFtSW5mb1syXVxuICAgICAgfTtcbiAgICBjYXNlICd3aW4zMic6XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgaW5zdGFsbGVkIHByb2dyYW1zLlxuICogXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gYWxsUHJvZ3JhbXMgKCkge1xuICByZXR1cm4gUFJPR1JBTVM7XG59XG5cbi8qKlxuICogU2VhcmNoZXMgaW5zdGFsbGVkIGFwcGxpY2F0aW9ucyBmb3IgcHJvdmlkZWQgcHJvZ3JhbShzKS5cbiAqIFxuICogQHBhcmFtIHtzdHJpbmd8QXJyYXkuPFN0cmluZz59IHByb2dyYW1OYW1lIFRoZSBwcm9ncmFtIG5hbWUgdG8gc2VhcmNoIGZvclxuICogQHJldHVybnMge29iamVjdHxhcnJheXx1bmRlZmluZWR9IFJldHVybnMgYSBzaW5ndWxhciBvYmplY3QsIGFycmF5IG9mIG9iamVjdHMsIG9yIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBnZXRQcm9ncmFtIChwcm9ncmFtTmFtZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShwcm9ncmFtTmFtZSkpIHtcbiAgICByZXR1cm4gUFJPR1JBTVMuZmlsdGVyKHByb2dyYW0gPT4gcHJvZ3JhbU5hbWUuc29tZShwcm9ncmFtU2VhcmNoID0+IHByb2dyYW1TZWFyY2ggPT0gcHJvZ3JhbS5uYW1lKSA+IDApO1xuICB9IGVsc2UgaWYgKHByb2dyYW1OYW1lIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgcmV0dXJuIFBST0dSQU1TLmZpbmQocHJvZ3JhbSA9PiBwcm9ncmFtLm5hbWUgPT09IHByb2dyYW1OYW1lKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFsbFByb2dyYW1zLFxuICBnZXRQcm9ncmFtXG59OyJdfQ==