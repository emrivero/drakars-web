export interface PaginateVO {
  page?: number;
  limit?: number;
  sortBy?: [string, string][];
  searchBy?: string[];
  search?: string;
  filter?: {
    [column: string]: number | string | string[];
  };
  relations?: string[];
}
export class PaginateDto {
  constructor(
    private properties: PaginateVO = {
      filter: {},
      limit: null,
      page: null,
      relations: [],
      search: "",
      sortBy: [],
    }
  ) {}

  get json(): PaginateVO {
    const props = { ...this.properties };

    props.filter = this.removeNullValues(props.filter);

    return { ...props };
  }

  private removeNullValues(obj: any) {
    Object.entries(obj).forEach(([key, value]) => {
      if (!value) {
        delete obj[key];
      }
    });

    return obj;
  }
}
