import * as crypto from 'crypto';

function generateUUID() {
  const buffer = crypto.randomBytes(16);
  buffer[6] = (buffer[6] & 0x0f) | 0x40; // Set version 4
  buffer[8] = (buffer[8] & 0x3f) | 0x80; // Set variant 10

  return buffer.toString('hex').match(/.{8}(?=.)/g).join('-');
}

export default generateUUID;
