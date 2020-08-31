let { expect } = require('chai');
const renameFile  = require('../../api/util/renameFile')

describe('Rename file utility:', () => {
  it('should only allow safe characters in a file name', () => {
    const file = {
      name:"  cat_and@/_Image.png "
    };
    const expectedResult = "cat_and_image";

    const result = renameFile(file);

    expect(result).to.equal(expectedResult);
  });
});
