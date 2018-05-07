let expect = require('expect');

let {generateMessage}  = require('./message');


describe('generateMessage', ()=> {
  it('should generate correct message object', () => {
    let from = 'andrew';
    let text = 'hey it is andrew';
    let message = generateMessage(from, text);
    expect(message).toMatchObject({
      from,
      text
    });
    expect(typeof message.createdAt).toBe('number');
  });
});