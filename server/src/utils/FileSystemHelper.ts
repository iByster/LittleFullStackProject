import fs from 'fs';
import { ensureError } from './utils';

class FileSystemHelper {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  writeToFile(data: string) {
    try {
      fs.writeFileSync(this.filePath, data);
    } catch (err) {
      const error = ensureError(err);
      throw error;
    }
  }

  readFromFile(): string {
    try {
      return fs.readFileSync(this.filePath, 'utf-8');
    } catch (err) {
      const error = ensureError(err);
      throw error;
    }
  }
}

export default FileSystemHelper;
