export function groupBy<T, K extends keyof T>(
    items: T[],
    key: K
  ): Record<string, T[]> {
    const result: Record<string, T[]> = {};
  
    for (const item of items) {
      const groupKey = String(item[key]);
      const arr = result[groupKey]??[];
      arr.push(item);
      result[groupKey]= arr;

    }
  
    return result;
  }