export interface PaginateDto {
  page?: number;
  limit?: number;
  sortBy?: [string, string][];
  searchBy?: string[];
  search?: string;
  filter?: {
    [column: string]: string | string[];
  };
  relations?: string[];
}
