/**
 * GROWI agent for HackMD
 *
 * This file will be transpiled as a single JS
 *  and should be load from HackMD head via 'lib/routes/hackmd.js' route
 *
 * USAGE:
 *  <script src="${hostname of GROWI}/_hackmd/load-agent"></script>
 *
 * @author Yuki Takei <yuki@weseek.co.jp>
 */

/* eslint-disable no-console  */
console.log('Loading GROWI agent for HackMD...');

const allowedOrigin = '{{origin}}';         // will be replaced by swig
const styleFilePath = '{{styleFilePath}}';  // will be replaced by swig

/**
 * Validate origin
 * @param {object} event
 */
function validateOrigin(event) {
  if (event.origin !== allowedOrigin) {
    console.error('Rejected', 'Cause: "event.origin" and "allowedOrigin" does not match');
    return;
  }
}

function insertStyle() {
  const element = document.createElement('link');
  element.href = styleFilePath;
  element.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].appendChild(element);
}
insertStyle();

window.addEventListener('message', (event) => {
  validateOrigin(event);
  console.log('getValue called');
});

window.addEventListener('load', (event) => {
  console.log('loaded');
});

console.log('GROWI agent for HackMD has successfully loaded.');
