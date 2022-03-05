/**
 * Returns a string of characters safe for use as file name
 * @param {string} fileName - Name of the raw file
 *
 */

module.exports = (fileName) => {
  let realName = fileName.toLowerCase().split('.')[0];

  // Keep only desired characters and remove white spaces
  // let safeChars = realName.replace(/\s+|[^a-zA-Z0-9]/g, " ").trim();
  let safeChars = realName.replace(/[^a-zA-Z0-9]/g, " ");

  let safeName = safeChars.trim().replace(/\s+/g, "-");

  return safeName;
};
