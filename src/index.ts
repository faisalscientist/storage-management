import Crypto from './crypto';
export default class SessionClass {
  public appName: string = 'laravel-ts-session';
  private crypto: Crypto;
  constructor() {
    this.crypto = new Crypto();
    this.appName = 'laravel-ts-session';
  }

  public put(name: string, value: any, returnValue?: any) {
    if (!this.hasAppSession()) {
      localStorage.setItem(this.appName, '');
    }

    const appSession = this.getAppSession();
    if (appSession === '' || appSession === undefined || appSession === null) {
      const item: any = {};
      item[name] = value;
      const encryptItem = this.crypto.encrypt(item);
      localStorage.setItem(this.appName, encryptItem);
    } else {
      const decryptAppSession = JSON.parse(this.crypto.decrypt(appSession));
      decryptAppSession[`${name}`] = value;
      const encryptAppSession = this.crypto.encrypt(decryptAppSession);
      localStorage.setItem(this.appName, encryptAppSession);
      // this._storage.set(this.appName, encryptAppSession, 1);
    }

    returnValue = returnValue !== null && returnValue !== undefined ? returnValue : null;
    return returnValue;
  }

  public get(name: string, returnValue?: any) {
    // const value = this.crypto.decrypt(this._storage.get(this.appName));
    if (this.hasAppSession()) {
      const value = this.crypto.decrypt(localStorage.getItem(this.appName));
      if (value === '' || value === null || value === undefined) {
        returnValue = returnValue !== null && returnValue !== undefined ? returnValue : null;
        return returnValue;
      }
      const decryptAppSession = JSON.parse(value);
      let sessionData = null;
      for (const key in decryptAppSession) {
        if (decryptAppSession.hasOwnProperty(name)) {
          sessionData = decryptAppSession[name];
        }
      }
      return sessionData;
    } else {
      returnValue = returnValue !== null && returnValue !== undefined ? returnValue : null;
      return returnValue;
    }
  }

  public forget(name: string, returnValue?: any) {
    // const value = this.crypto.decrypt(this._storage.get(this.appName));
    if (this.hasAppSession()) {
      const value = this.crypto.decrypt(localStorage.getItem(this.appName));
      if (value === '' || value === null || value === undefined) {
        returnValue = returnValue !== null && returnValue !== undefined ? returnValue : null;
        return returnValue;
      }
      const decryptAppSession = JSON.parse(value);
      let sessionData = null;
      for (const key in decryptAppSession) {
        if (decryptAppSession.hasOwnProperty(name)) {
          sessionData = decryptAppSession[name];
          delete decryptAppSession[name];
          const encryptAppSession = this.crypto.encrypt(decryptAppSession);
          // this._storage.set(this.appName, encryptAppSession, 1);
          localStorage.setItem(this.appName, encryptAppSession);
          returnValue = returnValue !== null && returnValue !== undefined ? returnValue : null;
          return returnValue;
        }
      }
      return sessionData;
    } else {
      return false;
    }
  }

  public flush(returnValue?: any) {
    // const value = this.crypto.decrypt(this._storage.get(this.appName));
    if (this.hasAppSession()) {
      const value = this.crypto.decrypt(localStorage.getItem(this.appName));
      if (value === '' || value === null || value === undefined) {
        returnValue = returnValue !== null && returnValue !== undefined ? returnValue : null;
        return returnValue;
      }
      // return this._storage.deleteAll();
      return localStorage.clear();
    } else {
      returnValue = returnValue !== null && returnValue !== undefined ? returnValue : null;
      return returnValue;
    }
  }

  public all(returnValue?: any) {
    // const value = this.crypto.decrypt(this._storage.get(this.appName));
    if (this.hasAppSession()) {
      const value = this.crypto.decrypt(localStorage.getItem(this.appName));
      if (value === '' || value === null || value === undefined) {
        returnValue = returnValue !== null && returnValue !== undefined ? returnValue : null;
        return returnValue;
      }
      const decryptAppSession = JSON.parse(value);
      return decryptAppSession;
    } else {
      returnValue = returnValue !== null && returnValue !== undefined ? returnValue : null;
      return returnValue;
    }
  }

  public has(name: string, returnValue?: any) {
    // const value = this.crypto.decrypt(this._storage.get(this.appName));
    if (this.hasAppSession()) {
      const value = this.crypto.decrypt(localStorage.getItem(this.appName));
      if (value === '' || value === null || value === undefined) {
        returnValue = returnValue !== null && returnValue !== undefined ? returnValue : null;
        return returnValue;
      }
      const decryptAppSession = JSON.parse(value);
      let sessionData = false;
      for (const key in decryptAppSession) {
        if (decryptAppSession.hasOwnProperty(name)) {
          sessionData = true;
        }
      }
      return sessionData;
    } else {
      returnValue = returnValue !== null && returnValue !== undefined ? returnValue : null;
      return returnValue;
    }
  }

  private getAppSession() {
    return localStorage.getItem(this.appName);
  }

  private hasAppSession() {
    // return this._storage.check(this.appName);
    return localStorage.getItem(this.appName) !== null && localStorage.getItem(this.appName) !== undefined;
  }
}
