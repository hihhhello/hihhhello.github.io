export * from './github/models';

type Pagination = Record<string, string | number>;

export type PaginatedResponse<T> = {
  list: T[];
  next?: Pagination;
  last?: Pagination;
  first?: Pagination;
};
