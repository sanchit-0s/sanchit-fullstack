import { Priority,Task } from "./types";

export type TaskQuery = {
    completed?: boolean;
    priority?: Priority | Priority[];
    titleContains?: string;
    createdAfter?: Date;
    createdBefore?: Date;
  };
  
  export type SortKey = keyof Pick<Task, 'title' | 'priority' | 'createdAt'>;
  export type SortDirection = 'asc' | 'desc';
  
  export interface QueryResult<T> {
    data: T[];
    total: number;
    page?: number;
    hasMore?: boolean;
  }

  export function queryTasks(
    tasks: Task[],
    query: TaskQuery,
    sort?: { key: SortKey; direction: SortDirection },
    page: number = 1,
    pageSize: number = 10
  ): QueryResult<Task> {
    let result = [...tasks];
  
    if (query.completed !== undefined) {
      result = result.filter(t => t.completed === query.completed);
    }
  
    if (query.priority !== undefined) {
      const priorities = Array.isArray(query.priority)
        ? query.priority
        : [query.priority];
  
      result = result.filter(t => priorities.includes(t.priority));
    }
  
    if (query.titleContains) {
      const text = query.titleContains.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(text)
      );
    }
        const createdAfter = query.createdAfter;
    if (createdAfter !== undefined) {
      result = result.filter(t => t.createdAt > createdAfter);
    }
    const createdBefore = query.createdBefore;

    if (createdBefore !== undefined) {
      result = result.filter(t => t.createdAt < createdBefore);
    }
  
    if (sort) {
      result.sort((a, b) => {
        const aValue = a[sort.key];
        const bValue = b[sort.key];
  
        if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
  
    const total = result.length;
    const start = (page - 1) * pageSize;
    const paginated = result.slice(start, start + pageSize);
  
    return {
      data: paginated,
      total,
      page,
      hasMore: start + pageSize < total,
    };
  }