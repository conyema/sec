/**
 * Returns a string of characters safe for use as file name
 * @param {string} name - name  of the raw file
 *
 */

module.exports = (name) => {
  let lName = name.toLowerCase().split('.')[0];
  // keep only desired characters
  let renamedFile = lName.replace(/[^a-zA-Z0-9-_]/g, '');
  return renamedFile;
};
