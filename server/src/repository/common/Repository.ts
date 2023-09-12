import FileSystemHelper from '../../utils/FileSystemHelper';
import { ensureError } from '../../utils/utils';

interface Identifiable {
  id: string;
}

class Repository<T extends Identifiable> {
  private fileSystemHelper: FileSystemHelper;
  private data: T[];

  constructor(repoPath: string) {
    this.fileSystemHelper = new FileSystemHelper(repoPath);
    this.data = this.loadData();
  }

  // reducing read and write opetations to the file
  private loadData(): T[] {
    try {
      const rawJSON = this.fileSystemHelper.readFromFile();
      return JSON.parse(rawJSON) || [];
    } catch (err) {
      const error = ensureError(err);
      throw error;
    }
  }

  public add(value: T) {
    this.data.push(value);
    this.saveData();
  }

  public getAll() {
    return this.data;
  }

  public findOne(id: string) {
    return this.data.find(item => item.id === id);
  }

  public deleteOne(id: string) {
    const index = this.data.findIndex(item => item.id === id);

    if (index !== -1) {
      this.data.splice(index, 1);
      this.saveData();
      return true;
    }

    return false;
  }

  public updateOne(id: string, updatedValue: Partial<T>) {
    const index = this.data.findIndex(item => item.id === id);

    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updatedValue };
      this.saveData();
      return this.findOne(id);
    }

    return false;
  }

  private saveData() {
    const dataString = JSON.stringify(this.data, null, 2);
    this.fileSystemHelper.writeToFile(dataString);
  }
}

export default Repository;
