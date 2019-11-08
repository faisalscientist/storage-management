import Crypto from './crypto';

export abstract class SessionUtils {
      public appName: string = 'laravel-ts-session';
      constructor(
            protected crypto = new Crypto()
      ) {
      }

      protected hasAppSession() {
            return this.getAppSession() !== null && this.getAppSession() !== undefined;
      }

      protected getAppSession() {
            return localStorage.getItem(this.appName);
      }

      protected startSession() {
            if (!this.hasAppSession()) {
                  localStorage.setItem(this.appName, '');
            }
      }

      protected setItem(item: any) {
            const encryptedItem = this.encrypt(item)
            return localStorage.setItem(this.appName, encryptedItem);
      }

      protected getItem() {
            return localStorage.getItem(this.appName)
      }

      protected forget(key: string) {
            localStorage.forget(key)
      }

      protected clear() {
            localStorage.clear()
      }

      protected encrypt(item: any) {
            return this.crypto.encrypt(item)
      }
      protected decrypt(item: any) {
            return this.crypto.decrypt(item)
      }

      protected findItem(key: any) {
            if (this.hasAppSession()) {
                  const value = this.decrypt(this.getItem());
                  if (value === '' || value === null || value === undefined) {
                        return false;
                  }
                  const decryptAppSession = JSON.parse(value);
                  return (key in decryptAppSession);
                  
            } 
            return false;
      }
      
      protected returnValue(returnValue: any) {
            return (returnValue !== null && returnValue !== undefined) ? returnValue : null;
      }

      protected storeItem(key: string, value: any) {
            const keyItem = this.getAppSession() ?  JSON.parse(this.decrypt(this.getAppSession())) : {};
            keyItem[`${key}`] = value;
            this.setItem(keyItem);
      }

      // protected regenerateSessionAppKey() {
      //       this.
      // }
}