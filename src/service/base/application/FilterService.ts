export interface FilterService<T> {
  onFilter(filter: Partial<T>);
}
