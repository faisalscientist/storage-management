import Crypto from './crypto';
import { SessionUtils } from './session-utils';
export default class SessionClass extends SessionUtils {

  constructor(
  ) {
    super(new Crypto);
  }

  public put(key: string, value: any, returnValue?: any) {

    this.storeItem(key, value);
    return this.returnValue(returnValue);

  }

  public get(key: string, returnValue?: any) {

    const itemExists = this.findItem(key);
    if(itemExists) {
      const value = this.decrypt(this.getItem());
      const decryptAppSession = JSON.parse(value);
      return decryptAppSession[key];
    }
    return this.returnValue(returnValue);

  }

  public forget(key: any, returnValue?: any) {
    if(typeof key === 'string') {
      key = [key];
    }
    for (const iterator of key) {
      const itemExists = this.findItem(iterator);
      if(itemExists) {
        const value = this.decrypt(this.getItem());
        const decryptAppSession = JSON.parse(value);
        delete decryptAppSession[iterator];
        this.setItem(decryptAppSession);
      }
    }
    return this.returnValue(returnValue);
  }

  public flush(returnValue?: any) {
    this.clear();
    return this.returnValue(returnValue);
  }

  public all(returnValue?: any) {
    if(this.getItem() === null || this.getItem() === undefined) {
      return this.returnValue(returnValue);
    }
    const value = this.decrypt(this.getItem());
    return JSON.parse(value);
  }

  public pull(key: string, returnValue?: any) {
    const itemExists = this.findItem(key);
    if(itemExists) {
      const value = this.decrypt(this.getItem());
      const decryptAppSession = JSON.parse(value);
      this.forget(key);
      return decryptAppSession[key];
    }
    return this.returnValue(returnValue);
  }

  public push(key: string, newvalue: any, returnValue?: any) {
    const itemExists = this.findItem(key);
    if(itemExists) {
      const item = this.get(key);
      let valueType = null;
      item instanceof Array ? valueType = 'array' : (item instanceof Object ? valueType = 'object' : valueType = 'string');
      switch(valueType) {
        case 'array':
          item.push(newvalue);
          this.put(key, item);
          break;
        case 'object':
          Object.assign(item, newvalue);
          this.put(key, item);
          break;
        default:
          const newItemArray = [item];
          newItemArray.push(newvalue);
          this.put(key, newItemArray);
          break;
      }
    }
    return this.returnValue(returnValue);
  }

  public has(key: string, returnValue?: any) {
    const itemExists = this.findItem(key);
    return itemExists ? itemExists : (returnValue ? returnValue : itemExists);
  }
}


