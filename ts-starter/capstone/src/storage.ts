import { promises as fs } from 'fs';
import path from 'path';


export interface Storage<T> {
    save(key: string, data: T): Promise<void>;
    load(key: string): Promise<T | null>;
    list(): Promise<string[]>;
  }
  
  export class FileStorage<T> implements Storage<T> {
    constructor(private basePath: string) {}
  
    async save(key: string, data: T): Promise<void> {
      const filePath = path.join(this.basePath, `${key}.json`);
      await fs.mkdir(this.basePath, { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    }
  
    async load(key: string): Promise<T | null> {
      const filePath = path.join(this.basePath, `${key}.json`);
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content) as T;
      } catch {
        return null;
      }
    }
  
    async list(): Promise<string[]> {
      try {
        const files = await fs.readdir(this.basePath);
        return files.map(f => f.replace('.json', ''));
      } catch {
        return [];
      }
    }
  }
  
 