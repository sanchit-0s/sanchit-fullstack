export abstract class BaseRepository<T> {
    abstract create(item: T): Promise<T>;
    abstract read(id: string): Promise<T | null>;
    abstract update(id: string, item: T): Promise<T>;
    abstract delete(id: string): Promise<boolean>;
  }
  