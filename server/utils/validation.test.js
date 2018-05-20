const expect = require('expect');

// import isRealString
const {isRealString} = require('./validation');

describe('isRealString tests', () => {
  it('should reject non-string values', () => {
    let res = isRealString(98);
    expect(res).toBeFalsy();
  });
  it('should reject string with only spaces', () => {
    let res = isRealString('    ');
    expect(res).toBeFalsy();
  });
  it('should allow string with non-space characters', () => {
    let res = isRealString('aasdf');
    expect(res).toBeTruthy();
  });
});