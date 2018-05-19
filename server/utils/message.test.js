let expect = require('expect');

let {generateMessage, generateLocationMessage}  = require('./message');


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

describe('generateLocationMessage', () => {
  it('should generate correct location message object', () => {
    let from = 'deb';
    let latitude = 15;
    let longitude = 19;
    let url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    let message = generateLocationMessage(from, latitude, longitude);
    expect(message).toMatchObject({
      from,
      url
    });
  });
});