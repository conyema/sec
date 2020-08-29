/**
 *
 * @param {string} name - name  of the raw file
 * @returns A string of safe character file name
 */

module.exports = ({name}) => {
  let lName = name.toLowerCase().split('.')[0];
  // keep only desired characters
  let renamedFile = lName.replace(/[^a-zA-Z0-9-_]/g, '');
  return renamedFile;
};
