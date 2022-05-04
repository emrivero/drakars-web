import { BaseVm } from "./BaseVm";

type PaginateMetaInfo = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

export class PaginateVm<T extends BaseVm> {
  public readonly data: T[] = [];
  constructor(
    data: T[] = [],
    public readonly meta: PaginateMetaInfo = null,
    mapFunction: (arg: T) => T = null
  ) {
    if (mapFunction) {
      this.data = data.map((obj) => mapFunction(obj));
    }
  }
}
