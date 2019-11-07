import Crypto from '../crypto';

it('Check if APP_KEY equals 1234567890', () => {
  const crypto = new Crypto();
  expect(crypto.APP_KEY).toEqual('1234567890');
});

it('Check if item encrypted', () => {
  const crypto = new Crypto();
  const encryptedItem = crypto.encrypt('12345');
  expect(typeof encryptedItem).toBe('string');
});

it('Check if item decrypted', () => {
  const crypto = new Crypto();
  const item = '12345';
  const encryptedItem = crypto.encrypt(item);
  expect(typeof encryptedItem).toBe('string');
  const decryptedItem = crypto.decrypt(encryptedItem);
  expect(decryptedItem.slice(1, -1)).toBe(item);
});
