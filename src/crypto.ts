import * as CryptoJS from 'crypto-js';

export default class Crypto {

      public APP_KEY = '1234567890';

      // constructor() {}

      public encrypt(item: any) {
            const output = CryptoJS.AES.encrypt(JSON.stringify(item), this.APP_KEY).toString();
            return output;
      }

      public decrypt(item: any) {
            const output = CryptoJS.AES.decrypt(item, this.APP_KEY).toString(CryptoJS.enc.Utf8);
            return output;
      }
}
