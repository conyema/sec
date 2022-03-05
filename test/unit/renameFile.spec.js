let { expect } = require('chai');
const renameFile = require('../../util/renameFile')

describe('Rename file utility:', () => {
  it('should only allow safe characters in a file name', () => {
    const name = "  cat_and@/_Image.png "
    const expectedResult = "cat-and-image";

    const result = renameFile(name);

    expect(result).to.equal(expectedResult);
  });
});
