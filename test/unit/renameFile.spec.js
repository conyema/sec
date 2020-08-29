let { expect } = require('chai');
const renameFile  = require('../../api/util/renameFile')

describe('', () => {
  it('should remove unwanted characters from a file name', () => {
    let file = {
      name:"  cat_and@/_Image.png "
    };
    let expectedResult = "cat_and_image";

    const result = renameFile(file);

    expect(result).to.equal(expectedResult);
  });
});
