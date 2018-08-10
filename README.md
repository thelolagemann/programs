# programs
A small module to check the installed applications and their versions

## Install
```sh
$ npm install node-programs --save
```

## Usage
```javascript
// ES6
import { hasPrograms, getPrograms } from 'node-programs'

// ES5
const { hasPrograms, getPrograms } = require('node-programs');

// Boolean if installed
console.log(hasPrograms('ffmpeg'))
console.log(hasPrograms(['ffmpeg', 'firefox'])) 

// Singular object, arr of objs or undefined
console.log(getPrograms('zip')) // object or undefined
console.log(getPrograms(['xterm', 'yelp'])) // array of objects
```

## Notes
- Currently only works on Linux distros with dpkg

