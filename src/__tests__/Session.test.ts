import Crypto from '../crypto';
import SessionClass from '../index';
jest.mock('../crypto'); 

it('Check if Session called the class constructor', () => {
  const session = new SessionClass();
  expect(Crypto).toHaveBeenCalledTimes(1);
});

it('Check if appName is laravel-ts-session', () => {
  const session = new SessionClass();
  const appName = session.appName;
  expect(appName).toEqual('laravel-ts-session');
});