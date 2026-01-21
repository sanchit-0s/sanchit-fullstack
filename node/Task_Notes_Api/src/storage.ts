import fs from 'fs';           
import { promises as fsPromises } from 'fs';  
import path from 'path';
import chokidar from 'chokidar';

export class FileStorage {
  constructor(private dataPath: string) {}

  async saveNotes(notes: any[]): Promise<void> {
    try {
      const filePath = path.resolve(this.dataPath);
      await fs.writeFile(filePath, JSON.stringify(notes, null, 2), 'utf-8');
      console.log('Notes saved successfully.');
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  }

  async loadNotes(): Promise<any[]> {
    try {
      const filePath = path.resolve(this.dataPath);
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading notes:', error);
      return [];
    }
  }

  async watchChanges(callback: () => void): Promise<void> {
    try {
      const watcher = chokidar.watch(this.dataPath, {
        persistent: true,
      });

      watcher.on('change', () => {
        console.log('File changed, triggering callback...');
        callback();
      });

      console.log(`Watching file for changes: ${this.dataPath}`);
    } catch (error) {
      console.error('Error watching file:', error);
    }
  }
}
