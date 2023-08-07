import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
const { window } = new JSDOM('');
const domPurify = DOMPurify(window);

export default class TextUtils {
  public static sanitize(text: string): string {
    return domPurify.sanitize(text);
  }

  public static sanitizeObject<T>(object: object, exclude: string[] = []): T {
    const sanitizedObject: { [key: string]: unknown } = {};

    for (const [key, value] of Object.entries(object)) {
      sanitizedObject[key] = exclude.includes(key)
        ? value
        : domPurify.sanitize(value);
    }

    return sanitizedObject as T;
  }
}
