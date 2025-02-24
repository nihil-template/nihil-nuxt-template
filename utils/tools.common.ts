import { v4 as uuidv4 } from 'uuid';

export class CommonTools {
  static uuid() {
    return uuidv4();
  }

  static string<T>(data: T) {
    return JSON.stringify(data);
  }

  static parse<T>(data: string): T {
    return JSON.parse(data);
  }
}
